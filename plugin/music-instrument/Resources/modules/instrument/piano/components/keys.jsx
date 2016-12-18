import React, { Component } from 'react'
import classes from 'classnames'

const T = React.PropTypes

class PianoKey extends Component {
  render() {
    return (
      <button
        className={classes('key', this.props.className, this.props.pressed ? 'active' : null)}
        onMouseDown={this.props.onPress}
        onMouseUp={this.props.onRelease}
      >
        <span className={classes('note-name', !this.props.showNote ? 'sr-only' : null)}>
          {this.props.note.sharp_name}
        </span>
      </button>
    )
  }
}

PianoKey.propTypes = {
  className: T.node,
  note: T.object.isRequired,
  showNote: T.bool,
  pressed: T.bool,
  onPress: T.func,
  onRelease: T.func
}

PianoKey.defaultProp = {
  className: null,
  showNote: false,
  pressed: false,
  onPress: () => true,
  onRelease: () => true
}

class WhiteKey extends Component {
  render() {
    return (
      <PianoKey className="white-key" {...this.props} />
    )
  }
}

WhiteKey.propTypes = PianoKey.propTypes
WhiteKey.defaultProp = PianoKey.defaultProp

class BlackKey extends Component {
  render() {
    return (
      <PianoKey className="black-key" {...this.props} />
    )
  }
}

BlackKey.propTypes = PianoKey.propTypes
BlackKey.defaultProp = PianoKey.defaultProp

export {WhiteKey, BlackKey}
