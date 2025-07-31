const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const task = await Task.create({
    userId: req.user._id,
    title,
    description,
    priority,
    dueDate,
  });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

  await task.deleteOne();
  res.json({ message: 'Task deleted' });
};
