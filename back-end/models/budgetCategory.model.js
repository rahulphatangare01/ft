const { Model, DataTypes } = require("sequelize");

class BudgetCategory extends Model {}

module.exports = (sequelize) => {
  BudgetCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BudgetCategory",
      tableName: "budget_categories",
      timestamps: true,
    }
  );
  return BudgetCategory;
};
