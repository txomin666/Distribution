import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {t, trans} from '#/main/core/translation'
import {EmptyPlaceholder} from '#/main/core/layout/components/placeholder.jsx'
import {FormContainer} from '#/main/core/data/form/containers/form.jsx'
import {select} from '#/main/core/data/form/selectors'

import {getDefinition} from '#/plugin/music-instrument/instruments'
import {InstrumentType as InstrumentTypeTypes} from '#/plugin/music-instrument/instruments/prop-types'
import {Icon as InstrumentIcon} from '#/plugin/music-instrument/instruments/components/icon.jsx'
import {Tuner} from '#/plugin/music-instrument/tuner/components/tuner.jsx'

const Inputs = props =>
  <div className="inputs-form">
    <EmptyPlaceholder
      size="lg"
      icon="fa fa-fw fa-sign-in"
      title="select an input"
      help="Lorem ipsum dolor sit amet"
    />
  </div>

const Outputs = props =>
  <div className="outputs-form">
    <EmptyPlaceholder
      size="lg"
      icon="fa fa-fw fa-sign-out"
      title="select an output"
      help="Lorem ipsum dolor sit amet"
    />
  </div>

const InstrumentTypeDesc = props =>
  <div className="panel panel-default">
    <div className="panel-body instrument-type">
      <InstrumentIcon name={props.instrument.type.name} size="lg" />
      <div>
        <span className="h4">Keyboard</span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </div>
  </div>

const EditorComponent = props =>
  <FormContainer
    level={2}
    name="instrument"
    sections={[
      {
        id: 'meta',
        icon: 'fa fa-fw fa-info',
        title: t('information'),
        fields: [
          {
            name: 'manufacturer',
            type: 'string',
            label: trans('manufacturer', {}, 'resource'),
          }, {
            name: 'model',
            type: 'string',
            label: trans('model', {}, 'resource'),
          }
        ]
      }, {
        id: 'parameters',
        icon: 'fa fa-fw fa-cog',
        title: t('parameters'),
        fields: getDefinition(props.instrument.type.name).editor
      }
    ]}
  >
    {props.instrument.type.tunable &&
      <Tuner instrument={props.instrument} />
    }

    <Inputs />
    <Outputs />
  </FormContainer>

EditorComponent.propTypes = {
  instrument: T.shape({
    type: T.shape(
      InstrumentTypeTypes.propTypes
    ).isRequired
  }).isRequired
}

const Editor = connect(
  state => ({
    instrument: select.data(select.form(state, 'instrument'))
  })
)(EditorComponent)

export {
  Editor
}