const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/Root');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://aahad:aahadtest1234@graphql-playlist.cn5v0.mongodb.net/graphql-playlist?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
  console.log('Database connected successfully!')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening on port 4000');
  return 'hello'
});