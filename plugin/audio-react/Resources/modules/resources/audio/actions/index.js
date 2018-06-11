import {makeActionCreator} from '#/main/core/scaffolding/actions'
import {API_REQUEST} from '#/main/core/api/actions'
import {generateUrl} from '#/main/core/api/router'

const EDITOR_READ = 'EDITOR_READ'
const UPDATE_REGIONS_PLAYER ='UPDATE_REGIONS__PLAYER'
const UPDATE_REGION_ACTIVE_PLAYER ='UPDATE_REGION_ACTIVE_PLAYER'
const EDIT_PLAYER = 'EDIT_PLAYER'



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


actions.editorCanEdit = makeActionCreator(EDITOR_READ,'editor')
actions.updateRegionsPlayer = makeActionCreator(UPDATE_REGIONS_PLAYER,'regions')
actions.updateRegionActivePlayer = makeActionCreator(UPDATE_REGION_ACTIVE_PLAYER,'region')
actions.editPlayer = makeActionCreator(EDIT_PLAYER)



export {
  actions,
  EDIT_PLAYER,
  UPDATE_REGIONS_PLAYER,
  UPDATE_REGION_ACTIVE_PLAYER

}