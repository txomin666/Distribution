import React from 'react'
import {connect} from 'react-redux'
//import {actions} from '#/plugin/audio-react/resources/audio/actions'
import {RoutedPageContent} from '#/main/core/layout/router'
import {ResourcePageContainer} from '#/main/core/resource/containers/page'
import {trans} from '#/main/core/translation'
import {url} from '#/main/core/api/router'
import {Player} from '#/plugin/audio-react/resources/audio/player/player'
import {PropTypes as T} from 'prop-types'

const  Resources = props =>
  <ResourcePageContainer
    customActions={[
      {
        type: 'callback',
        icon: 'fa fa-fw fa-edit',
        label: trans('edit'),
        displayed: true,
        callback: () => {}
      },
      {
        type: 'modal',
        icon: 'fa fa-fw fa-list',
        label: trans('subtitles'),
        displayed: true,
        modal: []
      },{
        type: 'download',
        icon: 'fa fa-fw fa-download',
        label: trans('download'),
        displayed: true,
        file: {
          url: url(['claro_resource_download'], {ids: []})
        }
      }, {
        type: 'callback',
        icon: 'fa fa-fw fa-clipboard',
        label: trans('copy_permalink_to_clipboard'),
        callback: () => {}
      }
    ]}
  >
    <RoutedPageContent
      headerSpacer={true}
      redirect={[
        {from: '/', exact: true, to: '/play'}
      ]}
      routes={[
        {
          path: '/play',
          component: Player
        }
      ]}
    />
  </ResourcePageContainer>
   
Resources.propTypes = {
  resource: T.shape({
    id: T.string.isRequired,
    autoId: T.number.isRequired
  }).isRequired,
  url: T.string.isRequired
}

const AudioReactPlayerResource = connect(
  state => ({
    resource: state.resourceNode,
    url: state.url,
    canEdit:true,
    canDownload:true
  })
)(Resources)

export {
  AudioReactPlayerResource
}
