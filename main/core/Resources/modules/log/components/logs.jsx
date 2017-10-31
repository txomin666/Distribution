import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import {select} from '#/main/core/log/selectors'

import {t} from '#/main/core/translation'

import {
  PageContainer as Page,
  PageHeader,
  PageContent,
  PageActions,
  PageAction
} from '#/main/core/layout/page/index'

import {DataListContainer as DataList} from '#/main/core/layout/list/containers/data-list.jsx'

class Logs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setState({enumActions: {}})
  }

  render() {
    return (
      <Page id="logs-display">
        <PageHeader title={t('logs_display')}>
          <PageActions>
            <PageAction
              id="log-download"
              title={t('import_csv')}
              icon="fa fa-download"
              action="#"
            />
          </PageActions>
        </PageHeader>

        <PageContent>
          <DataList
            name="logs"
            data={this.props.data}
            totalResults={this.props.totalResults}
            display={{available: ['table'], current: 'table'}}
            definition={[
              {
                name: 'subject',
                type: 'enum',
                label: t('subject'),
                displayed: false,
                filterable: true,
                options: {
                  enum: {
                    'yolo': 'lol',
                    'yala': 'lal'
                  }
                }
              },
              {
                name: 'search_action',
                type: 'enum',
                label: t('action'),
                displayed: false,
                filterable: true,
                options: {
                  enum: this.state ? this.state.enumActions: {}
                }
              },
              {
                name: 'date',
                type: 'string',
                label: t('date'),
                displayed: true,
                filterable: false
              },
              {
                name: 'action',
                type: 'string',
                label: t('action'),
                displayed: true,
                filterable: false
              },
              {
                name: 'doer.user.username',
                type: 'string',
                label: t('user'),
                displayed: true,
                filterable: true
              },
              {
                name: 'group',
                type: 'string',
                label: t('group'),
                displayed: false,
                filterable: true
              },
              {
                name: 'explanation',
                type: 'string',
                label: t('explanation'),
                displayed: true,
                filterable: false
              },
              {
                name: 'from',
                label: t('from'),
                type: 'date',
                filterable: true
              }, {
                name: 'to',
                label: t('to'),
                type: 'date',
                filterable: true
              }
            ]}
            card={() => ({})}
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
