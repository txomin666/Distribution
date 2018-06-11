import React from 'react'
import {connect} from 'react-redux'
import {actions} from '#/plugin/audio-react/resources/audio/actions'
import {RoutedPageContent} from '#/main/core/layout/router'
import {ResourcePageContainer} from '#/main/core/resource/containers/page'
import {select as resourceSelect} from '#/main/core/resource/selectors'
import {trans} from '#/main/core/translation'
import {url} from '#/main/core/api/router'
import {Player} from '#/plugin/audio-react/resources/audio/player/player'
import {Editor} from '#/plugin/audio-react/resources/audio/player/editor'
import {PropTypes as T} from 'prop-types'

const Resources = props => {
  const routes = [
    {
      path: '/edit',
      component: Editor,
      disabled: !props.editable
    },
    {
      path: '/play',
      component: Player
    }
  ]
  return (
    <ResourcePageContainer
      editor={{
        path: '/edit',
        save: {
          disabled: false,
          action: () => {console.log('Save edit')}
        }
      }}

      customActions={[

        {
          type: 'download',
          icon: 'fa fa-fw fa-download',
          label: trans('download'),
          displayed: true,
          file: {
            url: url(['claro_resource_download'], {ids: []})
          }
        },
        {
          type: 'callback',
          icon: 'fa fa-fw fa-clipboard',
          label: trans('copy_permalink_to_clipboard'),
          callback: () => {}
        }
      ]}
    >
      <RoutedPageContent
        headerSpacer={true}
        redirect={[{from: '/', exact: true, to: '/play'}]}
        routes={routes}
      />
    </ResourcePageContainer>
  )
}
Resources.propTypes = {
  resource: T.shape({
    id: T.string.isRequired,
    autoId: T.number.isRequired
  }).isRequired,
  url: T.string.isRequired,
  canEdit: T.bool.isRequired,
  edit: T.func.isRequired,
  editable: T.bool.isRequired

}

const AudioReactPlayerResource = connect(
  state => ({
    resource: state.resourceNode,
    url: state.url,
    canEdit: resourceSelect.editable(state),
    canDownload: true,
    editable: resourceSelect.editable(state)
  }),
  dispatch => ({
    edit: () => dispatch(actions.editPlayer())
  })
)(Resources)

export {AudioReactPlayerResource}
