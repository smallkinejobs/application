import React from 'react';
import { Container, Grid, Divider, Button, Card, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JobCard from './JobCard';
import EmployeeCard from './EmployeeCard';
import { Jobs } from '../../api/jobs/jobs';


const pastHelpers = [
  {
    _id: 1,
    firstName: 'Steve',
    lastName: 'Sanders',
    aveRating: 3,
    skills: ['Handy Man', 'Landscaping'],
    profileImg: '/images/landingPage/student1.jpg',
  },
  {
    _id: 1,
    firstName: 'Julie',
    lastName: 'Sanders',
    aveRating: 4,
    skills: ['Transporting'],
    profileImg: '/images/landingPage/student3.jpeg',
  },
]

class EmployerLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs.length !== 0 && this.props.jobs.length === 0) {
      const jobs = nextProps.jobs;
      this.setState({
        jobs,
      });
    }
  }

  componentDidMount() {
    this.setState({
      jobs: this.props.jobs,
    });
  }

  renderPage() {
    const { jobs } = this.state;
    return (
      <div style={{ backgroundColor: '#71b1e0' }}>
        <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <Grid columns={2}>
            <Grid.Column>
              <h1>Your Jobs</h1>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button primary >Create New Job</Button>
            </Grid.Column>
          </Grid>
          <Divider/>
          <Grid>
            <Grid.Row>
              <Card.Group>
                {
                  jobs.map((job) => <JobCard key={job._id} job={job}/>)
                }
              </Card.Group>
            </Grid.Row>
          </Grid>

          <h1>Your Past Helpers</h1>
          <Divider/>
          <Grid>
            <Grid.Row>
              <Card.Group>
                {
                  pastHelpers.map((helper, index) => <EmployeeCard key={index} employee={helper}/>)
                }
              </Card.Group>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Retrieving Jobs</Loader>;
  }
}

EmployerLanding.propTypes = {
  jobs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('UserJobs');
  return {
    ready: subscription.ready(),
    jobs: Jobs.find({}).fetch(),
  };
})(EmployerLanding);
