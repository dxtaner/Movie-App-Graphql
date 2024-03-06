const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const Movie = require("../models/Movie.js");
const Director = require("../models/Director.js");
const Genre = require("../models/Genre.js");
const Actor = require("../models/Actor.js");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.director);
      },
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve(parent, args) {
        return Genre.find({ _id: { $in: parent.genres } });
      },
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return Actor.find({ _id: { $in: parent.actors } });
      },
    },
    views: { type: GraphQLInt },
    rating: { type: GraphQLInt },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
    countryOfBirth: { type: GraphQLString },
    death: { type: GraphQLInt },
    photo: { type: GraphQLString },
    awards: { type: new GraphQLList(GraphQLString) },
    moviesDirected: {
      type: GraphQLInt,
      resolve(parent, args) {
        return Movie.countDocuments({ director: parent.id });
      },
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const ActorType = new GraphQLObjectType({
  name: "Actor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    birthPlace: { type: GraphQLString },
    gender: { type: GraphQLString },
    nationality: { type: GraphQLString },
    moviesCount: {
      type: GraphQLInt,
      resolve(parent, args) {
        return Movie.countDocuments({ actors: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id);
      },
    },
    genre: {
      type: GenreType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Genre.findById(args.id);
      },
    },
    actor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Actor.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve(parent, args) {
        return Genre.find({});
      },
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return Actor.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        director: { type: new GraphQLNonNull(GraphQLID) },
        genres: { type: new GraphQLList(GraphQLID) },
        actors: { type: new GraphQLList(GraphQLID) },
        views: { type: GraphQLInt },
        rating: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const {
          title,
          description,
          year,
          director,
          genres,
          actors,
          views,
          rating,
        } = args;
        const movie = new Movie({
          title,
          description,
          year,
          director,
          genres,
          actors,
          views,
          rating,
        });
        return movie.save();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        birth: { type: GraphQLInt },
        countryOfBirth: { type: GraphQLString },
        death: { type: GraphQLInt },
        photo: { type: GraphQLString },
        awards: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const { name, birth, countryOfBirth, death, photo, awards } = args;
        const director = new Director({
          name,
          birth,
          countryOfBirth,
          death,
          photo,
          awards,
        });
        return director.save();
      },
    },
    addGenre: {
      type: GenreType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        const { name, description } = args;
        const genre = new Genre({
          name,
          description,
        });
        return genre.save();
      },
    },
    addActor: {
      type: ActorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLString },
        birthPlace: { type: GraphQLString },
        gender: { type: GraphQLString },
        nationality: { type: GraphQLString },
      },
      resolve(parent, args) {
        const { name, birthDate, birthPlace, gender, nationality } = args;
        const actor = new Actor({
          name,
          birthDate,
          birthPlace,
          gender,
          nationality,
        });
        return actor.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
