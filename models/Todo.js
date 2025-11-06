const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, 'Please provide a task name'],
      trim: true,
      maxlength: [200, 'Task name cannot exceed 200 characters'],
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    importance: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    assignedTo: {
      type: String,
      default: '',
      trim: true,
    },
    coordinateWith: {
      type: String,
      default: '',
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index for faster queries
todoSchema.index({ user: 1, createdAt: -1 });
todoSchema.index({ _id: 1 });

module.exports = mongoose.model('Todo', todoSchema);

