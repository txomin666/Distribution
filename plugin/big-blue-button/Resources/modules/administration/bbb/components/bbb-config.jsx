import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'

import {Meetings} from '#/plugin/big-blue-button/administration/bbb/components/meetings'
import {BBBConfigForm} from '#/plugin/big-blue-button/administration/bbb/components/bbb-config-form'

class BBBConfig extends Component {
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

BBBConfig.propTypes = {
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
  saveForm: T.func,
  resetMessage: T.func,
  getMeetings: T.func
}

export {
  BBBConfig
}
