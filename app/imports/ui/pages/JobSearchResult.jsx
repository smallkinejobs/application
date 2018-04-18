import React from 'react';
import { distanceInWordsToNow } from 'date-fns';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { Grid, Header, Card, Modal, Image, Button, Label, Input, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import JobCard from '../components/JobCard';
import { Jobs } from '../../api/jobs/jobs.js';

/** Renders the Page for job search results. */
class JobSearchResult extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      jobSearchText: '',
      jobs: [],
      modalOpen: false,
      selectedJob: {
        skills: [],
      },
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clearSelectedJob = this.clearSelectedJob.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs.length !== 0 && this.props.jobs.length === 0) {
      const jobs = nextProps.jobs;
      const filteredJobs = jobs.filter((job) => job.title.includes(this.state.jobSearchText));
      this.setState({
        jobs: filteredJobs,
      });
    }
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = qs.parse(location.search);
    this.setState({
      jobSearchText: queryParams.title,
    });
    this.filterJobResults = this.filterJobResults.bind(this);
  }

  openModal(id) {
    this.setState({
      modalOpen: true,
      selectedJob: this.state.jobs.find((job) => job._id === id),
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
    });
  }

  clearSelectedJob() {
    this.setState({
      selectedJob: {
        skills: [],
      },
    });
  }

  filterJobResults(e, data) {
    this.setState({
      loading: true,
    });
    const jobs = this.props.jobs.filter((job) => job.title.includes(data.value));
    setTimeout(() => {
      this.setState({
        jobSearchText: data.value,
        jobs,
        loading: false,
      });
    }, 100);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Retrieving Jobs</Loader>;
  }
  /** Render the job search results */
  renderPage() {
    const { jobs, modalOpen, selectedJob, jobSearchText, loading } = this.state;
    return (
      <div style={{ paddingTop: '3rem' }}>
        <Grid>
          <Grid.Row centered>
            <Input label='Job Search' value={jobSearchText} onChange={(e, data) => this.filterJobResults(e, data)} />
          </Grid.Row>
        </Grid>
        <Grid container>
          <Grid.Column>
          <Modal
            open={modalOpen}
            onClose={this.clearSelectedJob}>
            <Modal.Header>
              Apply to this job : <i>Posted {distanceInWordsToNow(selectedJob.postDate)} ago</i>
            </Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='/images/uh_logo.png' />
              <Modal.Description>
                <Header>{ selectedJob.title }</Header>
                <p>{ selectedJob.description }</p>
                <p>Contact For More Info At { 'some contact info here' }</p>
                <strong>Locaton:</strong> { selectedJob.location } <br/>
                <strong>Pay:</strong> ${ selectedJob.pay } <br/>
                <strong>Skills:</strong> {
                  selectedJob.skills.map((skill, index) =>
                    <Label size='tiny' key={index} color='green'>{skill.name}</Label>)
                }
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button primary>
                Apply
              </Button>
              <Button color='red' onClick={this.closeModal}>
                Close
              </Button>
            </Modal.Actions>
          </Modal>
            <Header as="h2">{jobs.length} jobs found</Header>
            <Loader active={loading} content='Retrieving Jobs...' />
            <Card.Group itemsPerRow={4}>
              {jobs.map((job) => <JobCard key={job._id} job={job} openModal={this.openModal}/>)}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

JobSearchResult.propTypes = {
  location: PropTypes.any,
  jobs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('SearchedJobs');
  return {
    ready: subscription.ready(),
    jobs: Jobs.find({}).fetch(),
  };
})(JobSearchResult);
