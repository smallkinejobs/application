import React from 'react';
import { Sidebar, Image, Icon, Button, Label, Container, Divider, Radio, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import StarRating from '../components/StarRating';
import BaseLanding from '../components/BaseLanding';
import EmployerLanding from '../components/EmployerLanding';
import EmployeeLanding from '../components/EmployeeLanding';
import { Ratings } from '../../api/ratings/ratings.js';

const testUser = {
  roles: ['employer', 'employee'],
};

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      employeeToggle: false,
    };
    this.handleSideBarToggle = this.handleSideBarToggle.bind(this);
    this.handleTwoRoleToggle = this.handleTwoRoleToggle.bind(this);
  }

  handleSideBarToggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleTwoRoleToggle() {
    this.setState({
      employeeToggle: !this.state.employeeToggle,
    });
  }
  render() {
    return this.props.ready ? this.renderPage() : <Loader>Waiting for user Ratings</Loader>;
  }
  renderPage() {
    const { visible, employeeToggle } = this.state;
    const ratingValues = this.props.ratings.map((ratingDocument) => ratingDocument.rating);
    const userRating = ratingValues.reduce(function(acc, rating) { return acc + rating; }, 0) / ratingValues.length;
    return (
      <div>
        <Sidebar.Pushable>
          {
            Meteor.user() &&
            <Sidebar style={{ backgroundColor: '#d4d4d52e' }}
                     animation='slide out'
                     width='wide' visible={visible} icon='labeled' vertical='true' inverted='true'>
              <Container style={{ padding: '2rem' }}>
                <Image centered size='small' circular src={this.props.currentUserImage} />
                <Link to='profile'>Edit Profile</Link>
                <h2><Icon name='user circle outline' /> {this.props.currentUserName}</h2>
                <Label color='blue'>Employer</Label>
                <Label color='blue'>Helper</Label>
                <Divider/>
                <h2><Icon name='checkmark box' /> Average Rating: </h2> <StarRating rating={userRating}/>
                <Divider/>
                <h2>Total Amount Earned</h2>
                <h3><Icon name='money'/> $30.00</h3>
                <Divider/>
                <h2>Total Jobs Completed</h2>
                <h3><Icon name='suitcase'/> 4</h3>
              </Container>
            </Sidebar>
          }
          <Sidebar.Pusher>
            {
              Meteor.user() &&
              <div style={{ padding: '1rem', backgroundColor: '#4caf50b8' }}>
                <Button icon onClick={this.handleSideBarToggle}>
                  <Icon name='bars' />
                </Button>
                &nbsp;&nbsp;
                {
                  testUser.roles.includes('employer') && testUser.roles.includes('employee') &&
                  <Radio label='Employer/Employee' toggle
                         onChange={this.handleTwoRoleToggle} checked={employeeToggle} />
                }
              </div>
            }
            {
              (Meteor.user() == null) &&
              <BaseLanding {...this.props}/>
            }
            {
              (Meteor.user() != null) &&
              <div>
                <div style={(employeeToggle === true) ? { display: 'none' } : {}}>
                  <EmployerLanding/>
                </div>
                < div style={(employeeToggle === false) ? { display: 'none' } : {}}>
                <EmployeeLanding />
                </div>
              </div>
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Landing.propTypes = {
  currentUserName: PropTypes.string,
  currentUserImage: PropTypes.string,
  ready: PropTypes.bool.isRequired,
  ratings: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const ratingsSubscription = Meteor.subscribe('UserRatings');
  return {
    currentUserName: Meteor.user() ? Meteor.user().username : '',
    currentUserImage: Meteor.user() ? Meteor.user().profile.imageURL : '',
    ready: ratingsSubscription.ready(),
    ratings: Ratings.find({}).fetch(),
  };
})(Landing);
