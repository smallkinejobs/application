import React from 'react';
import { Container, Grid, Divider, Button, Card, Loader, Modal, Form, Label, Input } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JobCard from './JobCard';
import EmployeeCard from './EmployeeCard';
import { Jobs } from '../../api/jobs/jobs';

const testSkills = [
    { text: 'Java', value: '1' },
    { text: 'Handyman', value: '2' },
    { text: 'Landscaping', value: '3' },
    { text: 'Painter', value: '4' },
    ];

const testCategories = [
  { text: 'Painting', value: '1' },
  { text: 'Student help', value: '2' },
  { text: 'Programmer', value: '3' },
  { text: 'Tutor', value: '4' },
];

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
      jobModalOpen: false,
      skillSearchQuery: '',
      categorySearchQuery: '',
      newJob: {
        title: '',
        description: '',
        location: '',
        pay: '',
        categoryId: null,
        skills: [],
      },
    };
    this.openJobModal = this.openJobModal.bind(this);
    this.closeJobModal = this.closeJobModal.bind(this);
    this.handleSkillSearchChange = this.handleSkillSearchChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleCategorySearchChange = this.handleCategorySearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
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

  openJobModal() {
    this.setState({
      jobModalOpen: true,
    });
  }

  closeJobModal() {
    this.setState({
      jobModalOpen: false,
    });
  }

  handleSkillChange = (e, { value }) => {
    const newJob = this.state.newJob;
    newJob.skills = value;
    this.setState({
      skillSearchQuery: '',
      newJob,
    });
  }

  handleSkillSearchChange = (e, { searchQuery }) =>
    this.setState({
      skillSearchQuery: searchQuery,
    });

  handleCategoryChange = (e, { value }) => {
    const newJob = this.state.newJob;
    newJob.categoryId = value;
    this.setState({
      categorySearchQuery: '',
      newJob,
    });
  }

  handleCategorySearchChange = (e, { searchQuery }) =>
    this.setState({
      categorySearchQuery: searchQuery,
    });

  handleFormChanges = (e, { name, value }) => {
    const newJob = this.state.newJob;
    newJob[name] = value;
    this.setState({
      newJob,
    });
  }

  renderPage() {
    const { jobs, jobModalOpen, newJob, skillSearchQuery, categorySearchQuery } = this.state;
    return (
      <div style={{ backgroundColor: '#71b1e0' }}>
        <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <Grid columns={2}>
            <Grid.Column>
              <h1>Your Jobs</h1>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button primary onClick={this.openJobModal}>Create New Job</Button>
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
        <Modal
            open={jobModalOpen}
            onClose={this.clearSelectedJob}>
          <Modal.Header>
            Post a New Job
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input name='title' label='Job Title' value={newJob.title} onChange={this.handleFormChanges}/>
              <Form.TextArea name='description' label='Describe Your Job'
                             value={newJob.description} onChange={this.handleFormChanges}/>
              <Form.Input name='location' label='Location of Work' value={newJob.location}
                          onChange={this.handleFormChanges}/>
              <Form.Input labelPosition='left' type='text'
                          placeholder='Amount' label='Pay Offered'
                          name='pay' value={newJob.pay} onChange={this.handleFormChanges}>
                <Label basic>$</Label>
                <input />
              </Form.Input>
              <Form.Dropdown
                  label='Category'
                  name='categoryId'
                  onChange={this.handleCategoryChange}
                  onSearchChange={this.handleCategorySearchChange}
                  options={testCategories}
                  placeholder='Category'
                  search
                  searchQuery={categorySearchQuery}
                  selection
                  value={newJob.categoryId} />
              <Form.Dropdown
                  label='Skills Needed'
                  name='skills'
                  multiple
                  onChange={this.handleSkillChange}
                  onSearchChange={this.handleSkillSearchChange}
                  options={testSkills}
                  placeholder='Skills'
                  search
                  searchQuery={skillSearchQuery}
                  selection
                  value={newJob.skills} />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Post
            </Button>
            <Button color='red' onClick={this.closeJobModal}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
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
