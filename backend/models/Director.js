const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: { type: String, required: true },
  birth: { type: Number, required: true },
  countryOfBirth: { type: String },
  death: { type: Number },
  photo: { type: String },
  awards: [{ type: String }],
  moviesDirected: { type: Number, default: 0 },
});

module.exports = mongoose.model("Director", directorSchema);
