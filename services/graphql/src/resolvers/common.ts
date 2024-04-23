import GraphQLJSON from 'graphql-type-json'

import { type Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  JSON: GraphQLJSON,
  ReadStatus: {
    ABANDONED: 'abandoned',
    NONE: 'none',
    READ: 'read',
    READING: 'reading',
    WANT_TO_READ: 'want to read',
  },
  WorkType: {
    MANGA: 'manga',
    NOVEL: 'novel',
  },
}

export default resolvers
