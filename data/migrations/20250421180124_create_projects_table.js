/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Create the 'projects' table
    await knex.schema.createTable('projects', table => {
      table.increments('project_id'); // Primary key
      table.string('project_name', 200).notNullable(); // Required column
      table.string('project_description'); // Optional column
      table.boolean('project_completed').defaultTo(false); // Defaults to false
    });
  
    // Create the 'resources' table
    await knex.schema.createTable('resources', table => {
      table.increments('resource_id'); // Primary key
      table.string('resource_name', 200).notNullable().unique(); // Required and unique column
      table.string('resource_description'); // Optional column
    });
  
    // Create the 'tasks' table
    await knex.schema.createTable('tasks', table => {
      table.increments('task_id'); // Primary key
      table.string('task_description', 200).notNullable(); // Required column
      table.string('task_notes'); // Optional column
      table.boolean('task_completed').defaultTo(false); // Defaults to false
      table.integer('project_id') // Foreign key linking to 'projects'
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
  
    // Create the 'project_resources' table
    await knex.schema.createTable('project_resources', table => {
      table.increments('id'); // Primary key
      table.integer('project_id') // Foreign key linking to 'projects'
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table.integer('resource_id') // Foreign key linking to 'resources'
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    // Drop tables in reverse order to avoid conflicts with foreign keys
    await knex.schema.dropTableIfExists('project_resources');
    await knex.schema.dropTableIfExists('tasks');
    await knex.schema.dropTableIfExists('resources');
    await knex.schema.dropTableIfExists('projects');
  };
  