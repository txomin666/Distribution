import {trans} from '#/main/core/translation'
import {chain, number, inRange} from '#/main/core/validation'

import {NumberGroup} from '#/main/core/layout/form/components/group/number-group'

/**
 * Number definition.
 * Manages numeric values.
 */
const dataType = {
  name: 'number',
  meta: {
    creatable: true,
    icon: 'fa fa-fw fa fa-calculator',
    label: trans('number'),
    description: trans('number_desc')
  },

  /**
   * The list of configuration fields.
   */
  configure: (options) => [
    {
      name: 'min',
      type: 'number',
      label: trans('min_value'),
      options: {
        max: options.max
      }
    }, {
      name: 'max',
      type: 'number',
      label: trans('max_value'),
      options: {
        min: options.min
      }
    }, {
      name: 'unit',
      type: 'string',
      label: trans('unit')
    }
  ],

  parse: (display) => parseFloat(display),

  /**
   * Displays a number value.
   * NB. trans typing to string permits to avoid React interpret 0 value as falsy and display nothing.
   *
   * @param {number}  raw
   * @param {options} options
   *
   * @return {string}
   */
  render: (raw, options) => raw || 0 === raw ? raw + (options.unit ? ' ' + options.unit : '') : null,

  /**
   * Validates a number value.
   *
   * @param {mixed}  value   - the value to validate
   * @param {object} options - the current number options
   *
   * @return {string} - the first error message if any
   */
  validate: (value, options) => chain(value, options, [number, inRange]),

  /**
   * Custom components for numbers rendering.
   */
  components: {
    form: NumberGroup
  }
}

export {
  dataType
}
