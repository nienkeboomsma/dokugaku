import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AuthorInput = {
  authorId: Scalars['String']['input'];
};

export type AuthorListInput = {
  authorIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateSeriesReadStatus: SetReadStatusResponse;
  updateWord: WordChangeResponse;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authorList: Array<Author>;
  series?: Maybe<Series>;
  seriesList: Array<Series>;
  word?: Maybe<Word>;
  wordList: Array<Word>;
  work?: Maybe<Work>;
  workList: Array<Work>;
};


export type QueryAuthorArgs = {
  input: AuthorInput;
};


export type QueryAuthorListArgs = {
  input?: InputMaybe<AuthorListInput>;
};


export type QuerySeriesArgs = {
  input: SeriesInput;
};


export type QuerySeriesListArgs = {
  input?: InputMaybe<SeriesListInput>;
};


export type QueryWordArgs = {
  input: WordInput;
};


export type QueryWordListArgs = {
  input?: InputMaybe<WordListInput>;
};


export type QueryWorkArgs = {
  input: WorkInput;
};


export type QueryWorkListArgs = {
  input?: InputMaybe<WorkListInput>;
};

export enum ReadStatus {
  Abandoned = 'abandoned',
  None = 'none',
  Read = 'read',
  Reading = 'reading',
  WantToRead = 'want to read'
}

export type Series = {
  __typename?: 'Series';
  authors: Array<Author>;
  id: Scalars['ID']['output'];
  status?: Maybe<ReadStatus>;
  title: Scalars['String']['output'];
  vocab: Array<Word>;
  volumes: Array<Work>;
};


export type SeriesVocabArgs = {
  input?: InputMaybe<SeriesVocabInput>;
};


export type SeriesVolumesArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SeriesInput = {
  seriesId: Scalars['String']['input'];
  /** If no userId value is supplied 'status' will default to null. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SeriesListInput = {
  seriesIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** If no userId value is supplied 'status' will default to null. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SeriesVocabInput = {
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
  /**
   * Determines what series the 'ignored' value should be based on. If no
   * seriesIdInWhichIgnored or workIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  seriesIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  /**
   * If no userId value is supplied 'excluded', 'ignored' and 'known' will default
   * to null.
   */
  userId?: InputMaybe<Scalars['String']['input']>;
  wordIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /**
   * Determines what work the 'ignored' value should be based on. If no
   * workIdInWhichIgnored or seriesIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  workIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
};

export type SetReadStatusResponse = {
  __typename?: 'SetReadStatusResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  readStatus?: Maybe<ReadStatus>;
  success: Scalars['Boolean']['output'];
};

export type Word = {
  __typename?: 'Word';
  componentNumber?: Maybe<Scalars['Int']['output']>;
  entryNumber?: Maybe<Scalars['Int']['output']>;
  excluded?: Maybe<Scalars['Boolean']['output']>;
  frequency?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  ignored?: Maybe<Scalars['Boolean']['output']>;
  info: Scalars['JSON']['output'];
  known?: Maybe<Scalars['Boolean']['output']>;
  pageNumber?: Maybe<Scalars['Int']['output']>;
  sentenceNumber?: Maybe<Scalars['Int']['output']>;
  volumeNumber?: Maybe<Scalars['Int']['output']>;
};

export type WordChangeResponse = {
  __typename?: 'WordChangeResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  wordId?: Maybe<Scalars['String']['output']>;
};

export type WordInput = {
  /**
   * Determines what series the 'ignored' value should be based on. If no
   * seriesIdInWhichIgnored or workIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  seriesIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  /**
   * If no userId value is supplied 'excluded', 'ignored' and 'known' will default
   * to null.
   */
  userId?: InputMaybe<Scalars['String']['input']>;
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

export type WordListInput = {
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
  /**
   * Determines what series the 'ignored' value should be based on. If no
   * seriesIdInWhichIgnored or workIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  seriesIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  /**
   * If no userId value is supplied 'excluded', 'ignored' and 'known' will default
   * to null.
   */
  userId?: InputMaybe<Scalars['String']['input']>;
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

export type Work = {
  __typename?: 'Work';
  authors: Array<Author>;
  id: Scalars['ID']['output'];
  maxProgress: Scalars['Int']['output'];
  numberInSeries?: Maybe<Scalars['Int']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  series?: Maybe<Series>;
  status?: Maybe<ReadStatus>;
  title: Scalars['String']['output'];
  type: WorkType;
  vocab: Array<Word>;
};


export type WorkSeriesArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type WorkVocabArgs = {
  input?: InputMaybe<WorkVocabInput>;
};

export type WorkInput = {
  /** Get only those works that are not part of a series. */
  excludeVolumesInSeries?: InputMaybe<Scalars['Boolean']['input']>;
  /** If no userId value is supplied 'progress' and 'status' will default to null. */
  userId?: InputMaybe<Scalars['String']['input']>;
  workId: Scalars['String']['input'];
};

export type WorkListInput = {
  /** Get only those works that are not part of a series. */
  excludeVolumesInSeries?: InputMaybe<Scalars['Boolean']['input']>;
  /** If no userId value is supplied 'progress' and 'status' will default to null. */
  userId?: InputMaybe<Scalars['String']['input']>;
  workIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum WorkType {
  Manga = 'manga',
  Novel = 'novel'
}

export type WorkVocabInput = {
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
  /**
   * Determines what series the 'ignored' value should be based on. If no
   * seriesIdInWhichIgnored or workIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  seriesIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
  /**
   * If no userId value is supplied 'excluded', 'ignored' and 'known' will default
   * to null.
   */
  userId?: InputMaybe<Scalars['String']['input']>;
  wordIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /**
   * Determines what work the 'ignored' value should be based on. If no
   * workIdInWhichIgnored or seriesIdInWhichIgnored value is supplied 'ignored'
   * will default to null.
   */
  workIdInWhichIgnored?: InputMaybe<Scalars['String']['input']>;
};



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
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  AuthorInput: AuthorInput;
  AuthorListInput: AuthorListInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReadStatus: ReadStatus;
  Series: ResolverTypeWrapper<Series>;
  SeriesInput: SeriesInput;
  SeriesListInput: SeriesListInput;
  SeriesVocabInput: SeriesVocabInput;
  SetReadStatusResponse: ResolverTypeWrapper<SetReadStatusResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Word: ResolverTypeWrapper<Word>;
  WordChangeResponse: ResolverTypeWrapper<WordChangeResponse>;
  WordInput: WordInput;
  WordListInput: WordListInput;
  Work: ResolverTypeWrapper<Work>;
  WorkInput: WorkInput;
  WorkListInput: WorkListInput;
  WorkType: WorkType;
  WorkVocabInput: WorkVocabInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  AuthorInput: AuthorInput;
  AuthorListInput: AuthorListInput;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  Series: Series;
  SeriesInput: SeriesInput;
  SeriesListInput: SeriesListInput;
  SeriesVocabInput: SeriesVocabInput;
  SetReadStatusResponse: SetReadStatusResponse;
  String: Scalars['String']['output'];
  Word: Word;
  WordChangeResponse: WordChangeResponse;
  WordInput: WordInput;
  WordListInput: WordListInput;
  Work: Work;
  WorkInput: WorkInput;
  WorkListInput: WorkListInput;
  WorkVocabInput: WorkVocabInput;
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateSeriesReadStatus?: Resolver<ResolversTypes['SetReadStatusResponse'], ParentType, ContextType>;
  updateWord?: Resolver<ResolversTypes['WordChangeResponse'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorArgs, 'input'>>;
  authorList?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType, Partial<QueryAuthorListArgs>>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType, RequireFields<QuerySeriesArgs, 'input'>>;
  seriesList?: Resolver<Array<ResolversTypes['Series']>, ParentType, ContextType, Partial<QuerySeriesListArgs>>;
  word?: Resolver<Maybe<ResolversTypes['Word']>, ParentType, ContextType, RequireFields<QueryWordArgs, 'input'>>;
  wordList?: Resolver<Array<ResolversTypes['Word']>, ParentType, ContextType, Partial<QueryWordListArgs>>;
  work?: Resolver<Maybe<ResolversTypes['Work']>, ParentType, ContextType, RequireFields<QueryWorkArgs, 'input'>>;
  workList?: Resolver<Array<ResolversTypes['Work']>, ParentType, ContextType, Partial<QueryWorkListArgs>>;
};

export type ReadStatusResolvers = { ABANDONED: 'abandoned', NONE: 'none', READ: 'read', READING: 'reading', WANT_TO_READ: 'want to read' };

export type SeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Series'] = ResolversParentTypes['Series']> = {
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ReadStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vocab?: Resolver<Array<ResolversTypes['Word']>, ParentType, ContextType, Partial<SeriesVocabArgs>>;
  volumes?: Resolver<Array<ResolversTypes['Work']>, ParentType, ContextType, Partial<SeriesVolumesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetReadStatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetReadStatusResponse'] = ResolversParentTypes['SetReadStatusResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  readStatus?: Resolver<Maybe<ResolversTypes['ReadStatus']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Word'] = ResolversParentTypes['Word']> = {
  componentNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  entryNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  excluded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ignored?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  known?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pageNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sentenceNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  volumeNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordChangeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WordChangeResponse'] = ResolversParentTypes['WordChangeResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  wordId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Work'] = ResolversParentTypes['Work']> = {
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxProgress?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberInSeries?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType, Partial<WorkSeriesArgs>>;
  status?: Resolver<Maybe<ResolversTypes['ReadStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['WorkType'], ParentType, ContextType>;
  vocab?: Resolver<Array<ResolversTypes['Word']>, ParentType, ContextType, Partial<WorkVocabArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkTypeResolvers = { MANGA: 'manga', NOVEL: 'novel' };

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReadStatus?: ReadStatusResolvers;
  Series?: SeriesResolvers<ContextType>;
  SetReadStatusResponse?: SetReadStatusResponseResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
  WordChangeResponse?: WordChangeResponseResolvers<ContextType>;
  Work?: WorkResolvers<ContextType>;
  WorkType?: WorkTypeResolvers;
};

