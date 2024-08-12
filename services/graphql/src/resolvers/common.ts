import { GraphQLJSON } from 'graphql-scalars'
import { type GQL_Resolvers } from '@repo/graphql-types'

const resolvers: GQL_Resolvers = {
  JSON: GraphQLJSON,
}

export default resolvers
