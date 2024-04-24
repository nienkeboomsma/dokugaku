import GraphQLJSON from 'graphql-type-json'
import { type Resolvers } from '@repo/graphql-types/generated/resolvers'

const resolvers: Resolvers = {
  JSON: GraphQLJSON,
  // enums changed here should also be changed in graphql.config.ts
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
