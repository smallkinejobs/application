import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Input, Button } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';


const titleStyle = {
  fontFamily: 'Pacifico, cursive',
};

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  handleSearch() {
    const { history } = this.props;
    const { searchText } = this.state;
    if (searchText !== '') {
      history.push(`job-search-results?title=${this.state.searchText}`);
    }
  }

  handleSearchText(e, data) {
    const searchText = data.value;
    this.setState({
      searchText,
    });
  }

  render() {
    return (
      <Menu attached="top" borderless inverted color='blue'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header style={titleStyle} inverted as='h1'>Small Kine Jobs</Header>
        </Menu.Item>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {
            this.props.currentUser !== '' &&
            <NavJobSearch handleSearch={this.handleSearch} handleSearchText={this.handleSearchText}/>
          }
        </Menu.Item>
        <Menu.Item>
          {this.props.currentUser === '' ? (
              <Dropdown text="Login" pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                  <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                </Dropdown.Menu>
              </Dropdown>
          ) : (
              <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                </Dropdown.Menu>
              </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

class NavJobSearch extends React.Component {
  render() {
    const { handleSearchText, handleSearch } = this.props;
    return (
      <Input style={{ width: '400px' }}
             placeholder="Search job title" action
             onChange={(e, data) => handleSearchText(e, data)}>
        <input/>
        <Button type={'submit'} onClick={handleSearch}>
          Search
        </Button>
      </Input>
    );
  }
}

NavJobSearch.propTypes = {
  handleSearchText: PropTypes.func,
  handleSearch: PropTypes.func,
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  history: PropTypes.any,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
