import { GraphQLResolveInfo } from 'graphql';
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
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AuthorInput = {
  id: Scalars['String']['input'];
};

export type Media = Series | Work;

export type Mutation = {
  __typename?: 'Mutation';
  updateReadStatus: SetReadStatusResponse;
  updateWord: WordChangeResponse;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authorList: Array<Maybe<Author>>;
  series?: Maybe<Series>;
  seriesList: Array<Maybe<Series>>;
  word?: Maybe<Word>;
  wordList: Array<Maybe<Word>>;
  work?: Maybe<Work>;
  workList: Array<Maybe<Work>>;
};


export type QueryAuthorArgs = {
  input: AuthorInput;
};

export enum ReadStatus {
  Abandoned = 'ABANDONED',
  Read = 'READ',
  Reading = 'READING',
  WantToRead = 'WANT_TO_READ'
}

export type Series = {
  __typename?: 'Series';
  id: Scalars['ID']['output'];
  status: ReadStatus;
  title: Scalars['String']['output'];
  vocab: Array<Word>;
  volumes: Array<Work>;
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
  entryNumber: Scalars['Int']['output'];
  excluded: Scalars['Boolean']['output'];
  frequency?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  ignored: Scalars['Boolean']['output'];
  info: Scalars['String']['output'];
  known: Scalars['Boolean']['output'];
  pageNumber: Scalars['Int']['output'];
  sentenceNumber: Scalars['Int']['output'];
  volumeNumber?: Maybe<Scalars['Int']['output']>;
};

export type WordChangeResponse = {
  __typename?: 'WordChangeResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  wordId?: Maybe<Scalars['String']['output']>;
};

export type Work = {
  __typename?: 'Work';
  authors: Array<Author>;
  id: Scalars['ID']['output'];
  maxProgress: Scalars['Int']['output'];
  numberInSeries?: Maybe<Scalars['Int']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  status: ReadStatus;
  title: Scalars['String']['output'];
  type: WorkType;
  vocab: Array<Word>;
};

export enum WorkType {
  Manga = 'MANGA',
  Novel = 'NOVEL'
}

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

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Media: ( Series ) | ( Work );
}>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Author: ResolverTypeWrapper<Author>;
  AuthorInput: AuthorInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Media: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Media']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReadStatus: ReadStatus;
  Series: ResolverTypeWrapper<Series>;
  SetReadStatusResponse: ResolverTypeWrapper<SetReadStatusResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Word: ResolverTypeWrapper<Word>;
  WordChangeResponse: ResolverTypeWrapper<WordChangeResponse>;
  Work: ResolverTypeWrapper<Work>;
  WorkType: WorkType;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Author: Author;
  AuthorInput: AuthorInput;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Media: ResolversUnionTypes<ResolversParentTypes>['Media'];
  Mutation: {};
  Query: {};
  Series: Series;
  SetReadStatusResponse: SetReadStatusResponse;
  String: Scalars['String']['output'];
  Word: Word;
  WordChangeResponse: WordChangeResponse;
  Work: Work;
}>;

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Series' | 'Work', ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  updateReadStatus?: Resolver<ResolversTypes['SetReadStatusResponse'], ParentType, ContextType>;
  updateWord?: Resolver<ResolversTypes['WordChangeResponse'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorArgs, 'input'>>;
  authorList?: Resolver<Array<Maybe<ResolversTypes['Author']>>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType>;
  seriesList?: Resolver<Array<Maybe<ResolversTypes['Series']>>, ParentType, ContextType>;
  word?: Resolver<Maybe<ResolversTypes['Word']>, ParentType, ContextType>;
  wordList?: Resolver<Array<Maybe<ResolversTypes['Word']>>, ParentType, ContextType>;
  work?: Resolver<Maybe<ResolversTypes['Work']>, ParentType, ContextType>;
  workList?: Resolver<Array<Maybe<ResolversTypes['Work']>>, ParentType, ContextType>;
}>;

export type SeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Series'] = ResolversParentTypes['Series']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ReadStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vocab?: Resolver<Array<ResolversTypes['Word']>, ParentType, ContextType>;
  volumes?: Resolver<Array<ResolversTypes['Work']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetReadStatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetReadStatusResponse'] = ResolversParentTypes['SetReadStatusResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  readStatus?: Resolver<Maybe<ResolversTypes['ReadStatus']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Word'] = ResolversParentTypes['Word']> = ResolversObject<{
  componentNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  entryNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  excluded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ignored?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  info?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  known?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sentenceNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volumeNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WordChangeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WordChangeResponse'] = ResolversParentTypes['WordChangeResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  wordId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Work'] = ResolversParentTypes['Work']> = ResolversObject<{
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxProgress?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberInSeries?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ReadStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['WorkType'], ParentType, ContextType>;
  vocab?: Resolver<Array<ResolversTypes['Word']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Author?: AuthorResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Series?: SeriesResolvers<ContextType>;
  SetReadStatusResponse?: SetReadStatusResponseResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
  WordChangeResponse?: WordChangeResponseResolvers<ContextType>;
  Work?: WorkResolvers<ContextType>;
}>;

