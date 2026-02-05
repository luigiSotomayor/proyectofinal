import mongoose, { Schema, model } from "mongoose";
import { hashSync } from "bcrypt";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthday: { type: Date, required: false },
    phone: { type: String, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    nationality: { type: String },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, minlength: [8, "Password 8 caracter minimun"] },
    role: {
      type: String,
      enum: ["jugador", "entrenador", "director deportivo"],
      required: true,
    },
    //solo si el usuario es jugador
    position: {
      type: String,
      enum: [
        "portero",
        "central",
        "lateral",
        "medio centro",
        "extremo",
        "media punta",
        "delantero",
      ],
    },
    dorsal: {type: Number},
    //team: {type: mongoose.Types.ObjectId, ref: 'teams' },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  this.password = hashSync(this.password, 10);
})

const User = model("users", userSchema, "users");

export default User;
