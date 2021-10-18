const graphql = require('graphql');
const { BooksData, AuthorData } = require('../data/data');
const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/book');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
        // return _.find(AuthorData, { id: parent.authorId })
      }
    }
  })
});



const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
        // return _.filter(BooksData, { authorId: parent.id })
      }
    }
  })
});

module.exports = { AuthorType, BookType };
