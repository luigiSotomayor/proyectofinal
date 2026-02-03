const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
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
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model("users", userSchema, "users");

module.exports = User;
