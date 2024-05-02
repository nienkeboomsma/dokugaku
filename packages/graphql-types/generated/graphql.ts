import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { SeriesModel } from '../../../services/graphql/src/models/SeriesModel';
import type { WorkModel } from '../../../services/graphql/src/models/WorkModel';
import type { GQL_Context } from '../../../services/graphql/src/context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type GQL_Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GQL_AuthorInput = {
  authorId: Scalars['String']['input'];
};

export type GQL_AuthorListInput = {
  authorIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GQL_CorpusScopedInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type GQL_FrequencyListInput = {
  isPartOfSeries?: InputMaybe<Scalars['Boolean']['input']>;
  /** If true, seriesId must be supplied; if false, isPartOfSeries and workId must be supplied. */
  isSeries: Scalars['Boolean']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  seriesId?: InputMaybe<Scalars['String']['input']>;
  workId?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_FrequencyListWord = {
  __typename?: 'FrequencyListWord';
  frequency: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  ignored: Scalars['Boolean']['output'];
  info: Scalars['JSON']['output'];
};

export type GQL_GlossaryInput = {
  /** If true, seriesId must be supplied. */
  isPartOfSeries: Scalars['Boolean']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  seriesId?: InputMaybe<Scalars['String']['input']>;
  workId: Scalars['String']['input'];
};

export type GQL_GlossaryWord = {
  __typename?: 'GlossaryWord';
  componentNumber?: Maybe<Scalars['Int']['output']>;
  entryNumber: Scalars['Int']['output'];
  frequency: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  ignored: Scalars['Boolean']['output'];
  info: Scalars['JSON']['output'];
  pageNumber: Scalars['Int']['output'];
  sentenceNumber: Scalars['Int']['output'];
  volumeNumber?: Maybe<Scalars['Int']['output']>;
};

export type GQL_KnownOrExcludedWord = {
  __typename?: 'KnownOrExcludedWord';
  id: Scalars['ID']['output'];
  info: Scalars['JSON']['output'];
};

export type GQL_Mutation = {
  __typename?: 'Mutation';
  updateSeriesReadStatus: GQL_UpdateReadStatusResponse;
  updateWorkReadStatus: GQL_UpdateReadStatusResponse;
};


export type GQL_MutationUpdateSeriesReadStatusArgs = {
  input: GQL_UpdateSeriesReadStatusInput;
};


export type GQL_MutationUpdateWorkReadStatusArgs = {
  input: GQL_UpdateWorkReadStatusInput;
};

export type GQL_Query = {
  __typename?: 'Query';
  author?: Maybe<GQL_Author>;
  authorList: Array<GQL_Author>;
  excludedWords: Array<GQL_KnownOrExcludedWord>;
  frequencyList: Array<GQL_FrequencyListWord>;
  glossary: Array<GQL_GlossaryWord>;
  knownWords: Array<GQL_KnownOrExcludedWord>;
  recommendedWords: Array<GQL_RecommendedWord>;
  series?: Maybe<GQL_Series>;
  seriesList: Array<GQL_Series>;
  work?: Maybe<GQL_Work>;
  workList: Array<GQL_Work>;
};


export type GQL_QueryAuthorArgs = {
  input: GQL_AuthorInput;
};


export type GQL_QueryAuthorListArgs = {
  input?: InputMaybe<GQL_AuthorListInput>;
};


export type GQL_QueryExcludedWordsArgs = {
  input?: InputMaybe<GQL_CorpusScopedInput>;
};


export type GQL_QueryFrequencyListArgs = {
  input: GQL_FrequencyListInput;
};


export type GQL_QueryGlossaryArgs = {
  input: GQL_GlossaryInput;
};


export type GQL_QueryKnownWordsArgs = {
  input?: InputMaybe<GQL_CorpusScopedInput>;
};


export type GQL_QueryRecommendedWordsArgs = {
  input?: InputMaybe<GQL_CorpusScopedInput>;
};


export type GQL_QuerySeriesArgs = {
  input: GQL_SeriesInput;
};


export type GQL_QuerySeriesListArgs = {
  input?: InputMaybe<GQL_SeriesListInput>;
};


export type GQL_QueryWorkArgs = {
  input: GQL_WorkInput;
};


export type GQL_QueryWorkListArgs = {
  input?: InputMaybe<GQL_WorkListInput>;
};

export enum GQL_ReadStatus {
  Abandoned = 'abandoned',
  New = 'new',
  Read = 'read',
  Reading = 'reading',
  WantToRead = 'want_to_read'
}

export type GQL_RecommendedWord = {
  __typename?: 'RecommendedWord';
  frequency: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  info: Scalars['JSON']['output'];
};

export type GQL_Series = {
  __typename?: 'Series';
  authors: Array<GQL_Author>;
  hapaxLegomena: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  learnableWords: Scalars['Int']['output'];
  status: GQL_ReadStatus;
  title: Scalars['String']['output'];
  totalWords: Scalars['Int']['output'];
  uniqueWords: Scalars['Int']['output'];
  volumes: Array<GQL_Work>;
};

export type GQL_SeriesInput = {
  seriesId: Scalars['String']['input'];
  status?: InputMaybe<GQL_ReadStatus>;
};

export type GQL_SeriesListInput = {
  seriesIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<GQL_ReadStatus>;
};

export type GQL_UpdateReadStatusResponse = {
  __typename?: 'UpdateReadStatusResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  status?: Maybe<GQL_ReadStatus>;
  success: Scalars['Boolean']['output'];
};

export type GQL_UpdateSeriesReadStatusInput = {
  seriesId: Scalars['String']['input'];
  status: GQL_ReadStatus;
};

export type GQL_UpdateWorkReadStatusInput = {
  status: GQL_ReadStatus;
  workId: Scalars['String']['input'];
};

export type GQL_Work = {
  __typename?: 'Work';
  authors: Array<GQL_Author>;
  hapaxLegomena: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  learnableWords: Scalars['Int']['output'];
  maxProgress: Scalars['Int']['output'];
  numberInSeries?: Maybe<Scalars['Int']['output']>;
  progress: Scalars['Int']['output'];
  series?: Maybe<GQL_Series>;
  status: GQL_ReadStatus;
  title: Scalars['String']['output'];
  totalWords: Scalars['Int']['output'];
  type: GQL_WorkType;
  uniqueWords: Scalars['Int']['output'];
};

export type GQL_WorkInput = {
  /** Get only those works that are not part of a series. */
  excludeVolumesInSeries?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<GQL_ReadStatus>;
  workId: Scalars['String']['input'];
};

export type GQL_WorkListInput = {
  /** Get only those works that are not part of a series. */
  excludeVolumesInSeries?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<GQL_ReadStatus>;
  workIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum GQL_WorkType {
  Manga = 'manga',
  Novel = 'novel'
}

export type GQL_CurrentWorksQueryVariables = Exact<{
  input?: InputMaybe<GQL_WorkListInput>;
}>;


export type GQL_CurrentWorksQuery = { __typename?: 'Query', workList: Array<{ __typename?: 'Work', id: string, maxProgress: number, progress: number }> };

export type GQL_ExistingAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GQL_ExistingAuthorsQuery = { __typename?: 'Query', authorList: Array<{ __typename?: 'Author', name: string }> };

export type GQL_ExistingSeriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GQL_ExistingSeriesQuery = { __typename?: 'Query', seriesList: Array<{ __typename?: 'Series', title: string, volumes: Array<{ __typename?: 'Work', numberInSeries?: number | null | undefined, type: GQL_WorkType, authors: Array<{ __typename?: 'Author', name: string }> }> }> };

export type GQL_SeriesInfoQueryVariables = Exact<{
  seriesInput: GQL_SeriesInput;
}>;


export type GQL_SeriesInfoQuery = { __typename?: 'Query', series?: { __typename?: 'Series', id: string, status: GQL_ReadStatus, title: string, authors: Array<{ __typename?: 'Author', name: string }>, volumes: Array<{ __typename?: 'Work', id: string, maxProgress: number, progress: number, volumeNumber?: number | null | undefined }> } | null | undefined };

export type GQL_WorkCardsQueryVariables = Exact<{
  worksInput?: InputMaybe<GQL_WorkListInput>;
}>;


export type GQL_WorkCardsQuery = { __typename?: 'Query', seriesList: Array<{ __typename?: 'Series', id: string, learnableWords: number, status: GQL_ReadStatus, title: string, totalWords: number, authors: Array<{ __typename?: 'Author', name: string }>, volumes: Array<{ __typename?: 'Work', id: string, numberInSeries?: number | null | undefined }> }>, workList: Array<{ __typename?: 'Work', id: string, learnableWords: number, status: GQL_ReadStatus, title: string, totalWords: number, authors: Array<{ __typename?: 'Author', name: string }> }> };

export type GQL_WorkInfoQueryVariables = Exact<{
  workInput: GQL_WorkInput;
}>;


export type GQL_WorkInfoQuery = { __typename?: 'Query', work?: { __typename?: 'Work', id: string, maxProgress: number, progress: number, status: GQL_ReadStatus, title: string, authors: Array<{ __typename?: 'Author', name: string }>, series?: { __typename?: 'Series', id: string } | null | undefined } | null | undefined };

export type GQL_UpdateSeriesReadStatusMutationVariables = Exact<{
  input: GQL_UpdateSeriesReadStatusInput;
}>;


export type GQL_UpdateSeriesReadStatusMutation = { __typename?: 'Mutation', updateSeriesReadStatus: { __typename?: 'UpdateReadStatusResponse', status?: GQL_ReadStatus | null | undefined, success: boolean } };

export type GQL_UpdateWorkReadStatusMutationVariables = Exact<{
  input: GQL_UpdateWorkReadStatusInput;
}>;


export type GQL_UpdateWorkReadStatusMutation = { __typename?: 'Mutation', updateWorkReadStatus: { __typename?: 'UpdateReadStatusResponse', status?: GQL_ReadStatus | null | undefined, success: boolean } };

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type GQL_ResolversTypes = ResolversObject<{
  Author: ResolverTypeWrapper<GQL_Author>;
  AuthorInput: GQL_AuthorInput;
  AuthorListInput: GQL_AuthorListInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CorpusScopedInput: GQL_CorpusScopedInput;
  FrequencyListInput: GQL_FrequencyListInput;
  FrequencyListWord: ResolverTypeWrapper<GQL_FrequencyListWord>;
  GlossaryInput: GQL_GlossaryInput;
  GlossaryWord: ResolverTypeWrapper<GQL_GlossaryWord>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  KnownOrExcludedWord: ResolverTypeWrapper<GQL_KnownOrExcludedWord>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReadStatus: GQL_ReadStatus;
  RecommendedWord: ResolverTypeWrapper<GQL_RecommendedWord>;
  Series: ResolverTypeWrapper<SeriesModel>;
  SeriesInput: GQL_SeriesInput;
  SeriesListInput: GQL_SeriesListInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateReadStatusResponse: ResolverTypeWrapper<GQL_UpdateReadStatusResponse>;
  UpdateSeriesReadStatusInput: GQL_UpdateSeriesReadStatusInput;
  UpdateWorkReadStatusInput: GQL_UpdateWorkReadStatusInput;
  Work: ResolverTypeWrapper<WorkModel>;
  WorkInput: GQL_WorkInput;
  WorkListInput: GQL_WorkListInput;
  WorkType: GQL_WorkType;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GQL_ResolversParentTypes = ResolversObject<{
  Author: GQL_Author;
  AuthorInput: GQL_AuthorInput;
  AuthorListInput: GQL_AuthorListInput;
  Boolean: Scalars['Boolean']['output'];
  CorpusScopedInput: GQL_CorpusScopedInput;
  FrequencyListInput: GQL_FrequencyListInput;
  FrequencyListWord: GQL_FrequencyListWord;
  GlossaryInput: GQL_GlossaryInput;
  GlossaryWord: GQL_GlossaryWord;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  KnownOrExcludedWord: GQL_KnownOrExcludedWord;
  Mutation: {};
  Query: {};
  RecommendedWord: GQL_RecommendedWord;
  Series: SeriesModel;
  SeriesInput: GQL_SeriesInput;
  SeriesListInput: GQL_SeriesListInput;
  String: Scalars['String']['output'];
  UpdateReadStatusResponse: GQL_UpdateReadStatusResponse;
  UpdateSeriesReadStatusInput: GQL_UpdateSeriesReadStatusInput;
  UpdateWorkReadStatusInput: GQL_UpdateWorkReadStatusInput;
  Work: WorkModel;
  WorkInput: GQL_WorkInput;
  WorkListInput: GQL_WorkListInput;
}>;

export type GQL_AuthorResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Author'] = GQL_ResolversParentTypes['Author']> = ResolversObject<{
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_FrequencyListWordResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['FrequencyListWord'] = GQL_ResolversParentTypes['FrequencyListWord']> = ResolversObject<{
  frequency?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  ignored?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  info?: Resolver<GQL_ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_GlossaryWordResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['GlossaryWord'] = GQL_ResolversParentTypes['GlossaryWord']> = ResolversObject<{
  componentNumber?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>;
  entryNumber?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  frequency?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  ignored?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  info?: Resolver<GQL_ResolversTypes['JSON'], ParentType, ContextType>;
  pageNumber?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  sentenceNumber?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  volumeNumber?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GQL_JsonScalarConfig extends GraphQLScalarTypeConfig<GQL_ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type GQL_KnownOrExcludedWordResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['KnownOrExcludedWord'] = GQL_ResolversParentTypes['KnownOrExcludedWord']> = ResolversObject<{
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  info?: Resolver<GQL_ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_MutationResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Mutation'] = GQL_ResolversParentTypes['Mutation']> = ResolversObject<{
  updateSeriesReadStatus?: Resolver<GQL_ResolversTypes['UpdateReadStatusResponse'], ParentType, ContextType, RequireFields<GQL_MutationUpdateSeriesReadStatusArgs, 'input'>>;
  updateWorkReadStatus?: Resolver<GQL_ResolversTypes['UpdateReadStatusResponse'], ParentType, ContextType, RequireFields<GQL_MutationUpdateWorkReadStatusArgs, 'input'>>;
}>;

export type GQL_QueryResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Query'] = GQL_ResolversParentTypes['Query']> = ResolversObject<{
  author?: Resolver<Maybe<GQL_ResolversTypes['Author']>, ParentType, ContextType, RequireFields<GQL_QueryAuthorArgs, 'input'>>;
  authorList?: Resolver<Array<GQL_ResolversTypes['Author']>, ParentType, ContextType, Partial<GQL_QueryAuthorListArgs>>;
  excludedWords?: Resolver<Array<GQL_ResolversTypes['KnownOrExcludedWord']>, ParentType, ContextType, Partial<GQL_QueryExcludedWordsArgs>>;
  frequencyList?: Resolver<Array<GQL_ResolversTypes['FrequencyListWord']>, ParentType, ContextType, RequireFields<GQL_QueryFrequencyListArgs, 'input'>>;
  glossary?: Resolver<Array<GQL_ResolversTypes['GlossaryWord']>, ParentType, ContextType, RequireFields<GQL_QueryGlossaryArgs, 'input'>>;
  knownWords?: Resolver<Array<GQL_ResolversTypes['KnownOrExcludedWord']>, ParentType, ContextType, Partial<GQL_QueryKnownWordsArgs>>;
  recommendedWords?: Resolver<Array<GQL_ResolversTypes['RecommendedWord']>, ParentType, ContextType, Partial<GQL_QueryRecommendedWordsArgs>>;
  series?: Resolver<Maybe<GQL_ResolversTypes['Series']>, ParentType, ContextType, RequireFields<GQL_QuerySeriesArgs, 'input'>>;
  seriesList?: Resolver<Array<GQL_ResolversTypes['Series']>, ParentType, ContextType, Partial<GQL_QuerySeriesListArgs>>;
  work?: Resolver<Maybe<GQL_ResolversTypes['Work']>, ParentType, ContextType, RequireFields<GQL_QueryWorkArgs, 'input'>>;
  workList?: Resolver<Array<GQL_ResolversTypes['Work']>, ParentType, ContextType, Partial<GQL_QueryWorkListArgs>>;
}>;

export type GQL_RecommendedWordResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['RecommendedWord'] = GQL_ResolversParentTypes['RecommendedWord']> = ResolversObject<{
  frequency?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  info?: Resolver<GQL_ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_SeriesResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Series'] = GQL_ResolversParentTypes['Series']> = ResolversObject<{
  authors?: Resolver<Array<GQL_ResolversTypes['Author']>, ParentType, ContextType>;
  hapaxLegomena?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  learnableWords?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<GQL_ResolversTypes['ReadStatus'], ParentType, ContextType>;
  title?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  totalWords?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  uniqueWords?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  volumes?: Resolver<Array<GQL_ResolversTypes['Work']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_UpdateReadStatusResponseResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['UpdateReadStatusResponse'] = GQL_ResolversParentTypes['UpdateReadStatusResponse']> = ResolversObject<{
  code?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<GQL_ResolversTypes['ReadStatus']>, ParentType, ContextType>;
  success?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_WorkResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Work'] = GQL_ResolversParentTypes['Work']> = ResolversObject<{
  authors?: Resolver<Array<GQL_ResolversTypes['Author']>, ParentType, ContextType>;
  hapaxLegomena?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  learnableWords?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  maxProgress?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  numberInSeries?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>;
  progress?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  series?: Resolver<Maybe<GQL_ResolversTypes['Series']>, ParentType, ContextType>;
  status?: Resolver<GQL_ResolversTypes['ReadStatus'], ParentType, ContextType>;
  title?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  totalWords?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<GQL_ResolversTypes['WorkType'], ParentType, ContextType>;
  uniqueWords?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_Resolvers<ContextType = GQL_Context> = ResolversObject<{
  Author?: GQL_AuthorResolvers<ContextType>;
  FrequencyListWord?: GQL_FrequencyListWordResolvers<ContextType>;
  GlossaryWord?: GQL_GlossaryWordResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  KnownOrExcludedWord?: GQL_KnownOrExcludedWordResolvers<ContextType>;
  Mutation?: GQL_MutationResolvers<ContextType>;
  Query?: GQL_QueryResolvers<ContextType>;
  RecommendedWord?: GQL_RecommendedWordResolvers<ContextType>;
  Series?: GQL_SeriesResolvers<ContextType>;
  UpdateReadStatusResponse?: GQL_UpdateReadStatusResponseResolvers<ContextType>;
  Work?: GQL_WorkResolvers<ContextType>;
}>;

