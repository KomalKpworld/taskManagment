const task = require("../models/taskModel");

const createtask = async (req, res) => {
  try {
    data = req.body;
    const { userId, title, description } = data;
    let user = req.user._id;
    if (!title || !description) {
      return res
        .status(400)
        .send({ msg: "All fields are required", data: null });
    }
    const savedTask = await task.create({
      userId: user,
      title: title,
      description: description,
    });
    return res
      .status(201)
      .send({ msg: "sucessfully created", data: savedTask });
  } catch (error) {
    return res.status(500).send({ msg: error, data: null });
  }
};

const getAlltask = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const tasks = await task
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);
    const totalCount = await task.countDocuments();

    res.status(200).send({
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
};

const gettaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const findTask = await task.findOne({ _id: taskId });

    if (!findTask) {
      return res.status(404).send({ msg: "Task not found" });
    }

    return res.status(200).send(findTask);
  } catch (error) {
    console.error("Fetching task error:", error);
    return res.status(500).send({ msg: "Server error" });
  }
};

const updatetaskById = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const taskId = req.params.id;
    let user = req.user;
    const updatedTask = await task.findByIdAndUpdate(
      taskId,
      { userId: user._id, title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send({ msg: "Task not found" });
    }
    return res
      .status(200)
      .send({ msg: "data update sucessfully", data: updatedTask });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};
const findTaskByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = req.user;
    if (userId != user.id) {
      return res.status(400).send({ msg: " user not authorised" });
    }
    const findTask = await task.find({ userId: userId });

    if (!findTask) {
      return res.status(404).send({ msg: "Task not found" });
    }

    return res.status(200).send(findTask);
  } catch (error) {
    console.error("Fetching task error:", error);
    return res.status(500).send({ msg: "Server error" });
  }
};

const deletetaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
      return res.status(404).send({ msg: "Task not found" });
    }

    return res
      .status(200)
      .send({ msg: "Task deleted successfully", data: deletedTask });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};

module.exports = {
  createtask,
  getAlltask,
  gettaskById,
  updatetaskById,
  deletetaskById,
  findTaskByUser,
};
