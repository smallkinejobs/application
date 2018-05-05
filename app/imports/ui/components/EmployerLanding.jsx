import React from 'react';
import { Container, Grid, Divider, Card, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FeedbackModal from './FeedbackModal';
import EmployerJobCard from './EmployerJobCard';
import EmployeeCard from './EmployeeCard';
import HireHelperModal from './HireHelperModal';
import { Jobs } from '../../api/jobs/jobs';
import { JobApplicants } from '../../api/jobApplicants/jobApplicants';
import { Ratings } from '../../api/ratings/ratings';

class EmployerLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      openedJob: null,
      hireModalOpen: false,
      feedbackModalOpen: false,
      selectedJob: {},
      userToRate: '',
      ratingValue: -1,
    };
    this.openHireModal = this.openHireModal.bind(this);
    this.closeHireModal = this.closeHireModal.bind(this);
    this.openFeedbackModal = this.openFeedbackModal.bind(this);
    this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSuccessEmployeeHire = this.handleSuccessEmployeeHire.bind(this);
    this.handleInviteHelper = this.handleInviteHelper.bind(this);
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

  handleSuccessEmployeeHire(employee, job) {
    this.closeHireModal();
    Bert.alert(`Successfully Hired ${employee.firstName} to job ${job.title}`, 'success', 'growl-top-right');
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
    const { userToRate, ratingValue, selectedJob } = this.state;
    Ratings.insert({
      rating: ratingValue,
      user: userToRate,
    }, (err, result) => {
        if (result !== null && err === null) {
          Jobs.update(
              {
                _id: selectedJob._id,
              },
              {
                $set: { open: -1, employerSubmitRating: true },
              },
              (jobUpdateErr) => {
                if (err) {
                  console.log(jobUpdateErr);
                } else {
                  console.log('Success!');
                  this.closeFeedbackModal();
                  Bert.alert(`Successfully Submitted review for  ${userToRate}`, 'success', 'growl-top-right');
                }
              },
          );
        } else {
          console.log(err);
          Bert.alert('Failed to submit review', 'danger', 'growl-top-right');
          this.closeFeedbackModal();
        }
    });
  }

  handleInviteHelper(jobID, helper) {
    // updates on the client side need the _id of the document to be updated
    // jobId is not sufficient and results in an untrusted 403 error
    const applicantDoc = JobApplicants.findOne({ jobId: jobID });

    JobApplicants.update(
        {
          _id: applicantDoc._id,
        },
        {
          $addToSet: { applicantIds: helper.username },
        },
        (err, success) => {
          if (err === null && success !== null) {
            Bert.alert(`Successfully invited helper ${helper.username}`, 'success', 'growl-top-right');
          }
          else {
            Bert.alert('Failed to invite helper', 'danger', 'growl-top-right');
          }
        },
    );
    this.setState(this.state); // forces a re-render of the page to show the updated job card state
  }

  renderPage() {
    const { skills } = this.props;

    const {
      feedbackModalOpen, userToRate, ratingValue,
      hireModalOpen, openedJob } = this.state;
    const jobs = Jobs.find({ employerId: Meteor.user().username }).fetch();
    const pastHelperNames = jobs.filter((job) => job.open === 2).map((job) => job.employeeId);
    const pastHelpers = pastHelperNames.map((name) => Meteor.users.findOne({ username: name }));
    const filteredHelpers = _.uniqWith(pastHelpers, _.isEqual);
    return (
      <div style={{ backgroundColor: 'ghostwhite' }}>
        <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <Grid columns={2}>
            <Grid.Column>
              <h1>Your Jobs</h1>
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
                      feedBackModal={() => this.openFeedbackModal(job)}/>)
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
                  filteredHelpers.map((helper, index) =>
                      <EmployeeCard key={index} employee={helper}
                                    ratings={this.props.ratings.filter((rating) => rating.user === helper.username)}
                                    skills={skills} jobs={jobs}
                                    inviteHelperCallback={this.handleInviteHelper} cardType='feedback'/>)
                }
              </Card.Group>
            </Grid.Row>
          </Grid>
        </Container>
        <FeedbackModal closeCallback={this.closeFeedbackModal} isOpen={feedbackModalOpen}
                       ratedUser={userToRate} ratingChangeCallback={this.handleRatingChange}
                       submitCallback={this.submitRating} ratingValue={ratingValue}/>
        <HireHelperModal closeHireModal={this.closeHireModal} skills={skills}
                         job={openedJob} hireModalOpen={hireModalOpen} ratings={this.props.ratings}
                         handleSuccessHire={this.handleSuccessEmployeeHire}/>
      </div>
    );
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Retrieving Jobs</Loader>;
  }
}

EmployerLanding.propTypes = {
  skills: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  ratings: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const jobSubscription = Meteor.subscribe('UserJobs');
  const jobApplicantsSubscription = Meteor.subscribe('JobApplicants');
  const userProfileSubscription = Meteor.subscribe('UserProfiles');
  const ratingsSubscription = Meteor.subscribe('AllRatings');
  return {
    ready: jobApplicantsSubscription.ready() &&
    userProfileSubscription.ready() && ratingsSubscription.ready() && jobSubscription.ready(),
    ratings: Ratings.find({}).fetch(),
  };
})(EmployerLanding);
