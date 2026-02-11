import { Schema, model } from "mongoose";

const matchSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: "teams", requires: true },
    rival: { type: String, required: true},
    date: { type: Date, required: false },
    home: { type: Boolean, required: false },
    jornada: {type: Number},
    championship: {type: String, enum: ["amistoso", "liga", "copa"], required: true},
    stats: [
        {
            csvId: {type: String},
            player: {type:  Schema.Types.ObjectId, ref: "users"},
            minutes: {type: Number},
            titular: {type: Boolean},
            yellowCards: {type: Boolean, default: false},
            doubleYellowCards: {type: Boolean, default: false},
            redCards: {type: Boolean, default: false},
            goalsScored: {type: Number, default: 0},
            goalsConceded: {type: Number, default: 0},
            rating: {type: Number, min: 0, max: 3}
        }
    ]
}, {timestamps: true});

const Match = model("matches", matchSchema, "matches");

export default Match;