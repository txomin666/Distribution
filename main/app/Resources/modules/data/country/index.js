import {trans, tval} from '#/main/core/translation'
import {chain, string} from '#/main/core/validation'

import {constants as intlConstants} from '#/main/app/intl/constants'
import {CountryGroup} from '#/main/core/layout/form/components/group/country-group.jsx'
// todo add search

const dataType = {
  name: 'country',
  meta: {
    creatable: true,
    icon: 'fa fa-fw fa-globe',
    label: trans('country'),
    description: trans('country_desc')
  },

  parse: (display) => display,

  /**
   * Translates country code for display.
   * @param {string|Array} raw
   */
  render: (raw) => {
    if (raw) {
      if (Array.isArray(raw)) {
        return raw.map(country => trans(`${country}`, {}, 'regions')).join(', ')
      } else {
        return trans(`${raw}`, {}, 'regions')
      }
    }

    return null
  },

  validate: (value, options) => chain(value, options, [string, (countryCodes) => {
    if (options.multiple && Array.isArray(countryCodes)) {
      if (countryCodes.find(country => !intlConstants.REGION_CODES[country])) {
        // there are at least one invalid country in the list
        return tval('This value should be a list of valid country codes.')
      }
    } else if (!intlConstants.REGION_CODES.find(code => code === countryCodes)) {
      // invalid country code
      return tval('This value should be a valid country code.')
    }
  }]),
  components: {
    form: CountryGroup
  }
}

export {
  dataType
}
