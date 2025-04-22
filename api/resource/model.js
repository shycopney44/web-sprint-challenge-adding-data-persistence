// build your `Resource` model here
const db = require('../../data/dbConfig');

function getAllResources() {
  return db('resources');
}

async function createResource(resource) {
  const [id] = await db('resources').insert(resource);
  return getById(id);
}

function getById(id) {
  return db('resources').where('resource_id', id).first();
}

module.exports = {
  getAllResources,
  createResource,
};
