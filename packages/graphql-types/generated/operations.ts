export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  Abandoned = 'ABANDONED',
  None = 'NONE',
  Read = 'READ',
  Reading = 'READING',
  WantToRead = 'WANT_TO_READ'
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
  Manga = 'MANGA',
  Novel = 'NOVEL'
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

export type FormAuthorListQueryVariables = Exact<{ [key: string]: never; }>;


export type FormAuthorListQuery = { __typename?: 'Query', authorList: Array<{ __typename?: 'Author', name: string }> };

export type FormSeriesListQueryVariables = Exact<{ [key: string]: never; }>;


export type FormSeriesListQuery = { __typename?: 'Query', seriesList: Array<{ __typename?: 'Series', title: string, volumes: Array<{ __typename?: 'Work', numberInSeries?: number | null, type: WorkType, authors: Array<{ __typename?: 'Author', name: string }> }> }> };
