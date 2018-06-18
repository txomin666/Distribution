import React from 'react'
import {actions} from '#/plugin/audio-react/resources/audio/actions'
import {connect} from 'react-redux'

const WaveSurferRegionList = props => {

  let {regions,regionSelect,regionActive,regionPlay,regionNote,regionRemove} = props
  if (regions && regionActive )
    return (
      <div>
        <div className="row">
          <div className="col-xs-1">###start###</div>
          <div className="col-xs-1">###end###</div>
          <div className="col-xs-8">###transcription###</div>
          <div className="col-xs-2">###actions###</div>
        </div>
        {regions.map(region => {
          return (
            <div key={region.id} className="player-react-list">
              <div className={`row region-list-item ${regionActive.id==region.id ? 'region-active' : ''}`}  onMouseOver={()=>regionSelect(region)} >
                <div className="col-xs-1">
                  <input
                    type="text"
                    disabled
                    className="form-control "
                    value={region.start.toFixed(2)}
                  />
                </div>
                <div className="col-xs-1">
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={region.end.toFixed(2)}
                  />
                </div>
                <div className="col-xs-8">
                  <input type="text" className="form-control" onChange={regionNote} value={region.note} />
                </div>
                <div className="col-xs-2">
                  <div className="btn-group" role="group">
                    <button
                      onClick={regionPlay}
                      type="button"
                      className="btn btn-default"
                      title="Play / Pause region"
                      value={region}
                    >
                      <i className="fa fa-play" />
                    </button>
                    <button
                      role="button"
                      type="button"
                      className="btn btn-default"
                      title="Configure help for the region"
                    >
                      <i className="fa fa-cog" />
                    </button>
                    <button
                      onClick={regionRemove}
                      role="button"
                      data-ng-disabled="$ctrl.resource.regions.length === 1"
                      type="button"
                      className="btn btn-danger"
                      title="Delete region"
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )

  return <h1>Region Empty !</h1>
}

export default connect(
  state => ({
    regions: state.regions.list,
    regionActive:state.regions.active
  }),
  dispatch => ({
    updateRegions: regions => dispatch(actions.updateRegionsPlayer(regions)),
  })
)(WaveSurferRegionList)
