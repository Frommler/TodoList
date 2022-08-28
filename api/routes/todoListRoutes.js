'use strict';

//Словник - запитання до сервера. Routs посилає до Controller

module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route('/tasksByName/:name') // В контроллері req.params.name 
    .get(todoList.read_tasks_by_name);

  app.route('/tasksAllComplete')
    .put(todoList.update_all_tasks_to_completed);

};