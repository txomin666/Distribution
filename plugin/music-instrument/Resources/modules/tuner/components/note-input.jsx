import React, { Component } from 'react'

const T = React.PropTypes

export default class NoteInput extends Component {
  render() {
    return (
      <div className="note-input">
        <button type="button" className="btn btn-secondary" onClick={() => this.props.handlePrevious(this.props.note)}>
          <span className="fa fa-fw fa-caret-up"></span>
          <span className="sr-only">next</span>
        </button>

        <div
          className="note"
          style={{color: this.props.note.color}}
          onClick={ () => this.props.handlePlay(this.props.note)}
        >
          {this.props.note.flat_name}
          <small>{this.props.note.octave}</small>
        </div>

        <button type="button" class="btn btn-secondary" onClick={() => this.props.handleNext(this.props.note)}>
          <span className="fa fa-fw fa-caret-down"></span>
          <span className="sr-only">previous</span>
        </button>
      </div>
    )
  }
}

NoteInput.propTypes = {
  note: T.object.isRequired,
  handlePlay: T.func.isRequired,
  handleNext: T.func.isRequired,
  handlePrevious: T.func.isRequired
}
