const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const DB_USER = process.env.MONGO_USER;
const DB_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST || "mongodb";

const TaskSchema = new mongoose.Schema({
  title: String,
});

const Task = mongoose.model('Task', TaskSchema);

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${MONGO_HOST}:27017/taskdb?authSource=admin`)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use(express.json());

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.json(newTask);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

