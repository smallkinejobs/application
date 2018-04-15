import React from 'react';
import { distanceInWordsToNow, subDays } from 'date-fns';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { Grid, Header, Card, Modal, Image, Button, Label, Input, Loader } from 'semantic-ui-react';
import JobCard from '../components/JobCard';

/** Renders the Page for job search results. */
class JobSearchResult extends React.Component {


  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      loading: false,
      jobSearchText: '',
      jobs: this.jobs,
      modalOpen: false,
      selectedJob: {
        skills: [],
      },
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clearSelectedJob = this.clearSelectedJob.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = qs.parse(location.search);
    const jobs = this.jobs.filter((job) => job.title.includes(queryParams.title));
    this.setState({
      jobs,
      jobSearchText: queryParams.title,
    });
    this.filterJobResults = this.filterJobResults.bind(this);
  }

  openModal(id) {
    this.setState({
      modalOpen: true,
      selectedJob: this.jobs.find((job) => job._id === id),
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
    const jobs = this.jobs.filter((job) => job.title.includes(data.value));
    setTimeout(() => {
      this.setState({
        jobSearchText: data.value,
        jobs,
        loading: false,
      });
    }, 100);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const { jobs, modalOpen, selectedJob, jobSearchText, loading } = this.state;
    return (
      <div>
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
};

export default JobSearchResult;
