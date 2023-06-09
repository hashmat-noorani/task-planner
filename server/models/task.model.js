import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  draft: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["bug", "feature", "story"],
    required: true,
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "done"],
    required: true,
  },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sprint",
    required: true,
  },
  assignees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Task = mongoose.model("Task", taskSchema);
