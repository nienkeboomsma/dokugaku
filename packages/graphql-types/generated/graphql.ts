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

export type GQL_Mutation = {
  __typename?: 'Mutation';
  updateSeriesReadStatus: GQL_SetReadStatusResponse;
  updateWord: GQL_WordChangeResponse;
};

export type GQL_Query = {
  __typename?: 'Query';
  author?: Maybe<GQL_Author>;
  authorList: Array<GQL_Author>;
  series?: Maybe<GQL_Series>;
  seriesList: Array<GQL_Series>;
  word?: Maybe<GQL_Word>;
  wordList: Array<GQL_Word>;
  work?: Maybe<GQL_Work>;
  workList: Array<GQL_Work>;
};


export type GQL_QueryAuthorArgs = {
  input: GQL_AuthorInput;
};


export type GQL_QueryAuthorListArgs = {
  input?: InputMaybe<GQL_AuthorListInput>;
};


export type GQL_QuerySeriesArgs = {
  input: GQL_SeriesInput;
};


export type GQL_QuerySeriesListArgs = {
  input?: InputMaybe<GQL_SeriesListInput>;
};


export type GQL_QueryWordArgs = {
  input: GQL_WordInput;
};


export type GQL_QueryWordListArgs = {
  input?: InputMaybe<GQL_WordListInput>;
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

export type GQL_Series = {
  __typename?: 'Series';
  authors: Array<GQL_Author>;
  id: Scalars['ID']['output'];
  status: GQL_ReadStatus;
  title: Scalars['String']['output'];
  volumes: Array<GQL_Work>;
  wordCount: Scalars['Int']['output'];
  words: Array<GQL_Word>;
};


export type GQL_SeriesWordCountArgs = {
  input?: InputMaybe<GQL_WordCountInput>;
};


export type GQL_SeriesWordsArgs = {
  input?: InputMaybe<GQL_SubQueryWordListInput>;
};

export type GQL_SeriesInput = {
  seriesId: Scalars['String']['input'];
  status?: InputMaybe<GQL_ReadStatus>;
};

export type GQL_SeriesListInput = {
  seriesIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<GQL_ReadStatus>;
};

export type GQL_SetReadStatusResponse = {
  __typename?: 'SetReadStatusResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  readStatus?: Maybe<GQL_ReadStatus>;
  success: Scalars['Boolean']['output'];
};

export type GQL_SubQueryWordListInput = {
  /**
   * Get only the first occurrence of each word, instead of each individual
   * occurrence.
   */
  distinctOnly?: InputMaybe<Scalars['Boolean']['input']>;
  excluded?: InputMaybe<Scalars['Boolean']['input']>;
  ignored?: InputMaybe<Scalars['Boolean']['input']>;
  known?: InputMaybe<Scalars['Boolean']['input']>;
  minFrequency?: InputMaybe<Scalars['Int']['input']>;
  minPageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  wordIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GQL_Word = {
  __typename?: 'Word';
  componentNumber?: Maybe<Scalars['Int']['output']>;
  entryNumber: Scalars['Int']['output'];
  excluded: Scalars['Boolean']['output'];
  frequency: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  ignored?: Maybe<Scalars['Boolean']['output']>;
  info: Scalars['JSON']['output'];
  known: Scalars['Boolean']['output'];
  pageNumber: Scalars['Int']['output'];
  sentenceNumber: Scalars['Int']['output'];
  volumeNumber?: Maybe<Scalars['Int']['output']>;
};

export type GQL_WordChangeResponse = {
  __typename?: 'WordChangeResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  wordId?: Maybe<Scalars['String']['output']>;
};

export type GQL_WordCountInput = {
  type?: InputMaybe<GQL_WordCountType>;
};

export enum GQL_WordCountType {
  /** The number of unique words that occur only once within the work. */
  Hapax = 'hapax',
  /** The number of words that are not marked excluded, ignored or known. */
  Learnable = 'learnable',
  Total = 'total',
  Unique = 'unique'
}

export type GQL_WordInput = {
  /**
   * Determines what series the 'ignored' value should be based on. If no
   * seriesIdInWhichIgnored or workIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  seriesIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  wordId: Scalars['Int']['input'];
  /**
   * Determines what work the 'ignored' value should be based on. If no
   * workIdInWhichIgnored or seriesIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  workIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  /**
   * If no workIds value is supplied information will be drawn from the entire
   * corpus. Filtering by workIds is most useful for works within the same series;
   * combining random works will yield uninformative values for
   * 'volumeNumber', 'pageNumber', 'sentenceNumber', 'entryNumber' and
   * 'componentNumber'.
   */
  workIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GQL_WordListInput = {
  /**
   * Get only the first occurrence of each word, instead of each individual
   * occurrence.
   */
  distinctOnly?: InputMaybe<Scalars['Boolean']['input']>;
  excluded?: InputMaybe<Scalars['Boolean']['input']>;
  /** Will return null if no seriesIdInWhichIgnored or workIdInWhichIgnored is supplied */
  ignored?: InputMaybe<Scalars['Boolean']['input']>;
  known?: InputMaybe<Scalars['Boolean']['input']>;
  minFrequency?: InputMaybe<Scalars['Int']['input']>;
  minPageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Determines what series the 'ignored' value should be based on. If no
   * seriesIdInWhichIgnored or workIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  seriesIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  wordIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /**
   * Determines what work the 'ignored' value should be based on. If no
   * workIdInWhichIgnored or seriesIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  workIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  /**
   * If no workIds value is supplied information will be drawn from the entire
   * corpus. Filtering by workIds is most useful for works within the same series;
   * combining random works will yield uninformative values for
   * 'volumeNumber', 'pageNumber', 'sentenceNumber', 'entryNumber' and
   * 'componentNumber'.
   */
  workIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GQL_Work = {
  __typename?: 'Work';
  authors: Array<GQL_Author>;
  id: Scalars['ID']['output'];
  maxProgress: Scalars['Int']['output'];
  numberInSeries?: Maybe<Scalars['Int']['output']>;
  progress: Scalars['Int']['output'];
  series?: Maybe<GQL_Series>;
  status: GQL_ReadStatus;
  title: Scalars['String']['output'];
  type: GQL_WorkType;
  wordCount: Scalars['Int']['output'];
  words: Array<GQL_Word>;
};


export type GQL_WorkWordCountArgs = {
  input?: InputMaybe<GQL_WordCountInput>;
};


export type GQL_WorkWordsArgs = {
  input?: InputMaybe<GQL_SubQueryWordListInput>;
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

export type GQL_WorkCardsQueryVariables = Exact<{
  learnableWordsInput?: InputMaybe<GQL_WordCountInput>;
  totalWordsInput?: InputMaybe<GQL_WordCountInput>;
  worksInput?: InputMaybe<GQL_WorkListInput>;
}>;


export type GQL_WorkCardsQuery = { __typename?: 'Query', seriesList: Array<{ __typename?: 'Series', id: string, status: GQL_ReadStatus, title: string, totalWords: number, learnableWords: number, authors: Array<{ __typename?: 'Author', name: string }>, volumes: Array<{ __typename?: 'Work', id: string, numberInSeries?: number | null | undefined }> }>, workList: Array<{ __typename?: 'Work', id: string, status: GQL_ReadStatus, title: string, totalWords: number, learnableWords: number, authors: Array<{ __typename?: 'Author', name: string }> }> };

export type GQL_WorkInfoQueryVariables = Exact<{
  workInput: GQL_WorkInput;
  wordsInput?: InputMaybe<GQL_SubQueryWordListInput>;
}>;


export type GQL_WorkInfoQuery = { __typename?: 'Query', work?: { __typename?: 'Work', id: string, maxProgress: number, progress: number, status: GQL_ReadStatus, title: string, authors: Array<{ __typename?: 'Author', name: string }>, words: Array<{ __typename?: 'Word', id: string, info: any, frequency: number, ignored?: boolean | null | undefined, pageNumber: number, sentenceNumber: number, entryNumber: number, componentNumber?: number | null | undefined }> } | null | undefined };

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
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReadStatus: GQL_ReadStatus;
  Series: ResolverTypeWrapper<SeriesModel>;
  SeriesInput: GQL_SeriesInput;
  SeriesListInput: GQL_SeriesListInput;
  SetReadStatusResponse: ResolverTypeWrapper<GQL_SetReadStatusResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubQueryWordListInput: GQL_SubQueryWordListInput;
  Word: ResolverTypeWrapper<GQL_Word>;
  WordChangeResponse: ResolverTypeWrapper<GQL_WordChangeResponse>;
  WordCountInput: GQL_WordCountInput;
  WordCountType: GQL_WordCountType;
  WordInput: GQL_WordInput;
  WordListInput: GQL_WordListInput;
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
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  Series: SeriesModel;
  SeriesInput: GQL_SeriesInput;
  SeriesListInput: GQL_SeriesListInput;
  SetReadStatusResponse: GQL_SetReadStatusResponse;
  String: Scalars['String']['output'];
  SubQueryWordListInput: GQL_SubQueryWordListInput;
  Word: GQL_Word;
  WordChangeResponse: GQL_WordChangeResponse;
  WordCountInput: GQL_WordCountInput;
  WordInput: GQL_WordInput;
  WordListInput: GQL_WordListInput;
  Work: WorkModel;
  WorkInput: GQL_WorkInput;
  WorkListInput: GQL_WorkListInput;
}>;

export type GQL_AuthorResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Author'] = GQL_ResolversParentTypes['Author']> = ResolversObject<{
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GQL_JsonScalarConfig extends GraphQLScalarTypeConfig<GQL_ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type GQL_MutationResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Mutation'] = GQL_ResolversParentTypes['Mutation']> = ResolversObject<{
  updateSeriesReadStatus?: Resolver<GQL_ResolversTypes['SetReadStatusResponse'], ParentType, ContextType>;
  updateWord?: Resolver<GQL_ResolversTypes['WordChangeResponse'], ParentType, ContextType>;
}>;

export type GQL_QueryResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Query'] = GQL_ResolversParentTypes['Query']> = ResolversObject<{
  author?: Resolver<Maybe<GQL_ResolversTypes['Author']>, ParentType, ContextType, RequireFields<GQL_QueryAuthorArgs, 'input'>>;
  authorList?: Resolver<Array<GQL_ResolversTypes['Author']>, ParentType, ContextType, Partial<GQL_QueryAuthorListArgs>>;
  series?: Resolver<Maybe<GQL_ResolversTypes['Series']>, ParentType, ContextType, RequireFields<GQL_QuerySeriesArgs, 'input'>>;
  seriesList?: Resolver<Array<GQL_ResolversTypes['Series']>, ParentType, ContextType, Partial<GQL_QuerySeriesListArgs>>;
  word?: Resolver<Maybe<GQL_ResolversTypes['Word']>, ParentType, ContextType, RequireFields<GQL_QueryWordArgs, 'input'>>;
  wordList?: Resolver<Array<GQL_ResolversTypes['Word']>, ParentType, ContextType, Partial<GQL_QueryWordListArgs>>;
  work?: Resolver<Maybe<GQL_ResolversTypes['Work']>, ParentType, ContextType, RequireFields<GQL_QueryWorkArgs, 'input'>>;
  workList?: Resolver<Array<GQL_ResolversTypes['Work']>, ParentType, ContextType, Partial<GQL_QueryWorkListArgs>>;
}>;

export type GQL_SeriesResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Series'] = GQL_ResolversParentTypes['Series']> = ResolversObject<{
  authors?: Resolver<Array<GQL_ResolversTypes['Author']>, ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<GQL_ResolversTypes['ReadStatus'], ParentType, ContextType>;
  title?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  volumes?: Resolver<Array<GQL_ResolversTypes['Work']>, ParentType, ContextType>;
  wordCount?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType, Partial<GQL_SeriesWordCountArgs>>;
  words?: Resolver<Array<GQL_ResolversTypes['Word']>, ParentType, ContextType, Partial<GQL_SeriesWordsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_SetReadStatusResponseResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['SetReadStatusResponse'] = GQL_ResolversParentTypes['SetReadStatusResponse']> = ResolversObject<{
  code?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  readStatus?: Resolver<Maybe<GQL_ResolversTypes['ReadStatus']>, ParentType, ContextType>;
  success?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_WordResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Word'] = GQL_ResolversParentTypes['Word']> = ResolversObject<{
  componentNumber?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>;
  entryNumber?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  excluded?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  frequency?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  ignored?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>;
  info?: Resolver<GQL_ResolversTypes['JSON'], ParentType, ContextType>;
  known?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  pageNumber?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  sentenceNumber?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  volumeNumber?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_WordChangeResponseResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['WordChangeResponse'] = GQL_ResolversParentTypes['WordChangeResponse']> = ResolversObject<{
  code?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  wordId?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_WorkResolvers<ContextType = GQL_Context, ParentType extends GQL_ResolversParentTypes['Work'] = GQL_ResolversParentTypes['Work']> = ResolversObject<{
  authors?: Resolver<Array<GQL_ResolversTypes['Author']>, ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>;
  maxProgress?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  numberInSeries?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>;
  progress?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  series?: Resolver<Maybe<GQL_ResolversTypes['Series']>, ParentType, ContextType>;
  status?: Resolver<GQL_ResolversTypes['ReadStatus'], ParentType, ContextType>;
  title?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQL_ResolversTypes['WorkType'], ParentType, ContextType>;
  wordCount?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType, Partial<GQL_WorkWordCountArgs>>;
  words?: Resolver<Array<GQL_ResolversTypes['Word']>, ParentType, ContextType, Partial<GQL_WorkWordsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_Resolvers<ContextType = GQL_Context> = ResolversObject<{
  Author?: GQL_AuthorResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: GQL_MutationResolvers<ContextType>;
  Query?: GQL_QueryResolvers<ContextType>;
  Series?: GQL_SeriesResolvers<ContextType>;
  SetReadStatusResponse?: GQL_SetReadStatusResponseResolvers<ContextType>;
  Word?: GQL_WordResolvers<ContextType>;
  WordChangeResponse?: GQL_WordChangeResponseResolvers<ContextType>;
  Work?: GQL_WorkResolvers<ContextType>;
}>;

