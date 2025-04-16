const service = require("../services/budgetCategory.service");

exports.create = async (req, res, next) => {
  try {
    const { category, amount } = req.body;
    const data = await service.createCategory({
      category,
      amount,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, message: "Created", data });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getAllCategories(req.user.id);
    res.status(200).json({ success: true, message: "Fetched", data });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await service.getCategoryById(req.params.id, req.user.id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Fetched", data });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await service.updateCategory(
      req.params.id,
      req.user.id,
      req.body
    );

    if (updated[0] === 0)
      return res.status(404).json({ success: false, message: "Not Found" });
    res.status(200).json({ success: true, message: "updated" });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await service.deleteCategory(req.params.id, req.user.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    next(error);
  }
};
