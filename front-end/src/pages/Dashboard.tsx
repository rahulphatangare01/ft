import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTransactions } from '../context/TransactionContext';
import { useBudget } from '../context/BudgetContext';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { transactions } = useTransactions();
  const { budgets } = useBudget();
  const chartRef = useRef<SVGSVGElement>(null);
  const pieChartRef = useRef<SVGSVGElement>(null);
  const comparisonChartRef = useRef<SVGSVGElement>(null);
  const categoryChartRef = useRef<SVGSVGElement>(null);

  // Calculate current month's data
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date >= currentMonthStart && date <= currentMonthEnd;
  });

  // Calculate last month's data
  const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
  const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
  const lastMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date >= lastMonthStart && date <= lastMonthEnd;
  });

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const lastMonthExpenses = lastMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const expenseChange = ((totalExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

  useEffect(() => {
    if (!pieChartRef.current) return;

    // Clear previous chart
    d3.select(pieChartRef.current).selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(pieChartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = [
      { label: 'Income', value: totalIncome },
      { label: 'Expenses', value: totalExpenses }
    ];

    const color = d3.scaleOrdinal()
      .domain(['Income', 'Expenses'])
      .range(['#28a745', '#dc3545']);

    const pie = d3.pie<any>()
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    // Add transition
    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    // arcs.append("path")
    //   .attr("fill", (d: any) => color(d.data.label))
    //   .transition()
    //   .duration(1000)
    //   .attrTween("d", function(d: any) {
    //     const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
    //     return function(t) {
    //       return arc(interpolate(t));
    //     };
    //   });

    // Add labels
    arcs.append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d: any) => `${d.data.label}\n$${d.data.value.toFixed(2)}`)
      .style("fill", "#fff")
      .style("font-size", "12px")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  }, [totalIncome, totalExpenses]);

  useEffect(() => {
    if (!categoryChartRef.current) return;

    // Clear previous chart
    d3.select(categoryChartRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(categoryChartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Group expenses by category
    const categoryExpenses = d3.group(
      currentMonthTransactions.filter(t => t.type === 'expense'),
      d => d.category
    );

    const data = Array.from(categoryExpenses, ([category, transactions]) => ({
      category,
      amount: transactions.reduce((sum, t) => sum + t.amount, 0)
    })).sort((a, b) => b.amount - a.amount);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(d => d.category));

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, d => d.amount) as number]);

    // Add bars with transition
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category) || 0)
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "#007bff")
      .transition()
      .duration(1000)
      .attr("y", d => y(d.amount))
      .attr("height", d => height - y(d.amount));

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}`));
  }, [currentMonthTransactions]);

  useEffect(() => {
    if (!chartRef.current || transactions.length === 0) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Group transactions by date
    const groupedData = d3.group(transactions, d => d.date.split('T')[0]);
    const data = Array.from(groupedData, ([date, transactions]) => ({
      date: new Date(date),
      amount: transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0)
    })).sort((a, b) => a.date.getTime() - b.date.getTime());

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.amount) as number, d3.max(data, d => d.amount) as number])
      .range([height, 0]);

    const line = d3.line<{ date: Date; amount: number }>()
      .x(d => x(d.date))
      .y(d => y(d.amount));

    // Add transition
    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5);

    const totalLength = path.node()?.getTotalLength() || 0;

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .attr("d", line)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
  }, [transactions]);

  useEffect(() => {
    if (!comparisonChartRef.current) return;

    // Clear previous chart
    d3.select(comparisonChartRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 300 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(comparisonChartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = [
      { month: 'Last Month', amount: lastMonthExpenses },
      { month: 'This Month', amount: totalExpenses }
    ];

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(d => d.month));

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(lastMonthExpenses, totalExpenses)]);

    // Add bars with transition
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.month) || 0)
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", (d, i) => i === 0 ? "#6c757d" : "#007bff")
      .transition()
      .duration(1000)
      .attr("y", d => y(d.amount))
      .attr("height", d => height - y(d.amount));

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
  }, [lastMonthExpenses, totalExpenses]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold mb-4">Total Balance</h2>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold mb-4">Total Income</h2>
          <p className="text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold mb-4">Total Expenses</h2>
          <p className="text-3xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          <p className={`text-sm mt-2 ${expenseChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {expenseChange > 0 ? '↑' : '↓'} {Math.abs(expenseChange).toFixed(1)}% vs last month
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
          <svg ref={pieChartRef}></svg>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Expense Comparison</h2>
          <svg ref={comparisonChartRef}></svg>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {format(lastMonthStart, 'MMMM')}: ${lastMonthExpenses.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              {format(currentMonthStart, 'MMMM')}: ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
        <svg ref={categoryChartRef}></svg>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Cash Flow</h2>
        <svg ref={chartRef}></svg>
      </div>
    </div>
  );
};

export default Dashboard;