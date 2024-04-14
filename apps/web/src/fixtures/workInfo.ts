import { WorkInfo } from '../types/WorkInfo'
import { mockVocab } from './vocab'

export const mockWorkInfo: WorkInfo = {
  id: 'd73b7e49-da07-4edd-9ee0-0666a95595ea',
  title: 'クレヨンしんちゃん 6',
  authors: ['臼井 儀人'],
  status: 'reading' as const,
  progress: 47,
  maxProgress: 120,
  vocab: mockVocab,
}
