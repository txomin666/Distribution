import {connect} from 'react-redux'

import {withReducer} from '#/main/app/store/components/withReducer'
import {actions as formActions} from '#/main/app/content/form/store/actions'

import {BBBConfig as BBBConfigComponent} from '#/plugin/big-blue-button/administration/bbb/components/resource'
import {actions, reducer, selectors} from '#/plugin/big-blue-button/administration/bbb/store'

const BBBConfig = withReducer(selectors.STORE_NAME, reducer)(
  connect(
    (state) => ({
      serverUrl: selectors.config(state).serverUrl,
      securitySalt: selectors.config(state).securitySalt,
      message: selectors.message(state),
      meetings: selectors.meetings(state)
    }),
    (dispatch) => ({
      saveForm(id) {
        dispatch(formActions.saveForm(selectors.STORE_NAME+'.bbbForm', ['apiv2_scorm_update', {bbb: id}]))
      },
      resetMessage() {
        dispatch(actions.resetConfigurationMessage())
      },
      getMeetings() {
        dispatch(actions.getMeetings())
      }
    })
  )(BBBConfigComponent)
)

export {
  BBBConfig
}
