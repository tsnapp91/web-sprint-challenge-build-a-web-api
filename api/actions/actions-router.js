// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const { validateActions } = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const actionsById = await Actions.get(id);
    if (actionsById) {
      res.status(200).json(actionsById);
    } else {
      res.status(404).json({ message: "actios not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", validateActions, async (req, res, next) => {
  const actionInfo = req.body;
  try {
    const newActionInfo = await Actions.insert(actionInfo);
    res.status(200).json(newActionInfo);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateActions, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedAction = await Actions.update(id, changes);
    if (updatedAction) {
      res.status(201).json(updatedAction);
    } else {
      res.status(404).json({ message: "action not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletAction = await Actions.remove(id);
    if (deletAction) {
      res.json(deletAction);
    } else {
      res.status(404).json({ message: "actions not found" });
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
