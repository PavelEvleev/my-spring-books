import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import {List, ListItem} from 'material-ui/List'

import * as api from '../../services/API'


/*
 * View for listing books.
 */
export default class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      usersLoading: false,
      error: null
    }
  }

  /*
   * Load all books when component is created.
   */
  componentDidMount() {
    this.setState({ users: [], usersLoading: true, error: null })
    api.fetchUsers()
      .then((response) => {
        this.setState({ users: response.data, usersLoading: false })
      })
      .catch((error) => {
        this.setState({ users: [], usersLoading: false, error: error.toString() })            
      })
  }

  render() {
    // Show loading bar if HTTP request is not completed
    if (this.state.usersLoading) {
      return (<CircularProgress />)
    }

    // Show error if HTTP request failed
    if (this.state.error) {
      return (<div>{this.state.error}</div>)
    }

    return (
      <div style={{ margin: "0 25%" }}>
        <h2>Users</h2>
        <List>
        {this.state.users.map(
          (user, index) => 
              <ListItem key={index} primaryText={user.name}
                onClick={ ()=>this.props.history.push(`/user/${user.id}`)}
              />
          )
        }
    </List>
      </div>
    )
  }
}