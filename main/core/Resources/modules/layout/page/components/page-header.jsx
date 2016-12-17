import React, { Component } from 'react'

const T = React.PropTypes

export default class PageHeader extends Component {
  render() {
    return (
      <div className="page-heading">
        <h1 className="page-header">
          {this.props.title}
          &nbsp;
          {null !== this.props.subtitle && <small>{this.props.subtitle}</small>}
        </h1>

        {this.props.children}
      </div>
    )
  }
}

PageHeader.propTypes = {
  title: T.string.isRequired,
  subtitle: T.string
}

PageHeader.defaultTypes = {
  subtitle: null
}
