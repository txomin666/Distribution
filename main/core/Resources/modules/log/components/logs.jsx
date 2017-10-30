import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import {select} from '#/main/core/log/selectors'

import {t} from '#/main/core/translation'

import {
  PageContainer as Page,
  PageHeader,
  PageContent
} from '#/main/core/layout/page/index'

import {DataList} from '#/main/core/layout/list/components/data-list.jsx'

class Logs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Page id="logs-display">
        <PageHeader title={t('logs_display')} />

        <PageContent>
          <DataList
            name="Logs"
            data={this.props.data}
            totalResults={this.props.totalResults}
            definition={[
              {
                name: 'id',
                type: 'string',
                label: t('name'),
                displayed: true
              }
            ]}
            card={(row) => ({
              onClick: '#',
              poster: null,
              icon: 'fa fa-users',
              title: row.id,
              subtitle: row.id,
              contentText: '',
              flags: [],
              footer:
                <span>
                  footer
                </span>,
              footerLong:
                <span>
                  footerLong
                </span>
            })}
            actions={[]}
          />
        </PageContent>
      </Page>
    )
  }
}

Logs.propTypes = {
  data: T.arrayOf(T.object),
  totalResults: T.number.isRequired
}

function mapStateToProps(state) {
  return {
    data: select.data(state),
    totalResults: select.totalResults(state)
  }
}

const ConnectedLogs = connect(mapStateToProps)(Logs)

export {ConnectedLogs as Logs}
