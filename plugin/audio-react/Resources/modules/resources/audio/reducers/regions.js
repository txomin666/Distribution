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


  })
}

export {
  regionReducer
}