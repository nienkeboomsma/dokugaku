export const typeDefs = `#graphql

type Query {
  excludedVocab: [Word]
  knownVocab: [Word]
  seriesInfo: Series
  workCards: [Media]
  workInfo: Volume
}

type Mutation {
  setReadStatus(id: ID!, isSeries: Boolean!, value: String!): SetReadStatusResponse!
}

type SetReadStatusResponse {
  code: Int!
  success: Boolean!
  message: String
  readStatus: ReadStatus
}

union Media = Series | Volume

enum ReadStatus {
  WANT_TO_READ
  READING
  READ
  ABANDONED
}

enum WorkType {
  MANGA
  NOVEL
}

type Author {
  name: String
}

type Series {
  id: ID!
  status: ReadStatus!
  title: String!
  volumes: [Volume!]!
  vocab: [Word!]!
}

type Volume {
  authors: [Author!]!
  id: ID!
  maxProgress: Int!
  numberInSeries: Int
  progress: Int
  status: ReadStatus!
  title: String!
  type: WorkType!
  vocab: [Word!]!
}

type Word {
  id: ID!
  info: String!
  known: Boolean!
  ignored: Boolean!
  excluded: Boolean!
  frequency: Int
  volumeNumber: Int
  pageNumber: Int
  sentenceNumber: Int
  entryNumber: Int
  componentNumber: Int
}
`
