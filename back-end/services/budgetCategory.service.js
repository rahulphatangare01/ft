const db = require('../models');
const budgetCategory = db.BudgetCategory;



exports.createCategory = async(data) => await budgetCategory.create(data);

exports.getAllCategories = async(userId) => await budgetCategory.findAll({where:{userId}})

exports.getCategoryById = async(id,userId) =>
    await budgetCategory.findOne({where:{id, userId}})


exports.updateCategory = async(id,userId,data) =>
    await budgetCategory.update(data,{where:{id,userId}})

exports.deleteCategory = async(id,userId)=>
    await budgetCategory.destroy({where:{id,userId}})