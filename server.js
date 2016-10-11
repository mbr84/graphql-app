const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const goldbergs = require('./data');
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLInt = graphql.GraphQLInt;

function getGoldberg(id) {
  return goldbergs[id];
}

const goldbergType = new GraphQLObjectType({
  name: 'Goldberg',
  description: 'Member of the Goldbergs',
  fields: {
    character: {
      type: GraphQLString,
      description: 'Name of character',
    },
    actor: {
      type: GraphQLString,
      description: 'Actor playing the character',
    },
    role: {
      type: GraphQLString,
      description: 'Family Role',
    },
    traits: {
      type: GraphQLString,
      description: 'Character traits',
    },
    id: {
      type: GraphQLInt,
      description: 'Id of this Goldberg',
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'query',
  description: 'Goldberg query',
  fields: {
    goldberg: {
      type: goldbergType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve: (_, args) => (
        getGoldberg(args.id)
      ),
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
});

const graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8080);
console.log('The GraphQL Server is running.');

const compiler = webpack({
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: { '/graphql': `http://localhost:${8080}` },
  publicPath: '/static/',
  stats: { colors: true },
});
app.use('/', express.static('static'));
app.listen(3000);
console.log('The App Server is running.');
