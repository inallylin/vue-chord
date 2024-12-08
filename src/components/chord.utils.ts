import type {
  ChordDiagramNamePart,
  ChordDiagramPosition,
  ChordFingering,
  ChordString
} from "@/components/chord.types.ts"

export const getChordNameWithSuper = (name: string) : ChordDiagramNamePart[] => {
  const matches = name.match(/(\d.*)|(\w)/ig)
  if (!matches?.length) {
    return []
  }
  return matches.map((t) => {
    return {
      text: t,
      super: /B|#|\d/i.test(t) ? true : false
    }
  })
}

// ==============
// Tunnings
// ==

const getDefaultTunnings = () : ChordString[] => {
  return ['E', 'A', 'D', 'G', 'B', 'e']
}

/**
 * Validate tunnings, throw error when invalid
 * @param {string} strStringName DADF#AD (valid)
 * @param {string} strStringName EADGBz (invalid)
 */
const validateTunnings = (strStringName: string) => {
  if (!/^([A-G][#b\+-]?){6}$/igm.test(strStringName)) {
    throw new Error(`invalid character in ${strStringName}, only allow A-G, #b+-`)
  }
}

/**
 * Get tunnings by context. When invalid, use default tunning
 * @param {string} context DADF#AD (valid, with sharp/flat or +- sign)
 * @returns ['D', 'A', 'D', 'F#', 'A', 'D']
 */
export const getTunnings = (context: string) : ChordString[] => {
  try {
    if (!context) {
      throw new Error(`Empty string names: ${context}`)
    }
    validateTunnings(context)
    const strings =  context.match(/(\w[#|b|\-|+]?)/g)
    if (!strings?.length) {
      throw new Error(`${context} has nothing match with string name pattern`)
    }
    return strings as ChordString[]
  } catch (e) {
    console.log('[getStringNames]', e)
    return getDefaultTunnings()
  }
}

// ==============
// Positions
// ==

/**
 * Validate positions, throw error when invalid
 * @param {string} strPositions x32010 (valid)
 * @param {string} strPositions x3023e (invalid)
 */
const validatePosition = (strPositions: string) : void => {
  if (!/^[\d|x]{6}$/im.test(strPositions)) {
    throw new Error('Invalid character for position, only allow string number and x')
  }
}

/**
 * Define the open/mute string mark (o/x) on diagram\
 * 0: mark as open string (o)\
 * -1: mark as mute string (x)\
 * 1: no mark (show position on fingerboard)
 * @param {string} strPositions - xx0232
 * @returns {Array} [-1, -1, 0, 1, 1, 1]
 */
export const getPositionMarks = (strPositions: string) : (1 | -1 | 0)[] => {
  try {
    if (!strPositions) {
      throw new Error(`Empty position ${strPositions}`)
    }
    validatePosition(strPositions)
    const matches = strPositions.match(/\d|x/img)
    if (!matches?.length) {
      throw new Error(`${strPositions} has nothing match with position pattern`)
    }
    return matches.map((m) => {
      if (m === '0') {
        return 0
      }
      if (m === 'x') {
        return -1
      }
      return 1
    })
  } catch (e) {
    console.log('[getPositionMarks]', e)
    return []
  }
}

/**
 * Get starting fret by positions\
 * We're used to seeing guitar chord diagrams within three frets. 
 * @param {string} strPositions - xx0454
 * @returns {number} 3
 * @param {string} strPositions - xx0231
 * @returns {number} 0
 * @param {string} strPositions - xx0999
 * @returns {number} 8
 */
export const getStartingFret = (strPositions: string) : number => {
  try {
    validatePosition(strPositions)
    const matches = strPositions.match(/[1-9]/ig)
    if (!matches?.length) {
      throw new Error('All mute string')
    }
    const start = Math.min(...matches.map(Number))
    const end = Math.max(...matches.map(Number))
    // focus on top 3
    if (end <= 3) {
      return 0
    }
    // e.g. xx0999, keep mark on 2nd row, start on 8fr
    if (start === end) {
      return start > 2 ? start - 1 : 0
    }
    // e.g. xx0454, keep mark on 2nd row, start on 3fr
    if (end - start === 1) {
      return start - 1
    }
    return start
  } catch (e) {
    console.log('[getStartingFret]', e)
    return 0
  }
}

export const getDisplayPositions = (strPositions: string): ChordDiagramPosition[] => {
  try {
    validatePosition(strPositions)
    if (!strPositions.match(/[1-9]/g)?.length) {
      // all open/mute strings
      return []
    }
    const matches = strPositions.match(/./g)!
    return matches.map((t, i) => {
      if (['0', 'x'].includes(t)) {
        return null
      }
      return {
        fret: Number(t),
        string: 6 - i
      }
    }).filter(c => !!c)
  } catch (e) {
    console.log('[getDisplayPositions]', e)
    return []
  }
}

export const getFingeringByGuitarString = (strFingerings: string, guitarString: number) : ChordFingering | null => {
  const fingering = strFingerings.split('')[6 - guitarString]
  // ignore - for display
  return /[T1234]/.test(fingering) ? (fingering as ChordFingering) : null
}