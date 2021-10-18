const graphql = require('graphql');
const { AuthorType } = require('../types');
const { AuthorData } = require('../../data/data');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(AuthorData, { id: parent.authorId })
      }
    }
  })
});

module.exports = BookType;