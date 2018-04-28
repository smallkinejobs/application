import React from 'react';
import { Container, Grid, Divider, Button, Card, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FeedbackModal from './FeedbackModal';
import EmployerJobCard from './EmployerJobCard';
import EmployeeCard from './EmployeeCard';
import NewJobModal from './NewJobModal';
import HireHelperModal from './HireHelperModal';
import { Jobs } from '../../api/jobs/jobs';
import { Skills } from '../../api/skills/skills';
import { Categories } from '../../api/categories/categories';
import { Ratings } from '../../api/ratings/ratings';


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
      skills: [],
      jobModalOpen: false,
      openedJob: null,
      hireModalOpen: false,
      skillSearchQuery: '',
      categorySearchQuery: '',
      formSuccess: false,
      formError: false,
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
    this.openHireModal = this.openHireModal.bind(this);
    this.closeHireModal = this.closeHireModal.bind(this);
    this.clearNewJob = this.clearNewJob.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.validateJob = this.validateJob.bind(this);
    this.submitJob = this.submitJob.bind(this);
    this.openFeedbackModal = this.openFeedbackModal.bind(this);
    this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSuccessEmployeeHire = this.handleSuccessEmployeeHire.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs.length !== 0 &&
        nextProps.skills.length !== 0 &&
        nextProps.categories.length !== 0
    ) {
      const jobs = nextProps.jobs;
      const skills = nextProps.skills;
      this.setState({
        jobs,
        skills,
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

  openHireModal = (job) => {
    this.setState({
      openedJob: job,
      hireModalOpen: true,
    });
  };

  closeHireModal() {
    this.setState({
      hireModalOpen: false,
    });
  }

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
  };

  submitJob() {
    const { newJob } = this.state;
    const valid = this.validateJob();
    if (valid) {
      newJob.postDate = new Date();
      newJob.open = 1;
      newJob.employerId = Meteor.userId();
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
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  handleSuccessEmployeeHire(employee, job) {
    this.closeHireModal();
    Bert.alert(`Successfully Hired ${employee.firstName} to job ${job.title}`, 'success', 'growl-top-right');
  }

  validateJob() {
    const { newJob } = this.state;
    let valid = true;
    _.forOwn(newJob, (value) => {
      if (value === null || value === '' || value === []) {
        valid = false;
      }
    });
    return valid;
  }

  clearNewJob() {
    this.setState({
      newJob: {
        title: '',
        description: '',
        location: '',
        pay: '',
        categoryId: null,
        skills: [],
      },
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
      ratingValue: -1,
    });
  }

  handleRatingChange(e, { value }) {
    this.setState({
      ratingValue: value,
    });
  }

  submitRating() {
    const { userToRate, ratingValue } = this.state;
    Ratings.insert({
      rating: ratingValue,
      user: userToRate,
    }, (err, result) => {
        if (result !== null && err === null) {
          console.log('Success!');
          this.closeFeedbackModal();
          Bert.alert(`Successfully Submitted review for  ${userToRate}`, 'success', 'growl-top-right');
        } else {
          console.log(err);
          Bert.alert('Failed to submit review', 'danger', 'growl-top-right');
          this.closeFeedbackModal();
        }
    });

  }

  renderPage() {
    const { skills, categories } = this.props;

    const {
      jobs, jobModalOpen, newJob, skillSearchQuery,
      formError, categorySearchQuery, feedbackModalOpen, userToRate, ratingValue,
      hireModalOpen, openedJob } = this.state;
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
                  jobs.map((job) => <EmployerJobCard key={job._id} job={job}
                      skills={skills}
                      openHireModal={() => this.openHireModal(job)}
                      feedBackModal={this.openFeedbackModal}/>)
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
                  pastHelpers.map((helper, index) => <EmployeeCard key={index} employee={helper} cardType='feedback'/>)
                }
              </Card.Group>
            </Grid.Row>
          </Grid>
        </Container>
        <FeedbackModal closeCallback={this.closeFeedbackModal} isOpen={feedbackModalOpen}
                       ratedUser={userToRate} ratingChangeCallback={this.handleRatingChange}
                       submitCallback={this.submitRating} ratingValue={ratingValue}/>
        <NewJobModal newJob={newJob} formError={formError}
                              skillSearchQuery={skillSearchQuery}
                              skills={skills} categorySearchQuery={categorySearchQuery}
                              categories={categories} jobModalOpen={jobModalOpen}
                              closeJobModal={this.closeJobModal} submitJob={this.submitJob}
                              clearNewJob={this.clearNewJob} handleFormChanges={this.handleFormChanges}/>
        <HireHelperModal closeHireModal={this.closeHireModal}
                         job={openedJob} hireModalOpen={hireModalOpen}
                          handleSuccessHire={this.handleSuccessEmployeeHire}/>
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
  return {
    ready: jobSubscription.ready() && skillSubscription.ready() && categorySubscription.ready(),
    jobs: Jobs.find({}).fetch(),
    skills: Skills.find({}).map((skill) => ({
      key: skill._id,
      text: skill.name,
      value: skill._id,
    })),
    categories: Categories.find({}).map((cat) => ({
      key: cat._id,
      text: cat.title,
      value: cat._id,
    })),
  };
})(EmployerLanding);
