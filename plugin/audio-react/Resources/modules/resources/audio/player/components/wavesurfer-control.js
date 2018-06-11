import React from 'react'

const WaveSurferControl = props => {

  return (
    <div className="row ">
      <div className="col-xs-4 col-md-offset-4 player-react-control">
        <button className="btn btn-default " onClick={props.toogglePlay}>
          {' '}
          <span
            className={`fa big ${props.playing ? 'fa-pause' : 'fa-play'}`}
          />
        </button>
        <button className="btn btn-warning " onClick={props.regionAdd}>
          {' '}
          <span className="fa fa-flag" />
        </button>
        <button className="btn btn-default " onClick={props.regionPlay}>
          {' '}
          <span className="fa fa-step-forward" />
        </button>
        <button className="btn btn-default " onClick={props.regionReset}>
          {' '}
          <span className="fa fa-stop-circle" />
        </button>
      </div>
    </div>
  )
}

export default WaveSurferControl
