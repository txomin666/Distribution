import {PropTypes as T} from 'prop-types'

const Note = {
  propTypes: {
    id: T.string.isRequired,
    sharp_name: T.string.isRequired,
    flat_name: T.string.isRequired,
    accidental: T.bool.isRequired,
    value: T.number.isRequired
  },
  defaultProps: {

  }
}

const Interval = {
  propTypes: {
    id: T.string.isRequired,
    name: T.string.isRequired
  },
  defaultProps: {

  }
}

const Chord = {
  propTypes: {
    id: T.string.isRequired,
    name: T.string.isRequired
  },
  defaultProps: {

  }
}

export {
  Note,
  Interval,
  Chord
}
