import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await Task.create({
    title,
    description,
    userId: req.user._id,
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const search = req.query.search?.trim() || "";
  const status = req.query.status?.trim() || "";

  const filter = { userId: req.user._id };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status === "pending" || status === "completed") {
    filter.status = status;
  }

  const total = await Task.countDocuments(filter);
  const tasks = await Task.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    tasks,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
};

export const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;

  if (req.body.status === "pending" || req.body.status === "completed") {
    task.status = req.body.status;
  }

  const updatedTask = await task.save();

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task removed" });
};

export const toggleTaskStatus = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = task.status === "completed" ? "pending" : "completed";

  const updatedTask = await task.save();

  res.json(updatedTask);
};