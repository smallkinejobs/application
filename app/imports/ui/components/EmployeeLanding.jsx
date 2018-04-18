import React from 'react';
import { Container, Grid, Divider, Card, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JobCard from './JobCard';
import { Jobs } from '../../api/jobs/jobs';


class EmployeeLanding extends React.Component {
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

  componentWillMount() {
    this.setState({
      jobs: this.props.jobs,
    });
  }

  renderPage() {
    const { jobs } = this.state;
    return (
      <div style={{ backgroundColor: '#009688' }}>
        <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <h1>Jobs Applied For</h1>
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

          <h1>Other Recommended Jobs</h1>
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
        </Container>
      </div>
    );
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Retrieving Jobs</Loader>;
  }
}

EmployeeLanding.propTypes = {
  jobs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('UserJobs');
  return {
    ready: subscription.ready(),
    jobs: Jobs.find({}).fetch(),
  };
})(EmployeeLanding);
