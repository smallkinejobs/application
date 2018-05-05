import React from 'react';
import { Sidebar, Image, Icon, Button, Label, Container, Divider, Radio, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import StarRating from '../components/StarRating';
import BaseLanding from '../components/BaseLanding';
import EmployerLanding from '../components/EmployerLanding';
import EmployeeLanding from '../components/EmployeeLanding';
import NewJobModal from '../components/NewJobModal';
import { Jobs } from '../../api/jobs/jobs';
import { Skills } from '../../api/skills/skills';
import { Categories } from '../../api/categories/categories';
import { Ratings } from '../../api/ratings/ratings.js';
import { JobApplicants } from '../../api/jobApplicants/jobApplicants';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      employeeToggle: false,
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
    };
    this.openJobModal = this.openJobModal.bind(this);
    this.closeJobModal = this.closeJobModal.bind(this);
    this.clearNewJob = this.clearNewJob.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.validateJob = this.validateJob.bind(this);
    this.submitJob = this.submitJob.bind(this);
    this.handleSideBarToggle = this.handleSideBarToggle.bind(this);
    this.handleTwoRoleToggle = this.handleTwoRoleToggle.bind(this);
  }

  componentWillMount() {
    const employeeToggle = Roles.userIsInRole(Meteor.userId(), 'employee');
    this.setState({
      employeeToggle,
    });
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
      newJob.employerId = Meteor.user().username;
      Jobs.insert(this.state.newJob, (jobErr, id) => {
        if (jobErr) {
          this.setState({
            formError: true,
          });
        } else {
          JobApplicants.insert({ jobId: id, applicantIds: [] }, (JobApplicantErr) => {
            if (JobApplicantErr) {
              this.setState({
                formError: true,
              });
            } else {
              this.clearNewJob();
              this.setState({
                formSuccess: true,
                jobModalOpen: false,
              });
              Bert.alert('Successfully Posted Job', 'success', 'growl-top-right');
            }
          });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
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

  render() {
    return this.props.ready ? this.renderPage() : <Loader>Waiting for user Ratings</Loader>;
  }
  renderPage() {
    const { skills, categories } = this.props;
    const { newJob, formError, skillSearchQuery, categorySearchQuery, jobModalOpen } = this.state;
    const isEmployer = Roles.userIsInRole(Meteor.userId(), 'employer');
    const isEmployee = Roles.userIsInRole(Meteor.userId(), 'employee');
    const { visible, employeeToggle } = this.state;
    const moneyEarned = _.reduce(Jobs.find({ open: -1 }).fetch(), (sum, job) => sum + job.pay, 0);
    const jobsCompleted = Jobs.find({ open: -1 }).fetch().length;
    const ratingValues = this.props.ratings.map((ratingDocument) => ratingDocument.rating);
    const userRating = ratingValues.reduce(function (acc, rating) { return acc + rating; }, 0) / ratingValues.length;
    const userImage = this.props.currentUserImage === ''
        ? '/images/landingPage/student1.jpg' : this.props.currentUserImage; // eslint-disable-line
    return (
      <div>
        <Sidebar.Pushable style={{ minHeight: '1000px' }}>
          {
            Meteor.user() &&
            <Sidebar style={{ backgroundColor: '#d4d4d52e' }}
                     animation='push'
                     width='wide' visible={visible} icon='labeled' vertical='true' inverted='true'>
              <Container style={{ padding: '2rem' }}>
                <Image centered size='small' circular src={userImage} />
                <h2><Icon name='user circle outline' /> {this.props.currentUserName}</h2>
                <Label color='blue'>Employer</Label>
                <Label color='blue'>Helper</Label>
                <Divider/>
                <h2><Icon name='checkmark box' /> Average Rating: </h2> <StarRating rating={userRating}/>
                {
                  isEmployee &&
                  <div>
                    <Divider/>
                    <h2>Total Amount Earned</h2>
                    <h3><Icon name='money'/> ${moneyEarned}</h3>
                  </div>
                }
                <Divider/>
                <h2>Total Jobs Completed</h2>
                <h3><Icon name='suitcase'/> {jobsCompleted}</h3>
              </Container>
            </Sidebar>
          }
          <Sidebar.Pusher>
            {
              Meteor.user() &&
              <div style={{ padding: '1rem', backgroundColor: '#4caf50' }}>
                <Button icon onClick={this.handleSideBarToggle}>
                  <Icon name='bars' />
                </Button>
                &nbsp;&nbsp;
                {
                  isEmployee && isEmployer &&
                  <Radio label='Employer/Employee' toggle
                         onChange={this.handleTwoRoleToggle} checked={employeeToggle} />
                }
                &nbsp;&nbsp;
                {
                  isEmployer &&
                  <Button primary onClick={this.openJobModal}>Create New Job</Button>
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
                <div style={((employeeToggle === false) && (isEmployer)) || (isEmployer) ? {} : { display: 'none' }}>
                  <EmployerLanding skills={skills}/>
                </div>
                <div style={((employeeToggle === true) && (isEmployee)) || (isEmployee) ? {} : { display: 'none' }}>
                  <EmployeeLanding/>
                </div>
              </div>
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <NewJobModal newJob={newJob} formError={formError}
                     skillSearchQuery={skillSearchQuery}
                     skills={skills} categorySearchQuery={categorySearchQuery}
                     categories={categories} jobModalOpen={jobModalOpen}
                     closeJobModal={this.closeJobModal} submitJob={this.submitJob}
                     clearNewJob={this.clearNewJob} handleFormChanges={this.handleFormChanges}/>
      </div>
    );
  }
}

Landing.propTypes = {
  currentUserName: PropTypes.string,
  currentUserImage: PropTypes.string,
  ready: PropTypes.bool.isRequired,
  ratings: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  jobs: PropTypes.array,
};

export default withTracker(() => {
  const skillSubscription = Meteor.subscribe('SkillsString');
  const categorySubscription = Meteor.subscribe('CategoriesString');
  const ratingsSubscription = Meteor.subscribe('UserRatings');
  const userJobsSubscription = Meteor.subscribe('UserJobs');
  return {
    currentUserName: Meteor.user() ? Meteor.user().username : '',
    currentUserImage: '/images/defaultprofilepic.jpg',
    ready: ratingsSubscription.ready() && skillSubscription.ready() &&
      categorySubscription.ready() && userJobsSubscription.ready(),
    ratings: Ratings.find({}).fetch(),
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
    jobs: Jobs.find({}).fetch(),
  };
})(Landing);
