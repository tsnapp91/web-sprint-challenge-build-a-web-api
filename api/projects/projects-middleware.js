// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    res
      .status(400)
      .json({ message: "name description and completed are required" });
  } else {
    next();
  }
}

module.exports = {
  validateProject,
};
