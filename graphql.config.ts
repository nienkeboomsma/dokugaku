import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: 'services/graphql/src/**/*.graphql',
  documents: 'apps/web/src/**/*.ts',
  extensions: {
    codegen: {
      generates: {
        './packages/graphql-types/generated/graphql.ts': {
          config: {
            arrayInputCoercion: false,
            contextType: '../../../services/graphql/src/context#GQL_Context',
            inputMaybeValue: 'T | undefined',
            mappers: {
              Series:
                '../../../services/graphql/src/models/SeriesModel#SeriesModel',
              Work: '../../../services/graphql/src/models/WorkModel#WorkModel',
            },
            maybeValue: 'T | null | undefined',
            typesPrefix: 'GQL_',
            useIndexSignature: true,
            useTypeImports: true,
          },
          plugins: [
            'typescript',
            'typescript-operations',
            'typescript-resolvers',
          ],
        },
      },
    },
  },
}

export default config
