const { Op,fn,col,literal  } = require('sequelize');
const db = require('../models');
const Transaction = db.Transaction;
const BudgetCategory = db.BudgetCategory

exports.create = async (payload) => await Transaction.create(payload);

exports.findAll = async (userId) => await Transaction.findAll({where:{userId}, include:['BudgetCategory']})

exports.findById = async (id,userId) => await Transaction.findOne({where:{id,userId}})

exports.update = async (id,userId,updates) => await Transaction.update(updates, {where:{id,userId}})

exports.delete = async (id, userId) => await Transaction.destroy({where:{id,userId}})

exports.totalByType = async (userId,type) => await Transaction.sum('amount', {where:{userId,type}})

exports.totalByCategory = async (userId) => await Transaction.findAll({
    where:{userId, type:'expense'},
    attributes:['categoryId', [db.sequelize.fn('SUM',db.sequelize.col('amount')), 'total']],
    group:['categoryId']
})


// exports.categoryExpenseSummary = async (userId) => {
//     const data = await Transaction.findAll({
//       attributes: [
//         'category',
//         [sequelize.fn('SUM', sequelize.col('amount')), 'totalExpense']
//       ],
//       where: {
//         userId,
//         type: 'expense'
//       },
//       group: ['category']
//     });
  
//     return data;
//   };


// exports.categoryExpenseSummary = async (userId)=>{
//     const data = await Transaction.findAll({
//         attributes:[
//             [col('BudgetCategory.category'), 'category'],
//             [fn('SUM',col('amount')), 'totalExpense']
//         ],
//         include :[
//             {
//                 model:BudgetCategory,
//                 attributes:[]
//             }
//         ],
//         where:{
//             userId,
//             type:'expense'
//         },
//         group: [BudgetCategory.category],
//         raw:true
//     })

//     return data
// }

exports.categoryExpenseSummary = async (userId) => {
    const data = await Transaction.findAll({
      attributes: [
        [literal('`BudgetCategory`.`category`'), 'category'],
        [fn('SUM', col('Transaction.amount')), 'totalExpense'] // explicitly refer to Transaction.amount
      ],
      include: [
        {
          model: BudgetCategory,
          attributes: [],
          required: true,
        }
      ],
      where: {
        userId,
        type: 'expense'
      },
      group: [literal('`BudgetCategory`.`category`')],
      raw: true
    });
  
    return data;
  };

exports.monthlyExpenseComparison =  async (userId) =>{

    const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const previousMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() -1 ,1);
    const previousMonthEnd  = new Date(currentMonthStart -1);

    const [prevMonth, currMonth] = await Promise.all([
        Transaction.sum('amount',{
            where:{
                userId,
                type:'expense',
                date:{
                    [Op.between]: [previousMonthStart, previousMonthEnd]
                }
            }
        }),
        Transaction.sum('amount',{
            where:{
                userId,
                type:'expense',
                date:{
                    [Op.gte]:currentMonthStart
                }
            }
        })
    ])

    return {
        previousMonth:prevMonth || 0,
        currentMonth:currMonth || 0
    }
}