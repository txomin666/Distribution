import {connect} from 'react-redux'

import {withReducer} from '#/main/app/store/components/withReducer'

import {actions as formActions} from '#/main/app/content/form/store'
import {actions as historyActions} from '#/plugin/wiki/resources/wiki/history/store'

import {WikiResource as WikiResourceComponent} from '#/plugin/wiki/resources/wiki/components/resource'
import {reducer, selectors} from '#/plugin/wiki/resources/wiki/store'

const WikiResource = withReducer(selectors.STORE_NAME, reducer)(
  connect(
    (state) => ({
      wiki: selectors.wiki(state),
      canEdit: selectors.canEdit(state),
      canExport: selectors.canExport(state)
    }),
    (dispatch) => ({
      resetForm: (formData) => dispatch(formActions.resetForm('wikiForm', formData)),
      setCurrentHistorySection: (sectionId = null) => dispatch(historyActions.setCurrentHistorySection(sectionId)),
      setCurrentHistoryVersion: (sectionId = null, contributionId = null) => dispatch(historyActions.setCurrentHistoryVersion(sectionId, contributionId)),
      setCurrentHistoryCompareSet: (sectionId = null, id1 = null, id2 = null) => dispatch(historyActions.setCurrentHistoryCompareSet(sectionId, id1, id2))
    })
  )(WikiResourceComponent)
)

export {
  WikiResource
}
