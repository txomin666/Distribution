import React from 'react'
import {PropTypes as T, implementPropTypes} from '#/main/core/scaffolding/prop-types'

import {FormGroupWithField as FormGroupWithFieldTypes} from '#/main/core/layout/form/prop-types'
import {FormGroup} from '#/main/core/layout/form/components/group/form-group'
import {User as UserType} from '#/main/core/user/prop-types'
import {UsersInput} from '#/main/core/data/types/users/components/input'

const UsersGroup = props =>
  <FormGroup {...props}>
    <UsersInput {...props} />
  </FormGroup>

implementPropTypes(UsersGroup, FormGroupWithFieldTypes, {
  value: T.arrayOf(T.shape(UserType.propTypes))
})

export {
  UsersGroup
}
