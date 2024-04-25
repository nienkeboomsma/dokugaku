import GraphQLJSON from 'graphql-type-json'
import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  JSON: GraphQLJSON,
}

export default resolvers
