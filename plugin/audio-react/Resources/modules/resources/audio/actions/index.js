import {makeActionCreator} from '#/main/core/scaffolding/actions'
import {API_REQUEST} from '#/main/core/api/actions'
import {generateUrl} from '#/main/core/api/router'

<<<<<<< HEAD
const EDITOR_READ = 'EDITOR_READ'
const UPDATE_REGIONS_PLAYER ='UPDATE_REGIONS__PLAYER'
const UPDATE_REGION_ACTIVE_PLAYER ='UPDATE_REGION_ACTIVE_PLAYER'
const EDIT_PLAYER = 'EDIT_PLAYER'
=======
const SUBTITLE_ADD = 'SUBTITLE_ADD'
const SUBTITLE_UPDATE = 'SUBTITLE_UPDATE'
const SUBTITLE_REMOVE = 'SUBTITLE_REMOVE'
const EDITOR_READ = 'EDITOR_READ'
const ADD_REGION_TO_PLAYER ='ADD_REGION_TO_PLAYER'
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d


const actions = {}

actions.saveSubtitle = (track) => (dispatch) => {
  if (track.autoId) {
    dispatch({
      [API_REQUEST]: {
        url: generateUrl('apiv2_videotrack_update', {id: track.id}),
        request: {
          method: 'PUT',
          body: JSON.stringify(track)
        },
        success: (data, dispatch) => {
          dispatch(actions.updateSubtitle(data))
        }
      }
    })
  } else {
    const formData = new FormData()
    formData.append('track', JSON.stringify(track))
    formData.append('file', track.file)

    dispatch({
      [API_REQUEST]: {
        url: generateUrl('apiv2_videotrack_create'),
        request: {
          method: 'POST',
          body: formData
        },
        success: (data, dispatch) => {
          dispatch(actions.addSubtitle(data))
        }
      }
    })
  }
}

actions.deleteSubtitle = (id) => ({
  [API_REQUEST]: {
    url: generateUrl('apiv2_videotrack_delete_bulk') + '?ids[]=' + id,
    request: {
      method: 'DELETE'
    },
    success: (data, dispatch) => dispatch(actions.removeSubtitle(id))
  }
})

<<<<<<< HEAD

actions.editorCanEdit = makeActionCreator(EDITOR_READ,'editor')
actions.updateRegionsPlayer = makeActionCreator(UPDATE_REGIONS_PLAYER,'regions')
actions.updateRegionActivePlayer = makeActionCreator(UPDATE_REGION_ACTIVE_PLAYER,'region')
actions.editPlayer = makeActionCreator(EDIT_PLAYER)
=======
// actions.addSubtitle = makeActionCreator(SUBTITLE_ADD, 'subtitle')
// actions.updateSubtitle = makeActionCreator(SUBTITLE_UPDATE, 'subtitle')
// actions.removeSubtitle = makeActionCreator(SUBTITLE_REMOVE, 'id')
actions.editorCanEdit = makeActionCreator(EDITOR_READ,'editor')
actions.addRegionToPlayer = makeActionCreator(ADD_REGION_TO_PLAYER,'region')
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d


export {
  actions,
<<<<<<< HEAD
  EDIT_PLAYER,
  UPDATE_REGIONS_PLAYER,
  UPDATE_REGION_ACTIVE_PLAYER
=======
  EDITOR_READ,
  ADD_REGION_TO_PLAYER
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
}