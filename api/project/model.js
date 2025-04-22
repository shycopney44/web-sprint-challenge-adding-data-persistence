// build your `Project` model here
const db = require('../../data/dbConfig');

async function getAllProjects() {
  const projects = await db('projects');
  return projects.map(project => ({
    ...project,
    project_completed: !!project.project_completed, // Convert integer to boolean
  }));
}

async function createProject(project) {
  const [id] = await db('projects').insert(project);
  return getById(id);
}

async function getById(id) {
  return db('projects').where('project_id', id).first();
}

module.exports = {
  getAllProjects,
  createProject,
  getById,
};
