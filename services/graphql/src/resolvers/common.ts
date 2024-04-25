import GraphQLJSON from 'graphql-type-json'
import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  JSON: GraphQLJSON,
  // TODO: check if it is necessary to use this
  // enums changed here should also be changed in graphql.config.ts
  // ReadStatus: {
  //   ABANDONED: 'abandoned',
  //   NONE: 'none',
  //   READ: 'read',
  //   READING: 'reading',
  //   WANT_TO_READ: 'want to read',
  // },
  // WorkType: {
  //   MANGA: 'manga',
  //   NOVEL: 'novel',
  // },
}

export default resolvers
