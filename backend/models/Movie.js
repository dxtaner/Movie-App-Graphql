const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  director: { type: Schema.Types.ObjectId, ref: "Director", required: true },
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  views: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
