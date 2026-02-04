import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],
    coach: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Team = model("teams", teamSchema, "teams");

export default Team;