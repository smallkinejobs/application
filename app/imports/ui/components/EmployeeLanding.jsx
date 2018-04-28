import React from 'react';
import { Container, Grid, Divider, Card, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JobSearchCard from './JobSearchCard';
import { Jobs } from '../../api/jobs/jobs';
import EmployeeJobCard from './EmployeeJobCard';
import { Skills } from '../../api/skills/skills';


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
    const { skills } = this.props;
    return (
      <div style={{ backgroundColor: '#009688' }}>
        <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <h1>Jobs Applied For</h1>
          <Divider/>
          <Grid>
            <Grid.Row>
              <Card.Group>
                {
                  jobs.map((job) => <EmployeeJobCard key={job._id} job={job} skills={skills} />)
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
                  jobs.map((job) => <JobSearchCard key={job._id} job={job} skills={skills} />)
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
  skills: PropTypes.array,
};

export default withTracker(() => {
  const userJobSubscription = Meteor.subscribe('UserJobs');
  const skillSubscription = Meteor.subscribe('SkillsString');
  return {
    ready: userJobSubscription.ready() && skillSubscription.ready(),
    skills: Skills.find({}).map((skill) => ({
      key: skill._id,
      text: skill.name,
      value: skill._id,
    })),
    jobs: Jobs.find({}).fetch(),
  };
})(EmployeeLanding);
