import React from 'react';
import { Container, Grid, Divider, Button, Message, Card, Loader, Modal, Form, Label, Input } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JobCard from './JobCard';
import EmployeeCard from './EmployeeCard';
import { Jobs } from '../../api/jobs/jobs';
import { Skills } from '../../api/skills/skills';
import { Categories } from '../../api/categories/categories';


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
];

class EmployerLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobModalOpen: false,
      skillSearchQuery: '',
      categorySearchQuery: '',
      formError: false,
      formSuccess: false,
      newJob: {
        title: '',
        description: '',
        location: '',
        pay: '',
        categoryId: null,
        skills: [],
      },
      feedbackModalOpen: false,
      selectedJob: {},
      userToRate: '',
      ratingValue: -1,
    };
    this.openJobModal = this.openJobModal.bind(this);
    this.closeJobModal = this.closeJobModal.bind(this);
    this.handleSkillSearchChange = this.handleSkillSearchChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleCategorySearchChange = this.handleCategorySearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.validateJob = this.validateJob.bind(this);
    this.submitJob = this.submitJob.bind(this);
    this.openFeedbackModal = this.openFeedbackModal.bind(this);
    this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs.length !== 0 &&
        nextProps.skills.length !== 0 &&
        nextProps.categories.length !== 0
    ) {
      const jobs = nextProps.jobs;
      const skillIds = nextProps.skills.map((skill) => skill.value);
      jobs.forEach((job) => {
        const jobSkills = _.intersection(job.skills, skillIds);
        const mappedSkills = []
        jobSkills.forEach((skill) => {
          const foundSkill = _.result(_.find(nextProps.skills, { value: skill }), 'text');
          mappedSkills.push({ name: foundSkill });
        });
        job.skills = mappedSkills;
      });
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
  };

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
    this.setState({ formError: false });
    const newJob = this.state.newJob;
    if (name === 'pay') {
      newJob[name] = parseFloat(value);
    } else {
      newJob[name] = value;
    }
    this.setState({
      newJob,
    });
  }

  submitJob() {
    this.validateJob();
    if (!this.state.formError) {
      Jobs.insert(this.state.newJob);
      this.setState({
        formSuccess: true,
        newJob: {
          title: '',
          description: '',
          location: '',
          pay: '',
          categoryId: null,
          skills: [],
        },
        jobModalOpen: false,
      });
      Bert.alert('Successfully Posted Job', 'success', 'growl-top-right');
      // console.log(this.state.newJob);
    }
  }

  validateJob() {
    const { newJob } = this.state;
    newJob.employerId = Meteor.userId();
    newJob.open = 1;
    newJob.postDate = new Date();
    _.forOwn(newJob, (value, key) => {
      if (value === null || value === '' || value === []) {
        this.setState({
          formError: true,
        });
      }
    });
  }

  openFeedbackModal(job) {
    const uname = Meteor.user().username;
    if (uname === job.employerId || uname === job.employeeId) {
      this.setState({
        feedbackModalOpen: true,
        selectedJob: job,
        userToRate: uname === job.employerId ? job.employeeId : job.employerId,
      });
    }
  }

  closeFeedbackModal() {
    this.setState({
      feedbackModalOpen: false,
      selectedJob: {},
      userToRate: '',
    });
  }

  handleRatingChange(e, { value }) {
    this.setState({ ratingValue: value });
  }

  renderPage() {
    const { skills, categories } = this.props;
    const {
      jobs, jobModalOpen, newJob, skillSearchQuery,
      formError, categorySearchQuery, feedbackModalOpen, userToRate, ratingValue } = this.state;
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
            onClose={this.closeFeedbackModal}>
          <Modal.Header>
            <Message style={{ fontSize: '1rem' }} hidden={!formError} error={formError}>
              <p>Please correct errors for job post.</p>
            </Message>
            Post a New Job
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input name='title' label='Job Title' value={newJob.title} onChange={this.handleFormChanges}/>
              <Form.TextArea name='description' label='Describe Your Job'
                             value={newJob.description} onChange={this.handleFormChanges}/>
              <Form.Input name='location' label='Location of Work' value={newJob.location}
                          onChange={this.handleFormChanges}/>
              <Form.Input labelPosition='left' type='number'
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
                  options={categories}
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
                  options={skills}
                  placeholder='Skills'
                  search
                  searchQuery={skillSearchQuery}
                  selection
                  value={newJob.skills} />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.submitJob}>
              Post
            </Button>
            <Button color='red' onClick={this.closeJobModal}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal
            open={feedbackModalOpen}
            onClose={this.clearSelectedJob}>
          <Modal.Header>
            <Message style={{ fontSize: '1rem' }} hidden={!formError} error={formError}>
              <p>Please correct errors for job post.</p>
            </Message>
            Rating User: {userToRate.username}
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group inline>
                <Label>Rating</Label>
                <Form.Radio label='0' value={0} checked={ratingValue === 0} onChange={this.handleRatingChange}></Form.Radio>
                <Form.Radio label='1' value={1} checked={ratingValue === 1} onChange={this.handleRatingChange}></Form.Radio>
                <Form.Radio label='2' value={2} checked={ratingValue === 2} onChange={this.handleRatingChange}></Form.Radio>
                <Form.Radio label='3' value={3} checked={ratingValue === 3} onChange={this.handleRatingChange}></Form.Radio>
                <Form.Radio label='4' value={4} checked={ratingValue === 4} onChange={this.handleRatingChange}></Form.Radio>
                <Form.Radio label='5' value={5} checked={ratingValue === 5} onChange={this.handleRatingChange}></Form.Radio>
              </Form.Group>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.submitJob}>
              Submit Rating
            </Button>
            <Button color='red' onClick={this.closeFeedbackModal}>
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
  skills: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const jobSubscription = Meteor.subscribe('UserJobs');
  const skillSubscription = Meteor.subscribe('SkillsString');
  const categorySubscription = Meteor.subscribe('CategoriesString');
  const ratingSubscription = Meteor.subscribe('UserRatings');
  return {
    ready: jobSubscription.ready() && skillSubscription.ready() && categorySubscription.ready(),
    jobs: Jobs.find({}).fetch(),
    skills: Skills.find({}).map((skill) => ({
      key: skill._id,
      text: skill.name,
      value: skill._id,
    })),
    // db.getCollection('Jobs').aggregate([ { $unwind: "$skills" }, { $lookup: { from: "Skills", localField: "skills._id", foreignField: "_id", as: "jobSkills" } } ]).pretty()
    categories: Categories.find({}).map((cat) => ({
      key: cat._id,
      text: cat.title,
      value: cat._id,
    })),
  };
})(EmployerLanding);
