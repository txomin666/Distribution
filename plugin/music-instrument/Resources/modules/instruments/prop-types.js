import {PropTypes as T} from 'prop-types'

const InstrumentType = {
  propTypes: {
    id: T.string.isRequired,
    name: T.string.isRequired,
    polyphonic: T.bool,
    tunable: T.bool
  },
  defaultProps: {

  }
}

export {
  InstrumentType
}