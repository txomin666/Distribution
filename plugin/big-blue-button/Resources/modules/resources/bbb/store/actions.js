import cloneDeep from 'lodash/cloneDeep'
import shajs from 'sha.js'

import {trans, t} from '#/main/core/translation'
import {isValidDate} from '#/main/core/scaffolding/date'
import {makeActionCreator} from '#/main/app/store/actions'
import {API_REQUEST} from '#/main/app/api'

export const BBB_URL_UPDATE = 'BBB_URL_UPDATE'
export const RESOURCE_FORM_INITIALIZE = 'RESOURCE_FORM_INITIALIZE'
export const RESOURCE_FORM_UPDATE = 'RESOURCE_FORM_UPDATE'
export const RESOURCE_INITIALIZE = 'RESOURCE_INITIALIZE'
export const CAN_JOIN_UPDATE = 'CAN_JOIN_UPDATE'
export const MESSAGE_RESET = 'MESSAGE_RESET'
export const MESSAGE_UPDATE = 'MESSAGE_UPDATE'

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

actions.saveConfig = () => (dispatch, getState) => {
  const form = getState().resourceForm
  const formData = new FormData()

  if (form.roomName) {
    formData.append('roomName', form.roomName)
  }
  if (form.welcomeMessage) {
    formData.append('welcomeMessage', form.welcomeMessage)
  }
  if (form.newTab !== undefined) {
    formData.append('newTab', form.newTab ? 1 : 0)
  }
  if (form.moderatorRequired !== undefined) {
    formData.append('moderatorRequired', form.moderatorRequired ? 1 : 0)
  }
  if (form.record !== undefined) {
    formData.append('record', form.record ? 1 : 0)
  }
  if (form.startDate) {
    formData.append('startDate', form.startDate)
  }
  if (form.endDate) {
    formData.append('endDate', form.endDate)
  }

  dispatch({
    [API_REQUEST]: {
      url: ['claro_bbb_configuration_save', {bbb: form.id}],
      request: {
        method: 'POST',
        body: formData
      },
      success: (data, dispatch) => {
        dispatch(actions.setResource(data))
        dispatch(actions.updateMessage(trans('bbb_params_saved_success_msg', {}, 'bbb'), 'success'))
      }
    }
  })
}

actions.updateCanJoin = makeActionCreator(CAN_JOIN_UPDATE, 'value')
actions.resetMessage = makeActionCreator(MESSAGE_RESET)
actions.updateMessage = makeActionCreator(MESSAGE_UPDATE, 'content', 'status')

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
