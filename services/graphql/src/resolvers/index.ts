import { mergeResolvers } from '@graphql-tools/merge'
import { type GQL_Resolvers } from '@repo/graphql-types'

import author from './author'
import common from './common'
import series from './series'
import word from './word'
import work from './work'

export const resolvers: GQL_Resolvers = mergeResolvers([
  author,
  common,
  series,
  word,
  work,
])
