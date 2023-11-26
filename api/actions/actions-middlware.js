// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateActions(req, res, next) {
  const { project_id, notes, description, completed } = req.body;
  if (!project_id || !notes || !description || completed === undefined) {
    res
      .status(400)
      .json({ message: "project_id, notes, description are required" });
  } else {
    next();
  }
}

module.exports = { validateActions };
