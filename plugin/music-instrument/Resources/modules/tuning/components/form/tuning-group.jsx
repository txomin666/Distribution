import React from 'react'
import {PropTypes as T, implementPropTypes} from '#/main/core/scaffolding/prop-types'

import {FormGroup as FormGroupWithFieldTypes} from '#/main/core/layout/form/prop-types'
import {FormGroup} from '#/main/core/layout/form/components/group/form-group.jsx'
import {Tuning as TuningTypes} from '#/plugin/music-instrument/tuning/prop-types'
import {Tuning} from './tuning.jsx'

const TuningGroup = props =>
  <FormGroup
    {...props}
  >
    <Tuning
      {...props}
    />
  </FormGroup>

implementPropTypes(TuningGroup, FormGroupWithFieldTypes, {
  // more precise value type
  value: T.shape(
    TuningTypes.propTypes
  ),
  // custom props
  instrumentType: T.string
}, {
  value: null
})

export {
  TuningGroup
}
