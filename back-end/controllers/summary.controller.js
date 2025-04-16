const service = require('../services/transaction.service');


exports.getSummary = async (req, res, next) =>{
    try {
        
        const userId = req.user.id;
        const totalIncome  = await service.totalByType(userId,'income') || 0;
        const totalExpense = await service.totalByType(userId, 'expense') || 0;
        const balance = totalIncome -totalExpense;

        res.status(200).json({success:true, data:{totalIncome, totalExpense, balance}})
    } catch (error) {
        next(error)
    }
}


exports.getCategoryExpense = async(req, res, next) =>{

    try {
        
        const data = await service.categoryExpenseSummary(req.user.id);

        res.status(200).json({success:true, message:"Category-wise expense fetched",data})
    } catch (error) {
        next(error)
    }
}


exports.getMonthlyComparison  = async(req, res, next) =>{
    try {
      
        const data = await service.monthlyExpenseComparison(req.user.id);
        res.status(200).json({success:true, message: "Monthly comparison fetched", data})
    } catch (error) {
        next(error)
    }
}