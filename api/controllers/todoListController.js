'use strict';

const { translateAliases } = require('../models/todoListModel');

//Вся логіка тут. Основний код. Функції

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

exports.read_tasks_by_name = function(req, res) {
  Task.find({
    name:{$regex: new RegExp(req.params.name, "i")} // i-нечутливіть до регістру
    //{$regex: new RegExp("^" + thename.toLowerCase(), "i") } }
  }, function (err, tasks) {
    if(err)
      res.send(err);
    res.json(tasks);
  });
};


exports.update_all_tasks_to_completed = function(req, res) {
  Task.updateMany({'status': 'pending'}, {'status':'completed'}, 
  function(err, users){
    res.json({
      message:"Tasks status updated"
    });
  });
};
