const sequelize = require("../config/db.config");
const UserModel = require("./user.model");
const BudgetCategoryModel = require("./budgetCategory.model");
const TransactionModel = require("./transaction.model");

const db = {};
db.sequelize = sequelize;
db.User = UserModel(sequelize);
db.BudgetCategory = BudgetCategoryModel(sequelize);
db.Transaction = TransactionModel(sequelize);

db.User.hasMany(db.BudgetCategory, {
  foreignKey: "userId",
  as: "categories",
  onDelete: "CASCADE",
});

db.BudgetCategory.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

db.User.hasMany(db.Transaction, { foreignKey: "userId" });
db.Transaction.belongsTo(db.User, { foreignKey: "userId" });

db.BudgetCategory.hasMany(db.Transaction, { foreignKey: "categoryId" });
db.Transaction.belongsTo(db.BudgetCategory, { foreignKey: "categoryId" });

module.exports = db;
