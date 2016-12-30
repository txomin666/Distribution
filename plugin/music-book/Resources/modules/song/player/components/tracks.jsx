import React, { Component, PropTypes as T } from 'react'

import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'

import {Icon as InstrumentIcon} from '#/plugin/music-instrument/instrument/components/icon.jsx'

const TrackHeader = props =>
  <div>
    <h3 className="panel-title">
      <InstrumentIcon name={props.type} />
      {props.name}

      <div className="pull-right track-actions">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="midi-file-available">midi file available</Tooltip>}
        >
          <span className="fa fa-fw fa-file-audio-o"></span>
        </OverlayTrigger>
      </div>
    </h3>
  </div>

TrackHeader.propTypes = {
  name: T.string.isRequired,
  type: T.string.isRequired,
  onClick: T.func.isRequired
}

const Tracks = props =>
  <PanelGroup accordion>
    {props.tracks.map((track, index) => (
      <Panel
        key={track.id}
        collapsible={true}
        header={
          <TrackHeader name={track.name} type={track.type.name} onClick={() => true} />
        }
        eventKey={index}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </Panel>
    ))}
  </PanelGroup>

Tracks.propTypes = {
  tracks: T.arrayOf(T.shape({
    id: T.string.isRequired,
    name: T.string.isRequired,
    type: T.object.isRequired
  })).isRequired
}

export {Tracks}
