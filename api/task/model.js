// build your `Task` model here
const db = require('../../data/dbConfig');

async function getAllTasks() {
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

  return tasks.map(task => ({
    ...task,
    task_completed: !!task.task_completed, // Convert integer to boolean
  }));
}

async function createTask(task) {
  const [id] = await db('tasks').insert(task);
  return getById(id);
}

function getById(id) {
  return db('tasks').where('task_id', id).first();
}

module.exports = {
  getAllTasks,
  createTask,
};
