import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'
import cloneDeep from 'lodash/cloneDeep'

import {trans} from '#/main/core/translation'
import {url} from '#/main/app/api'

import {TooltipButton} from '#/main/core/layout/button/components/tooltip-button'

const UsersList = props =>
  <ul className="dropdown-menu">
    {props.users.map((user) =>
      <li key={user.id}>
        <a
          role="button"
          href=""
          onClick={(e) => {
            props.select(user)
            e.preventDefault()
          }}
        >
          {user.firstName} {user.lastName}
        </a>
      </li>
    )}
  </ul>

UsersList.propTypes = {
  users: T.arrayOf(T.shape({
    id: T.string.isRequired,
    firstName: T.string.isRequired,
    lastName: T.string.isRequired
  })).isRequired,
  select: T.func.isRequired
}

const SelectedUser = props =>
  <li className="selected-user">
    {props.user.name ? props.user.name : props.user.firstName + ' ' + props.user.lastName}

    <TooltipButton
      id={`remove-${props.user.id}`}
      title={trans('delete')}
      position="left"
      onClick={props.remove}
      className="btn-link btn-link-danger"
    >
      <span className="fa fa-fw fa-trash-o" />
      <span className="sr-only">{trans('delete')}</span>
    </TooltipButton>
  </li>

SelectedUser.propTypes = {
  user: T.shape({
    id: T.string.isRequired,
    name: T.string,
    firstName: T.string,
    lastName: T.string
  }).isRequired,
  remove: T.func.isRequired
}

export class UserTypeahead extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      searchString: '',
      results: [],
      selected: cloneDeep(props.selected)
    }
  }

  search(search) {
    this.setState({searchString: search})

    if (search && search.length > 2) {
      this.setState({isFetching: true})

      fetch(url(['apiv2_user_list', {limit: 20, page: 0}]) + '&filters[name]=' + search, {
        method: 'GET' ,
        credentials: 'include'
      })
        .then(response => response.json())
        .then(results => this.setState({results: results.data, isFetching: false}))
    }
  }

  selectUser(user) {
    this.props.handleSelect(user)

    this.setState({
      searchString: '',
      results: [],
      selected: this.props.unique ? [user] : this.state.selected.concat([user])
    })
  }

  removeUser(user) {
    this.props.handleRemove(user)

    const selected = this.state.selected
    selected.splice(selected.findIndex(toRemove => toRemove.id === user.id), 1)
    this.setState({selected})
  }

  render() {
    return (
      <div className="user-typeahead">
        <div className={classes('dropdown', 0 < this.state.results.length ? 'open' : null)}>
          <div className="input-group">
            <span className="input-group-addon">
              <span
                className={classes('fa fa-fw', {
                  'fa-user': !this.state.isFetching,
                  'fa-circle-o-notch fa-spin': this.state.isFetching
                })}
              />
            </span>

            <input
              id="search-users"
              type="text"
              className="form-control"
              value={this.state.searchString}
              onChange={e => this.search(e.target.value)}
            />
          </div>

          <UsersList
            users={this.state.results}
            select={this.selectUser.bind(this)}
          />
        </div>

        <ul className="selected-users">
          {this.state.selected.map(user =>
            <SelectedUser key={user.id} user={user} remove={() => this.removeUser(user)} />
          )}
        </ul>
      </div>
    )
  }
}

UserTypeahead.propTypes = {
  handleSelect: T.func.isRequired,
  handleRemove: T.func,
  selected: T.array.isRequired,
  unique: T.bool
}

UserTypeahead.defaultProps = {
  selected: [],
  unique: false
}
