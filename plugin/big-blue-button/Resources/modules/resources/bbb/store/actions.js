import shajs from 'sha.js'

import {makeActionCreator} from '#/main/app/store/actions'
import {API_REQUEST} from '#/main/app/api'

export const CAN_JOIN_UPDATE = 'CAN_JOIN_UPDATE'
export const BBB_URL_UPDATE ='BBB_URL_UPDATE'

export const actions = {}

actions.connectToBBB = () => (dispatch, getState) => {
  const state = getState()
  const resourceId = state.resource.id
  const serverUrl = state.config.serverUrl
  const securitySalt = state.config.securitySalt

  if (serverUrl && securitySalt) {
    dispatch({
      [API_REQUEST]: {
        url: ['claro_bbb_create', {bbb: resourceId}],
        request: {
          method: 'GET'
        },
        success: (data, dispatch) => {
          dispatch(actions.generateBBBJoinUrl())
        }
      }
    })
  }
}

actions.generateBBBJoinUrl = () => (dispatch, getState) => {
  const state = getState()
  const user = state.user
  const userName = user.fullName
  const resourceNode = state.resourceNode
  const serverUrl = state.config.serverUrl
  const securitySalt = state.config.securitySalt
  const password = state.editable ? 'manager' : 'collaborator'
  const queryString = `meetingID=${resourceNode.id}&password=${password}&userId=${user.id}&fullName=${encodeURIComponent(userName)}`
  const checksum = shajs('sha1').update(`join${queryString}${securitySalt}`).digest('hex')
  const joinUrl = `${serverUrl}/bigbluebutton/api/join?${queryString}&checksum=${checksum}`

  dispatch(actions.updateBBBJoinUrl(joinUrl))
}

actions.updateBBBJoinUrl = makeActionCreator(BBB_URL_UPDATE, 'url')

actions.updateCanJoin = makeActionCreator(CAN_JOIN_UPDATE, 'value')

actions.endBBB = () => (dispatch, getState) => {
  const resourceId = getState().resource.id

  dispatch({
    [API_REQUEST]: {
      url: ['claro_bbb_end', {bbb: resourceId}],
      request: {
        method: 'POST'
      }
    }
  })
}

actions.checkForModerators = () => (dispatch, getState) => {
  const resourceId = getState().resource.id

  dispatch({
    [API_REQUEST]: {
      url: ['claro_bbb_moderators_check', {bbb: resourceId}],
      request: {
        method: 'GET'
      },
      success: (data, dispatch) => {
        dispatch(actions.updateCanJoin(data))
      }
    }
  })
}
