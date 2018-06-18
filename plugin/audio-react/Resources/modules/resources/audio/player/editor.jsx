import React from 'react'
import {connect} from 'react-redux'
import {trans} from '#/main/core/translation'
//import {actions} from '#/plugin/audio-react/resources/audio/actions'
import WavePlayer from '#/plugin/audio-react/resources/audio/player/waveplayer'

const EditorComponent = props => {
  return (
    <div>
      <div className="panel panel-primary">
        <div className="panel-heading">
          {trans('audio_editor_header_options')}
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-2">###Mode Lecture###</div>
            <div className="col-xs-10">
              <select name="" id="" className="form-control">
                <option value="free">
                  {trans('audio_editor_mode_play_free')}{' '}
                </option>
                <option value="live">
                  {trans('audio_editor_mode_play_continu_free')}{' '}
                </option>
                <option value="pause">
                  {trans('audio_editor_mode_play_continu_pause')}{' '}
                </option>
                <option value="active">
                  {trans('audio_editor_mode_play_continu_active')}{' '}
                </option>
                <option value="scripted_active">
                  {trans('audio_editor_mode_play_scenarize_active')}{' '}
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2">###Language pour le Speech###</div>
            <div className="col-xs-10">
              <select name="" id="" className="form-control">
                <option value="english_us">
                  {trans('audio_editor_language_english_us')}{' '}
                </option>
                <option value="english_gb">
                  {trans('audio_editor_language_english_gb')}{' '}
                </option>
                <option value="german">
                  {trans('audio_editor_language_german')}{' '}
                </option>
                <option value="spain">
                  {trans('audio_editor_language_spain')}{' '}
                </option>
                <option value="italian">
                  {trans('audio_editor_language_italian')}{' '}
                </option>
                <option value="french">
                  {trans('audio_editor_language_french')}{' '}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="panel panel-primary">
        <div className="panel-heading" />
        <div className="panel-body">
          <WavePlayer src={'http://claroline.local/test.mp3'} edit={true} />
        </div>
      </div>
    </div>
  )
}

const Editor = connect(state => ({
  resource: state.resourceNode,
  url: state.url,
  canEdit: true,
  canDownload: true,
  editable: state.tracks.editor,
}))(EditorComponent)

export {Editor}
