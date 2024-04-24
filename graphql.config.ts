import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: 'services/graphql/src/**/*.graphql',
  documents: 'apps/web/src/**/*.ts',
  extensions: {
    codegen: {
      generates: {
        './packages/graphql-types/generated/operations.ts': {
          plugins: ['typescript', 'typescript-operations'],
        },
        './packages/graphql-types/generated/resolvers.ts': {
          config: {
            enumValues: {
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
            },
          },
          plugins: ['typescript', 'typescript-resolvers'],
        },
      },
    },
  },
}

export default config
