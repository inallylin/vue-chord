import { expect, test } from 'vitest'
import { getTunnings } from '@/components/chord.ts'

test('getChordNameWithSuper:Dm7-5', () => {
  expect(getTunnings('zzzzzz')).toEqual(['E', 'A', 'D', 'G', 'B', 'e'])
})