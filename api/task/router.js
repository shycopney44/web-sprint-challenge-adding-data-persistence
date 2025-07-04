// api/task/router.js
const express = require('express');
const Task = require('./model');

const router = express.Router();

// [GET] /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// [POST] /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
