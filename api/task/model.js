// api/task/model.js
const db = require('../../data/dbConfig');

// Get all tasks with project name & description
async function getAll() {
  const tasks = await db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    );

  // Convert task_completed from 0/1 to true/false
  return tasks.map(task => ({
    ...task,
    task_completed: Boolean(task.task_completed),
  }));
}

// Create a new task
async function create(task) {
  const [id] = await db('tasks').insert(task);
  const created = await db('tasks').where('task_id', id).first();

  return {
    ...created,
    task_completed: Boolean(created.task_completed),
  };
}

module.exports = {
  getAll,
  create,
};
