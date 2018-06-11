<<<<<<< HEAD
import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
  UPDATE_REGIONS_PLAYER,
  UPDATE_REGION_ACTIVE_PLAYER
} from '#/plugin/audio-react/resources/audio/actions'

const regionReducer = {
  regions: makeReducer({}, {

    [UPDATE_REGIONS_PLAYER]: (state, action) => {
      var regions = Object.values(action.regions)
      var newState = []
      regions.forEach((region)=>{
        newState.push({id:region.id,start:region.start,end:region.end,text:region.text})
      })
      newState = Object.assign({},state,{list:newState})
      return newState

    },
    [UPDATE_REGION_ACTIVE_PLAYER]: (state, action) => {
     
      var newState = Object.assign({},state,{active:action.region})
      return newState

    }


=======
import cloneDeep from 'lodash/cloneDeep'
import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
  ADD_REGION_TO_PLAYER
} from '#/plugin/audio-react/resources/audio/actions'

const regionReducer = {
  regions: makeReducer([], {

    [ADD_REGION_TO_PLAYER]: (state, action) => {
      const newState = cloneDeep(state)
      newState.push(action.region)

      return newState
    }
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
  })
}

export {
  regionReducer
}