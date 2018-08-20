import {connect} from 'react-redux'

import {withReducer} from '#/main/app/store/components/withReducer'

import {selectors as resourceSelect} from '#/main/core/resource/store/selectors'
import {hasPermission} from '#/main/core/resource/permissions'

import {BBBResource as BBBResourceComponent} from '#/plugin/forum/resources/forum/components/resource'
import {actions, reducer, select} from '#/plugin/forum/resources/forum/store'

const BBBResource = withReducer(select.STORE_NAME, reducer)(
  connect(
    (state) => ({
      canEdit: state.canEdit
    }),
    (dispatch) => ({
      validateForm: () => dispatch(actions.validateResourceForm()),
      endBBB: () => dispatch(actions.endBBB())
    })
  )(BBBResourceComponent)
)

export {
  BBBResource
}
