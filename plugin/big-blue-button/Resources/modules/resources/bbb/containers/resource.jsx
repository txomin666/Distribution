import {connect} from 'react-redux'

import {withReducer} from '#/main/app/store/components/withReducer'

import {selectors as resourceSelect} from '#/main/core/resource/store/selectors'
import {hasPermission} from '#/main/core/resource/permissions'

import {BBBResource as BBBResourceComponent} from '#/plugin/big-blue-button/resources/bbb/components/resource'
import {actions, reducer, select} from '#/plugin/big-blue-button/resources/bbb/store'

const BBBResource = withReducer(select.STORE_NAME, reducer)(
  connect(
    (state) => ({
      editable: hasPermission('edit', resourceSelect.resourceNode(state))
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
