import mongoose, { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    teamCode: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    players: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    coach: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Team = model("teams", teamSchema, "teams");

export default Team;