import { Task } from "../models/Task.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-pwd");

    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );
    res.json(usersWithTaskCounts);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-pwd");
    if (!user) return res.status(401).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
};

export { getUsers, getUserById };
