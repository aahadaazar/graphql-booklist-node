const graphql = require('graphql');
const { BooksData } = require('../../data/data');
const _ = require('lodash');
const { BookType } = require('../BookType/BookType');


const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

console.log('hello->', BookType);

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(BooksData, { authorId: parent.id })
      }
    }
  })
});

module.exports = AuthorType;
