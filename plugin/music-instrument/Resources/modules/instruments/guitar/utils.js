
const fretPosition = (fretNumber, stringLength) => stringLength - (stringLength / Math.pow(2, fretNumber / 12))

export {
  fretPosition
}
