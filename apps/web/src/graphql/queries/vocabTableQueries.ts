import { gql } from '@apollo/client'

export const EXCLUDED_WORDS = gql`
  query ExcludedWords($input: CorpusScopedInput) {
    excludedWords(input: $input) {
      id
      info
      jlpt
    }
  }
`

export const FREQUENCY_LIST = gql`
  query FrequencyList($input: FrequencyListInput!) {
    frequencyList(input: $input) {
      id
      info
      jlpt
      frequency
      ignored
    }
  }
`

export const GLOSSARY = gql`
  query Glossary($input: GlossaryInput!) {
    glossary(input: $input) {
      id
      info
      jlpt
      frequency
      ignored
      volumeNumber
      pageNumber
      sentenceNumber
      entryNumber
      componentNumber
    }
  }
`

export const KNOWN_WORDS = gql`
  query KnownWords($input: CorpusScopedInput) {
    knownWords(input: $input) {
      id
      info
      jlpt
    }
  }
`

export const RECOMMENDED_WORDS = gql`
  query RecommendedWords($input: CorpusScopedInput) {
    recommendedWords(input: $input) {
      id
      info
      jlpt
      frequency
    }
  }
`

export const UPDATE_EXCLUDED_STATUS = gql`
  mutation UpdateExcludedStatus($input: UpdateExcludedStatusInput!) {
    updateExcludedStatus(input: $input) {
      success
    }
  }
`

export const UPDATE_IGNORED_STATUS = gql`
  mutation UpdateIgnoredStatus($input: UpdateIgnoredStatusInput!) {
    updateIgnoredStatus(input: $input) {
      success
    }
  }
`

export const UPDATE_KNOWN_STATUS = gql`
  mutation UpdateKnownStatus($input: UpdateKnownStatusInput!) {
    updateKnownStatus(input: $input) {
      success
    }
  }
`
