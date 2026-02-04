import { Schema, model } from "mongoose";

const trainingSchema = new Schema({
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  date: { type: Date, required: true },
  stats: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      attendance: { type: String, enum: ["S", "F", "FJ", "R"], required: true },
      rating: { type: Number, min: 0, max: 3 },
    },
  ],
}, {timestamps: true});

const Training = model("trainings", trainingSchema, "trainings");

export default Training;