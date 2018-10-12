import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'

import {trans} from '#/main/core/translation'

import {User as UserTypes} from '#/main/core/user/prop-types'

import {TooltipAction} from '#/main/core/layout/button/components/tooltip-action.jsx'
import {HtmlGroup} from '#/main/core/layout/form/components/group/html-group.jsx'
import {TextGroup} from '#/main/core/layout/form/components/group/text-group.jsx'

import {UserAvatar} from '#/main/core/user/components/avatar.jsx'

class UserMessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pendingChanges: false,
      content: props.content
    }
  }

  updateContent(content) {
    this.setState({
      pendingChanges: true,
      content: content
    })
  }

  render() {
    return (
      <div className={classes('user-message-container user-message-form-container', this.props.className, {
        'user-message-left': 'left' === this.props.position,
        'user-message-right': 'right' === this.props.position
      })}>
        {'left' === this.props.position &&
          <UserAvatar picture={this.props.user.picture} alt={false} />
        }

        <div className="user-message">
          <div className="user-message-meta">
            <div className="user-message-info">
              {this.props.user && this.props.user.name ?
                this.props.user.name : trans('unknown')
              }
            </div>

            {this.props.cancel &&
              <div className="user-message-actions">
                <TooltipAction
                  id="close"
                  className="btn-link-default"
                  position="bottom"
                  icon="fa fa-fw fa-times"
                  label={trans('cancel')}
                  action={this.props.cancel}
                />
              </div>
            }
          </div>

          {React.createElement(
            this.props.allowHtml ? HtmlGroup : TextGroup,
            {
              id: 'user-message-content',
              label: trans('message'),
              hideLabel: true,
              value: this.state.content,
              long: true,
              onChange: value => this.updateContent(value)
            }
          )}

          <button
            className="btn btn-block btn-primary btn-save btn-emphasis"
            disabled={!this.state.pendingChanges || !this.state.content}
            onClick={() => {
              this.props.submit(this.state.content)
              this.setState({pendingChanges: false, content: ''})
            }}
          >
            {this.props.submitLabel}
          </button>
        </div>

        {'right' === this.props.position &&
          <UserAvatar picture={this.props.user.picture} alt={false} />
        }
      </div>
    )
  }
}

UserMessageForm.propTypes = {
  className: T.string,

  /**
   * The user who have sent the message.
   *
   * @type {object}
   */
  user: T.shape(UserTypes.propTypes),

  /**
   * The content of the message.
   *
   * @type {string}
   */
  content: T.string,

  /**
   * Allow (or not) HTML in message content.
   *
   * @type {bool}
   */
  allowHtml: T.bool,

  /**
   * The position of the User avatar.
   *
   * @type {string}
   */
  position: T.oneOf(['left', 'right']),

  submitLabel: T.string,
  submit: T.func.isRequired,
  cancel: T.func
}

UserMessageForm.defaultProps = {
  className: '',
  user: {},
  content: '',
  allowHtml: false,
  position: 'left',
  submitLabel: trans('create')
}

export {
  UserMessageForm
}
