import React from 'react'
import classes from 'classnames'

import {PropTypes as T, implementPropTypes} from '#/main/core/scaffolding/prop-types'
import {FormField as FormFieldTypes} from '#/main/core/layout/form/prop-types'

const Text = props => props.long ?
  <textarea
    id={props.id}
    className={classes('form-control', {[`input-${props.size}`]: !!props.size})}
    value={props.value || ''}
    disabled={props.disabled}
    onChange={(e) => props.onChange(e.target.value)}
    rows={props.minRows}
  />
  :
  <input
    id={props.id}
    type="text"
    className={classes('form-control', {[`input-${props.size}`]: !!props.size})}
    value={props.value || ''}
    disabled={props.disabled}
    onChange={(e) => props.onChange(e.target.value)}
  />

implementPropTypes(Text, FormFieldTypes, {
  value: T.string,
  long: T.bool,
  minRows: T.number,
  minLength: T.number,
  maxLength: T.number
}, {
  value: '',
  long: false,
  minRows: 4
})

export {
  Text
}
