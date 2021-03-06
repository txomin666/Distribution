import React from 'react'
import {connect} from 'react-redux'
import {ToolConfig} from '#/plugin/blog/resources/blog/editor/components/tool-config.jsx'
import {trans} from '#/main/core/translation'
import {PropTypes as T} from 'prop-types'
import differenceBy from 'lodash/differenceBy'
import {selectors} from '#/plugin/blog/resources/blog/store'

const ToolManagerComponent = props =>
  <div>
    <ul className="list-unstyled">
      {props.orderedPanels && props.orderedPanels.map((panel, index) =>(
        React.createElement(ToolConfig, {
          key: index,
          index: index,
          max: props.panels.length - 1,
          label: trans(panel.nameTemplate, {}, 'icap_blog'),
          templateName: panel.nameTemplate,
          visibility: panel.visibility,
          id: trans(panel.id, {}, 'icap_blog')
        })
      ))}
      {props.panelDiff && props.panelDiff.map((panel, index) =>(
        React.createElement(ToolConfig, {
          key: index + props.orderedPanelsSize,
          index: index + props.orderedPanelsSize,
          max: props.panels.length - 1,
          label: trans(panel.nameTemplate, {}, 'icap_blog'),
          templateName: panel.nameTemplate,
          visibility: false,
          id: trans(panel.id, {}, 'icap_blog')
        })
      ))}
    </ul>
  </div>

ToolManagerComponent.propTypes = {
  panels: T.array.isRequired,
  orderedPanels: T.array.isRequired,
  orderedPanelsSize: T.number.isRequired,
  panelDiff: T.array
}

const ToolManager = connect(
  state => ({
    orderedPanels: selectors.blog(state).data.options.data.widgetOrder,
    orderedPanelsSize: selectors.blog(state).data.options.data.widgetOrder.length,
    panels: selectors.blog(state).data.options.data.widgetList,
    panelDiff: differenceBy(selectors.blog(state).data.options.data.widgetList, selectors.blog(state).data.options.data.widgetOrder, 'id')
  })
)(ToolManagerComponent)

export {ToolManager}
