import isEmpty from 'lodash/isEmpty'

import {chain, array, string, notBlank, unique} from '#/main/core/validation'
import {EnumGroup} from '#/main/app/data/enum/components/enum-group.jsx'

const dataType = {
  name: 'enum',
  validate: (value, options) => chain(value, options, [array, (value) => {
    if (value) {
      const errors = {}

      value.map((item, index) => {
        const error = chain(item.value, {}, [string, notBlank])

        if (error) {
          errors[index] = error
        }
      })

      if (options['unique']) {
        const uniqueErrors = chain(value.map(v => v.value), {sensitive: options['caseSensitive']}, [unique])

        if (uniqueErrors) {
          Object.keys(uniqueErrors).forEach(key => {
            if (!errors[key]) {
              errors[key] = uniqueErrors[key]
            }
          })
        }
      }
      if (!isEmpty(errors)) {
        return errors
      }
    }
  }]),
  components: {
    form: EnumGroup
  }
}

export {
  dataType
}
