import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'
import {PageHeader, PageContainer} from '#/main/core/layout/page'

import {actions} from './../actions'
import {InstrumentMenu} from '#/plugin/music-instrument/resource/types/instrument/components/menu.jsx'
/*import {TuningMenu} from './tuning-menu.jsx'*/

const TunerTool = props =>
  <PageContainer>
    <PageHeader title={trans('claro_instrument_tuner', {}, 'tools')} />

    <div className="row">
      <div className="col-md-6 col-md-offset-3 col-xs-12">
        <InstrumentMenu
          handleSelect={() => true}
        />
      </div>

      {null !== props.selectedInstrument &&
        <div className="col-md-5 col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {/*<TuningMenu
                selected={props.selectedTuning}
                tunings={props.tunings}
                handleSelect={props.selectTuning}
              />*/}
            </div>
          </div>
        </div>
      }
    </div>
  </PageContainer>

TunerTool.propTypes = {
  selectedInstrument: T.object,
  selectedTuning: T.object,
  tunings: T.array.isRequired,
  selectTuning: T.func.isRequired
}

TunerTool.defaultProps = {
  selectedInstrument: null,
  selectedTuning: null
}

const Tool = connect(
  state => ({
    selectedTuning: state.tuning,
    tunings: state.tunings
  }),
  actions
)(TunerTool)

export {
  Tool
}
