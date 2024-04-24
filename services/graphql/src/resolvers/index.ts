import { mergeResolvers } from '@graphql-tools/merge'
import { type Resolvers } from '@repo/graphql-types/generated/resolvers'

import author from './author'
import common from './common'
import series from './series'
import word from './word'
import work from './work'

export const resolvers: Resolvers = mergeResolvers([
  author,
  common,
  series,
  word,
  work,
])
