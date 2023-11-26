// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { validateProject } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: `${id} not found` });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProject, async (req, res, next) => {
  const projectData = req.body;
  try {
    const newProject = await Projects.insert(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateProject, async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const upDatedProject = await Projects.update(id, changes);
    if (upDatedProject) {
      res.status(200).json(upDatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProject = await Projects.remove(id);
    if (!deleteProject) {
      res.status(404).json({ message: `project ${id} not found` });
    } else {
      res.json({ message: "project deleted", data: deleteProject });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectActions = await Projects.getProjectActions(id);
    if (projectActions) {
      res.status(200).json(projectActions);
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Something terrible has happened",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
