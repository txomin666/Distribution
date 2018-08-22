import React, {Component} from 'react'
import {connect} from 'react-redux'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'
import {actions as formActions} from '#/main/app/content/form/store/actions'

import {actions, selectors} from '#/plugin/big-blue-button/resources/bbb/editor/store'
import {Meetings} from '#/plugin/big-blue-button/resources/bbb/configuration/meetings'

class EditorComponent extends Component {
  componentDidMount() {
    this.props.getMeetings()
  }

  componentWillUnmount() {
    this.props.resetMessage()
  }

  render() {
    return (
      <div>
        {this.props.message && this.props.message.content &&
          <div className={`alert alert-${this.props.message.type}`}>
            <i
              className="fa fa-times close"
              onClick={() => this.props.resetMessage()}
            >
            </i>
            {this.props.message.content}
          </div>
        }
        <BBBConfigForm
          saveForm={this.props.saveForm(this.props.bbb.id)}
        />
        {this.props.meetings.length > 0 &&
          <div>
            <hr/>
            <Meetings meetings={this.props.meetings}/>
          </div>
        }
      </div>
    )
  }
}

EditorComponent.propTypes = {
  serverUrl: T.string,
  securitySalt: T.string,
  message: T.object,
  meetings: T.arrayOf(T.shape({
    meetingID: T.string.isRequired,
    meetingName: T.string,
    createTime: T.string,
    createDate: T.string,
    attendeePW: T.string,
    moderatorPW: T.string,
    hasBeenForciblyEnded: T.string,
    running: T.string,
    participantCount: T.string,
    listenerCount: T.string,
    voiceParticipantCount: T.string,
    videoCount: T.string,
    duration: T.string,
    hasUserJoined: T.string,
    url: T.string
  })),
  updateConfig: T.func,
  saveConfig: T.func,
  resetMessage: T.func,
  getMeetings: T.func
}

function mapStateToProps(state) {
  return {
    serverUrl: state.config.serverUrl,
    securitySalt: state.config.securitySalt,
    message: state.message,
    meetings: state.meetings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveForm(id) {
      dispatch(formActions.saveForm(selectors.STORE_NAME+'.scormForm', ['apiv2_scorm_update', {scorm: id}]))
    },
    resetMessage() {
      dispatch(actions.resetConfigurationMessage())
    },
    getMeetings() {
      dispatch(actions.getMeetings())
    }
  }
}

const ConnectedBBBConfigForm = connect(mapStateToProps, mapDispatchToProps)(BBBConfigForm)

export {ConnectedBBBConfigForm as BBBConfigForm}
