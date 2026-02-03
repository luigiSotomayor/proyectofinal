const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  date: { type: Date, required: true },
  stats: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      attendance: { type: String, enum: ["S", "F", "FJ", "R"], required: true },
      rating: { type: Number, min: 0, max: 3 },
    },
  ],
}, {timestamps: true});

const Training = mongoose.model("trainings", trainingSchema, "trainings");

module.exports = Training;