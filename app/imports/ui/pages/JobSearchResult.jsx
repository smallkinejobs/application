import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { _ } from 'lodash';
import { Grid, Header, Card, Input, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import JobSearchCard from '../components/JobSearchCard';
import { Jobs } from '../../api/jobs/jobs.js';
import { JobApplicants } from '../../api/jobApplicants/jobApplicants';
import { Skills } from '../../api/skills/skills.js';
import JobDetailModal from '../components/JobDetailModal';

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
    this.filterJobResults = this.filterJobResults.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs.length !== 0 && this.props.jobs.length === 0) {
      const jobs = nextProps.jobs;
      const filteredJobs = jobs.filter((job) =>
          job.title.toLowerCase().includes(this.state.jobSearchText.toLowerCase()));
      this.setState({
        jobs: filteredJobs,
      });
    }
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = qs.parse(location.search);
    this.setState({
      jobSearchText: queryParams.title.toLowerCase(),
    });
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
    const jobs = this.props.jobs.filter((job) => job.title.toLowerCase().includes(data.value.toLowerCase()));
    this.setState({
      jobSearchText: data.value.toLowerCase(),
      jobs,
      loading: false,
    });
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
          <JobDetailModal selectedJob={selectedJob} modalOpen={modalOpen} jobApplicants={this.props.jobApplicants}
                          skills={this.props.skills} closeModal={this.closeModal}
                          clearSelectedJob={this.clearSelectedJob} />
            <Loader active={loading} content='Retrieving Jobs...' />
            <Card.Group itemsPerRow={4}>
              {
                jobs.length > 0 &&
                jobs.map((job) => <JobSearchCard key={job._id} jobApplicants={this.props.jobApplicants}
                                                skills={this.props.skills} job={job} openModal={this.openModal}/>)
              }
              {
                jobs.length === 0 &&
                <h2>No Jobs Found</h2>
              }
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
  skills: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  jobApplicants: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const SearchedSubscription = Meteor.subscribe('SearchedJobs');
  const skillSubscription = Meteor.subscribe('SkillsString');
  const ApplicantsSubscription = Meteor.subscribe('JobApplicants');
  return {
    ready: SearchedSubscription.ready() && skillSubscription.ready() && ApplicantsSubscription.ready(),
    jobs: Jobs.find({}).fetch(),
    skills: Skills.find({}).fetch(),
    jobApplicants: JobApplicants.find({}).fetch(),
  };
})(JobSearchResult);
