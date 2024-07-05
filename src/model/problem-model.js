const mongoose = require("mongoose");
const { Schema } = mongoose;

const { Enums } = require("../utils/common");
const { EASY, MEDIUM, HARD } = Enums.DIFFICULTY_TYPE;

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be empty"],
    },
    description: {
      type: String,
      required: [true, "Description cannot be empty"],
    },
    difficulty: {
      type: String,
      enum: [EASY, MEDIUM, HARD],
      required: [true, "Difficulty cannot be empty"],
    },
    testCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
