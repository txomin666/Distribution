import React, { Component } from 'react'
const T = React.PropTypes

export class Placeholder extends Component {
  renderIcon() {
    return (
      <span className={`placeholder-icon ${this.props.icon}`}></span>
    )
  }

  renderTitle() {
    return (
      <span className="placeholder-title">{this.props.title}</span>
    )
  }

  renderHelp() {
    return (
      <span className="placeholder-help">{this.props.help}</span>
    )
  }

  render() {
    return (
      <div className="placeholder instrument-placeholder">
        {this.renderIcon()}
        <div className="placeholder-body">
          {this.renderTitle()}
          {null !== this.props.help ? this.renderHelp() : null}
        </div>
      </div>
    )
  }
}

Placeholder.propTypes = {
  icon: T.string,
  title: T.string.isRequired,
  help: T.string
}

Placeholder.defaultProps = {
  icon: 'fa fa-fw fa-hand-pointer-o',
  help: null
}
