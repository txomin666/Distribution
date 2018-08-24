import {connect} from 'react-redux'

import {withReducer} from '#/main/app/store/components/withReducer'

import {selectors as resourceSelect} from '#/main/core/resource/store/selectors'
import {hasPermission} from '#/main/core/resource/permissions'

import {ResultResource as ResultResourceComponent} from '#/plugin/result/resources/results/components/resource'
import {reducer, selectors} from '#/plugin/result/resources/results/store'

const ResultResource = withReducer(selectors.STORE_NAME, reducer)(
  connect(
    (state) => ({
      result: selectors.result(state),
      editable: hasPermission('edit', resourceSelect.resourceNode(state))
    })
  )(ResultResourceComponent)
)

export {
  ResultResource
}
