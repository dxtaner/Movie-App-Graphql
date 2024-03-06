const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  birthDate: { type: Date },
  birthPlace: { type: String },
  gender: { type: String },
  nationality: { type: String },
  moviesCount: { type: Number, default: 0 },
});

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
