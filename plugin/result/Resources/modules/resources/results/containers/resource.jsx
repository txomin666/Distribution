import {withReducer} from '#/main/app/store/components/withReducer'

import {ResultResource as ResultResourceComponent} from '#/plugin/result/resources/results/components/resource'
import {reducer, selectors} from '#/main/core/resources/text/store'

const ResultResource = withReducer(selectors.STORE_NAME, reducer)(ResultResourceComponent)

export {
  ResultResource
}
