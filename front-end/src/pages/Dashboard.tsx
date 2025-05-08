import React, { useEffect, useState } from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  // startOfMonth,
  // endOfMonth,
  subMonths,
  format,
  // eachDayOfInterval,
} from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  getCategoryExpenseThunk,
  getMontlyExpenseThunk,
  getTotalSummaryThunk,
} from "../store/thunk/transaction/summary/summary.thunk";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
];

const Dashboard: React.FC = () => {
  // const currentMonthStart = startOfMonth(new Date());
  // const currentMonthEnd = endOfMonth(new Date());

  // const currentMonthTransactions = transactions.filter((t) => {
  //   const date = new Date(t.date);
  //   return date >= currentMonthStart && date <= currentMonthEnd;
  // });

  // Last month calculations
  // const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
  // const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
  // const { totalSummary }: { totalSummary: { data: { balance: number } } } = useSelector((state: RootState) => state.summary);
  // const currentMonthTransactions = (t: any) => {
  //   const date = new Date(t.date);
  //   return date >= currentMonthStart && date <= currentMonthEnd;
  // };

  // const lastMonthTransactions = transactions.filter((t) => {
  //   const date = new Date(t.date);
  //   return date >= lastMonthStart && date <= lastMonthEnd;
  // });

  // Key metrics
  // const totalIncome = currentMonthTransactions
  //   .filter((t) => t.type === "income")
  //   .reduce((sum, t) => sum + t.amount, 0);
  // const totalExpenses = currentMonthTransactions
  //   .filter((t) => t.type === "expense")
  //   .reduce((sum, t) => sum + t.amount, 0);
  // const lastMonthExpenses = lastMonthTransactions
  //   .filter((t) => t.type === "expense")
  //   .reduce((sum, t) => sum + t.amount, 0);
  // const balance = totalIncome - totalExpenses;
  const dispatch = useDispatch<AppDispatch>();
  const { totalSummary, categoryExpense, montlyExpense } = useSelector(
    (state: RootState) => state.summary
  );
  console.log("categoryExpense", categoryExpense);
  console.log("montlyExpense", montlyExpense);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  // console.log("totalSummary", totalSummary?.balance);
  // const balance = totalSummary?.data?.balance || 0;
  // const [trendData, setTrendData] = useState<
  //   Array<{ month: string; currentMonth: number }>
  // >([]);

  // const savingsRate = 0;
  const savingsRate = totalIncome > 0 ? (totalBalance / totalIncome) * 100 : 0;
  const expenseChange = 0;
  // const expenseChange =
  //   lastMonthExpenses > 0
  //     ? ((totalExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
  //     : 0;

  // 6-month historical data
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const month = subMonths(new Date(), 5 - i);
    // const monthStart = startOfMonth(month);
    // const monthEnd = endOfMonth(month);

    // const monthTransactions = transactions.filter((t) => {
    //   const date = new Date(t.date);
    //   return date >= monthStart && date <= monthEnd;
    // });

    // const income = monthTransactions
    //   .filter((t) => t.type === "income")
    //   .reduce((sum, t) => sum + t.amount, 0);
    // const expense = monthTransactions
    //   .filter((t) => t.type === "expense")
    //   .reduce((sum, t) => sum + t.amount, 0);
    // const savings = income - expense;

    return {
      month: format(month, "MMM yyyy"),
      monthDate: month,
      // income,
      // expense,
      // savings,
    };
  });

  // Cumulative savings data
  // const cumulativeSavingsData = monthlyData.map((month, index) => {
  //   const cumulativeSavings = monthlyData.slice(0, index + 1);
  //   // .reduce((sum, m) => sum + m.savings, 0);
  //   return {
  //     month: month.month,
  //     total: cumulativeSavings,
  //   };
  // });
  // const categorySpending: any = [];
  // Category spending
  // const categorySpending = Object.entries(
  //   currentMonthTransactions
  //     .filter((t) => t.type === "expense")
  //     .reduce((acc, curr) => {
  //       acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
  //       return acc;
  //     }, {} as Record<string, number>)
  // ).map(([category, value]) => ({ category, value }));

  // Budget utilization
  // const budgetUtilization = budgets.map(b => {
  //   const spent = currentMonthTransactions
  //     .filter(t => t.category === b.category && t.type === 'expense')
  //     .reduce((sum, t) => sum + t.amount, 0);
  //   return {
  //     category: b.category,
  //     budget: b.amount,
  //     spent,
  //     remaining: Math.max(0, b.amount - spent),
  //     utilization: (spent / b.amount) * 100
  //   };
  // });

  // Daily cash flow for current month
  // const daysInMonth = eachDayOfInterval({
  //   start: currentMonthStart,
  //   end: currentMonthEnd,
  // });

  // const cashFlowData = daysInMonth.map((day) => {
  // const dayTransactions = transactions.filter((t) => {
  //   const date = new Date(t.date);
  //   return (
  //     date.getDate() === day.getDate() &&
  //     date.getMonth() === day.getMonth() &&
  //     date.getFullYear() === day.getFullYear()
  //   );
  // });

  // const income = dayTransactions
  //   .filter((t) => t.type === "income")
  //   .reduce((sum, t) => sum + t.amount, 0);
  // const expense = dayTransactions
  //   .filter((t) => t.type === "expense")
  //   .reduce((sum, t) => sum + t.amount, 0);

  // return {
  // date: format(day, "MMM dd"),
  // income,
  // expense,
  // net: income - expense,
  // };
  // });

  // PDF Export function
  const handleExportPDF = () => {
    try {
      // Initialize jsPDF with proper typing
      const doc = new jsPDF() as jsPDF & {
        lastAutoTable?: { finalY: number };
        autoTable?: (options: any) => jsPDF;
      };

      // Title
      doc.setFontSize(18);
      doc.text("Financial Dashboard Summary", 14, 20);

      // Summary Section
      doc.setFontSize(12);
      doc.text("Overview:", 14, 30);

      // First table
      autoTable(doc, {
        startY: 34,
        head: [["Metric", "Value"]],
        body: [
          ["Total Income", `$${totalIncome.toFixed(2)}`],
          ["Total Expenses", `$${totalExpenses.toFixed(2)}`],
          ["Balance", `$${totalBalance.toFixed(2)}`],
          ["Savings Rate", `${savingsRate.toFixed(1)}%`],
          // [
          //   "Expense Change (vs Last Month)",
          //   `${expenseChange > 0 ? "↑" : "↓"} ${Math.abs(expenseChange).toFixed(
          //     1
          //   )}%`,
          // ],
        ],
        theme: "striped",
      });

      // Calculate next position safely
      // const firstTableEnd = doc.lastAutoTable?.finalY || 34;
      // const secondTableStart = firstTableEnd + 10;

      // Monthly Data
      // doc.text("6-Month Income, Expenses, and Savings:", 14, secondTableStart);
      // autoTable(doc, {
      //   startY: secondTableStart + 4,
      //   head: [["Month", "Income", "Expenses", "Savings"]],
      //   body: monthlyData.map((d) => [
      //     d.month,
      //     // `$${d.income.toFixed(2)}`,
      //     // `$${d.expense.toFixed(2)}`,
      //     // `$${d.savings.toFixed(2)}`,
      //   ]),
      //   theme: "grid",
      // });

      // Calculate next position
      // const secondTableEnd = doc.lastAutoTable?.finalY || secondTableStart + 4;
      // const thirdTableStart = secondTableEnd + 10;

      // // Budget Utilization
      // doc.text("Budget Utilization:", 14, thirdTableStart);
      // autoTable(doc, {
      //   startY: thirdTableStart + 4,
      //   head: [["Category", "Budget", "Spent", "Remaining", "Utilization"]],
      //   // body: budgetUtilization.map(b => [
      //   //   b.category,
      //   //   `$${b.budget.toFixed(2)}`,
      //   //   `$${b.spent.toFixed(2)}`,
      //   //   `$${b.remaining.toFixed(2)}`,
      //   //   `${b.utilization.toFixed(1)}%`
      //   // ]),
      //   theme: "striped",
      // });

      // Calculate next position
      // const thirdTableEnd = doc.lastAutoTable?.finalY || thirdTableStart + 4;
      // const fourthTableStart = thirdTableEnd + 10;

      // // Category Spending
      // doc.text("Category-wise Spending:", 14, fourthTableStart);
      // autoTable(doc, {
      //   startY: fourthTableStart + 4,
      //   head: [["Category", "Amount Spent"]],
      //   // body: categorySpending.map((c) => [
      //   //   c.category,
      //   //   // `$${c.value.toFixed(2)}`,
      //   // ]),
      //   theme: "grid",
      // });

      // Save the file
      doc.save("financial_dashboard_summary.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleExportExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      const exportTime = new Date().toLocaleString();

      const addSheet = (
        data: any[][],
        sheetName: string,
        colWidths: number[] = [25, 25, 25, 25, 25]
      ) => {
        const ws = XLSX.utils.aoa_to_sheet(data);
        ws["!cols"] = colWidths.map((w) => ({ wch: w }));
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      };

      // 1. Overview Sheet
      const overviewData = [
        ["📊 Financial Dashboard Summary"],
        [],
        ["Overview"],
        ["Metric", "Value"],
        // ["Total Income", `$${totalIncome.toFixed(2)}`],
        // ["Total Expenses", `$${totalExpenses.toFixed(2)}`],
        // ["Balance", `$${balance.toFixed(2)}`],
        // ["Savings Rate", `${savingsRate.toFixed(1)}%`],
        // [
        //   "Expense Change (vs Last Month)",
        //   `${expenseChange > 0 ? "↑" : "↓"} ${Math.abs(expenseChange).toFixed(
        //     1
        //   )}%`,
        // ],
      ];
      addSheet(overviewData, "Overview", [40, 30]);

      // 2. Monthly Data Sheet
      const monthlyDataSheet = [
        ["6-Month Income, Expenses, and Savings"],
        [],
        ["Month", "Income", "Expenses", "Savings"],
        ...monthlyData.map((d) => [
          d.month,
          // `$${d.income.toFixed(2)}`,
          // `$${d.expense.toFixed(2)}`,
          // `$${d.savings.toFixed(2)}`,
        ]),
      ];
      addSheet(monthlyDataSheet, "Monthly Data", [20, 20, 20, 20]);

      // 3. Budget Utilization Sheet
      const budgetUtilSheet = [
        ["Budget Utilization Summary"],
        [],
        ["Category", "Budget", "Spent", "Remaining", "Utilization"],
        // ...budgetUtilization.map(b => [
        //   b.category,
        //   `$${b.budget.toFixed(2)}`,
        //   `$${b.spent.toFixed(2)}`,
        //   `$${b.remaining.toFixed(2)}`,
        //   `${b.utilization.toFixed(1)}%`
        // ])
      ];
      addSheet(budgetUtilSheet, "Budget Utilization", [25, 20, 20, 20, 20]);

      // 4. Category Spending Sheet
      const categorySheet = [
        ["Category-wise Spending"],
        [],
        ["Category", "Amount Spent"],
        // ...categorySpending.map((c) => [c.category, `$${c.value.toFixed(2)}`]),
      ];
      addSheet(categorySheet, "Category Spending", [30, 20]);

      // 5. Export Info Sheet
      const exportInfo = [
        ["Export Metadata"],
        [],
        ["Generated By", "Financial Dashboard App"],
        ["Exported At", exportTime],
      ];
      addSheet(exportInfo, "Export Info", [25, 40]);

      // Save Excel file
      XLSX.writeFile(wb, "financial_dashboard.xlsx");
    } catch (error) {
      console.error("Error generating Excel:", error);
      alert("Failed to generate Excel file. Please try again.");
    }
  };

  // useEffect(() => {
  //   const updatedTrendData = montlyExpense.map((item) => {
  //     console.log("item", item);
  //   });
  // }, []);

  useEffect(() => {
    // Fetch transactions and budgets when the component mounts
    const fetchData = async () => {
      await dispatch(getTotalSummaryThunk());
      await dispatch(getCategoryExpenseThunk());
      await dispatch(getMontlyExpenseThunk());
    };
    fetchData();
    // setTrendData([
    //   {
    //     month: "Jan",
    //     currentMonth: 4000,
    //   },
    //   {
    //     month: "Feb",
    //     currentMonth: 3000,
    //   },
    // ]);
    if (totalSummary) {
      setTotalBalance(totalSummary?.balance);
      setTotalIncome(totalSummary?.totalIncome);
      setTotalExpenses(totalSummary?.totalExpense);
    }
  }, []);

  return (
    <div className="ml-14 pl-12 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Financial Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
          >
            Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition-colors"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
          <p
            className={`text-3xl font-bold ${
              totalBalance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {/* ₹{totalBalance.toFixed(2)} */}₹{totalBalance}
          </p>
          <p className="text-sm text-gray-600 mt-2">Current month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Income</h2>
          <p className="text-3xl font-bold text-green-600">
            {/* ₹{totalIncome.toFixed(2)} */}₹{totalIncome}
          </p>
          <p className="text-sm text-gray-600 mt-2">Current month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold text-red-600">
            {/* ₹{totalExpenses.toFixed(2)} */}₹{totalExpenses}
          </p>
          <p
            className={`text-sm mt-2 ${
              expenseChange > 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {expenseChange > 0 ? "↑" : "↓"} {Math.abs(expenseChange).toFixed(1)}
            % vs last month
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Savings Rate</h2>
          <p className="text-3xl font-bold text-blue-600">
            {savingsRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 mt-2">of income saved</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expenses Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Income", value: totalIncome },
                  { name: "Expenses", value: totalExpenses },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                <Cell fill="#28a745" />
                <Cell fill="#dc3545" />
              </Pie>
              <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Spending Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Category-wise Spending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                // data={categorySpending}
                data={categoryExpense}
                dataKey="totalExpense"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryExpense.map(( index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6-Month Trends */}
      {/* <div
        className="bg-white rounded-lg shadow p-6 mb-6"
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <h2 className="text-lg font-semibold mb-4">6-Month Financial Trends</h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={150}
            height={40}
            data={[
              {
                month: "Jan",
                currentMonth: 4000,
              },
              {
                month: "Feb",
                currentMonth: 3000,
              },
            ]}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="currentMonth" fill="red" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}

      {/* Budget Utilization */}

      {/* <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Budget Utilization</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            // data={budgetUtilization}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={100} />
            <Tooltip
              formatter={(value, name) => [`$${value}`, name]}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Legend />
            <Bar dataKey="spent" fill="#dc3545" name="Spent" stackId="a" />
            <Bar
              dataKey="remaining"
              fill="#28a745"
              name="Remaining"
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div> */}

      {/* Daily Cash Flow */}
      {/* <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Daily Cash Flow - Current Month
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="#28a745"
              fill="#28a745"
              fillOpacity={0.3}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stackId="1"
              stroke="#dc3545"
              fill="#dc3545"
              fillOpacity={0.3}
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}

      {/* Cumulative Savings */}
      {/* <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Cumulative Savings Over Time
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={cumulativeSavingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#007bff"
              strokeWidth={2}
              name="Cumulative Savings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default Dashboard;
