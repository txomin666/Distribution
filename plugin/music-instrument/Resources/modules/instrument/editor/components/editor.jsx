import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import classes from 'classnames'

import { tex } from '#/main/core/translation/index'

import {
  INPUTS_SECTION,
  OUTPUTS_SECTION,
  PROPERTIES_SECTION,
  CONFIG_SECTION
} from './../enums'
import { actions as editorActions } from './../actions'
import { getDefinition } from './../../../instrument-type'
import { Icon as InstrumentIcon } from './../../../instrument-type/components/icon.jsx'
import { Placeholder } from './../../../components/placeholder.jsx'

const Thumbnail = props =>
  <button
    href=""
    role="button"
    className={classes('thumbnail', props.active ? 'active' : null)}
    onClick={props.onClick}
  >
    <span className={classes('thumbnail-icon', props.icon)}></span>
    <span className="thumbnail-label hidden-xs">{props.label}</span>
  </button>

Thumbnail.propTypes = {
  active: T.bool,
  icon: T.string.isRequired,
  label: T.string.isRequired,
  onClick: T.func.isRequired
}

Thumbnail.defaultProps = {
  active: false
}

const Menu = props =>
  <nav className="thumbnail-box">
    <Thumbnail
      icon="fa fa-info"
      label="info"
      onClick={() => props.changeSection(PROPERTIES_SECTION)}
      active={PROPERTIES_SECTION === props.currentSection}
    />

    <Thumbnail
      icon="fa fa-cog"
      label="config"
      onClick={() => props.changeSection(CONFIG_SECTION)}
      active={CONFIG_SECTION === props.currentSection}
    />

    <Thumbnail
      icon="fa fa-sign-in"
      label="inputs"
      onClick={() => props.changeSection(INPUTS_SECTION)}
      active={INPUTS_SECTION === props.currentSection}
    />

    <Thumbnail
      icon="fa fa-sign-out"
      label="outputs"
      onClick={() => props.changeSection(OUTPUTS_SECTION)}
      active={OUTPUTS_SECTION === props.currentSection}
    />
  </nav>

Menu.propTypes = {
  currentSection: T.string.isRequired,
  changeSection: T.func.isRequired
}

const Inputs = props =>
  <div className="inputs-form">
    <Placeholder
      icon="fa fa-fw fa-sign-in"
      title="select an input"
      help="Lorem ipsum dolor sit amet"
    />
  </div>

const Outputs = props =>
  <div className="outputs-form">
    <Placeholder
      icon="fa fa-fw fa-sign-out"
      title="select an output"
      help="Lorem ipsum dolor sit amet"
    />
  </div>

const Properties = props =>
  <div>
    <div className="panel panel-default">
      <div className="panel-body instrument-type">
        <InstrumentIcon name={props.instrument.type} size="lg" />
        <div>
          <span className="h4">Keyboard</span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </div>
    </div>

    <div className="panel panel-default">
      <div className="panel-body">
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input type="text" id="manufacturer" className="form-control" value="" />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input type="text" id="model" className="form-control" value="" />
        </div>
      </div>
    </div>
  </div>

const Editor = props => {
  let currentSection

  switch (props.currentSection) {
    case INPUTS_SECTION:
      currentSection = <Inputs instrument={props.instrument} />

      break
    case OUTPUTS_SECTION:
      currentSection = <Outputs instrument={props.instrument} />

      break
    case PROPERTIES_SECTION:
      currentSection = <Properties instrument={props.instrument}/>
      break
    case CONFIG_SECTION:
      currentSection = React.createElement(
        getDefinition(props.instrument.type).editor, {
          instrument: props.instrument
        }
      )
      break
  }

  return (
    <div className="instrument-editor row">
      <div className="col-md-1">
        <Menu
          currentSection={props.currentSection}
          changeSection={props.changeSection}
        />
      </div>

      <div className="col-md-11">
        {currentSection}
      </div>
    </div>
  )
}

Editor.propTypes = {
  instrument: T.object.isRequired,
  changeSection: T.func.isRequired,
  currentSection: T.oneOf([
    INPUTS_SECTION,
    OUTPUTS_SECTION,
    PROPERTIES_SECTION,
    CONFIG_SECTION
  ]).isRequired
}

function mapStateToProps(state) {
  return {
    instrument: state.instrument,
    currentSection: state.editor.currentSection
  }
}

const ConnectedEditor = connect(mapStateToProps, editorActions)(Editor)

export {ConnectedEditor as Editor}
