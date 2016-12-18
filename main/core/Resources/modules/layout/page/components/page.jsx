import React, { Component } from 'react'

const T = React.PropTypes

export default class Page extends Component {
  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
    )
  }
}

Page.propTypes = {
  fullScreen: T.bool,
  children: T.node
}

Page.defaultTypes = {
  fullScreen: false,
  children: null
}
