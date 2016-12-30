import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tex } from '#/main/core/translation/index'
import PageHeader from '#/main/core/layout/page/components/page-header.jsx'
import { actions } from './../actions'
import InstrumentMenu from './../../instrument/components/menu.jsx'
import TuningMenu from './tuning-menu.jsx'
import { Placeholder } from './../../components/placeholder.jsx'

const T = React.PropTypes

class Tuner extends Component {
  renderPlaceholder() {
    return (
      <Placeholder
        icon="fa fa-fw fa-question"
        title="no instrument"
        help="select an instrument first."
      />
    )
  }

  renderTuner() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <TuningMenu
            selected={this.props.selectedTuning}
            tunings={this.props.tunings}
            handleSelect={this.props.selectTuning}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <PageHeader title="Tuner" />
        
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-xs-12">
            <InstrumentMenu
              handleSelect={() => {return true}}
            />
          </div>

          <div className="col-md-5 col-xs-12">
            {null !== this.props.selectedInstrument && this.renderTuner()}
          </div>
        </div>
      </div>
    )
  }
}

Tuner.propTypes = {
  selectedInstrument: T.object,
  selectedTuning: T.object,
  tunings: T.array.isRequired,
  selectTuning: T.func.isRequired
}

Tuner.defaultProps = {
  selectedInstrument: null,
  selectedTuning: null
}

function mapStateToProps(state) {
  return {
    selectedTuning: state.tuning,
    tunings: state.tunings
  }
}

export default connect(mapStateToProps, actions)(Tuner)
