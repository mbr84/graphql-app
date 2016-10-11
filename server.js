import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import goldbergs from './data';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

function getGoldberg(id) {
  return goldbergs[id];
}

const goldbergType = new GraphQLObjectType({
  name: 'Goldberg',
  description: 'Member of the Goldberts',
  fields: {
    character: GraphQLString,
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
