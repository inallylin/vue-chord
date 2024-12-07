export type ChordPosition = `x | ${number}`
export type ChordFingering = '-' | 'T' | '1' | '2' | '3' | '4'
export type Pitch = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'
export type ChordString = `${Pitch}` | `${Pitch}#` | `${Pitch}b`