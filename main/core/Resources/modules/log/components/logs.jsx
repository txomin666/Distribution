import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import {select} from '#/main/core/log/selectors'

import {t} from '#/main/core/translation'

import {
  PageContainer as Page,
  PageHeader,
  PageContent,
  PageActions
} from '#/main/core/layout/page/index'

import {DataList} from '#/main/core/layout/list/components/data-list.jsx'

class Logs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Page id="logs-display">
        <PageHeader title={t('logs_display')}>
          <PageActions></PageActions>
        </PageHeader>

        <PageContent>
          <DataList
            name="logs"
            data={this.props.data}
            totalResults={this.props.totalResults}
            definition={[
              {
                name: 'id',
                type: 'string',
                label: t('name'),
                displayed: true,
                filterable: false
              },
              {
                name: 'action',
                type: 'string',
                label: t('action'),
                displayed: true,
                searchable: true
              },
              {
                name: 'createdAfter',
                label: t('created_after'),
                type: 'date',
                displayable: false
              }, {
                name: 'createdBefore',
                label: t('created_before'),
                type: 'date',
                displayable: false
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
