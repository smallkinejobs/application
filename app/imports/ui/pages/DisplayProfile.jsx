import React from 'react';
import { Grid, Header, Image, Card, Container, Modal, Button, Label, Loader } from 'semantic-ui-react';
import Skills from '/imports/ui/components/Skills';
import JobCard from '/imports/ui/components/EmployeeJobCard';
import { subDays, distanceInWordsToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
/** Renders the Profile Page of the Current User. Includes skills and recommended jobs for
 * prospective employees */
class DisplayProfile extends React.Component {

  jobs = [
    {
      _id: 1,
      title: 'Job 1',
      description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
      location: 'Campus Center',
      pay: 12.44,
      postDate: subDays(new Date(), 3),
      skills: [
        { _id: 1, name: 'technology' },
        { _id: 2, name: 'IT' },
        { _id: 3, name: 'programming' },
      ],
    },
    {
      _id: 2,
      title: 'Job 11',
      description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
      location: 'Food Court',
      pay: 11.22,
      postDate: subDays(new Date(), 1),
      skills: [
        { _id: 1, name: 'MS Word' },
        { _id: 2, name: 'IT' },
        { _id: 3, name: 'Typing' },
      ],
    },
    {
      _id: 3,
      title: 'Job 123',
      description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      location: 'Library',
      pay: 10.11,
      postDate: subDays(new Date(), 10),
      skills: [
        { _id: 1, name: 'AWS' },
        { _id: 2, name: 'Unix' },
        { _id: 3, name: 'C/C++' },
      ],
    },
    {
      _id: 4,
      title: 'Job 12',
      description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      location: 'Landscaping',
      pay: 12.22,
      postDate: subDays(new Date(), 3),
      skills: [
        { _id: 2, name: 'React' },
        { _id: 3, name: 'UI Design' },
      ],
    },
    {
      _id: 5,
      title: 'Job 135',
      description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      location: 'Athletic Center',
      pay: 10.77,
      postDate: subDays(new Date(), 22),
      skills: [
        { _id: 3, name: 'Project Management' },
      ],
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      jobs: [],
      modalOpen: false,
      selectedJob: {
        skills: [],
      },
    };
    this.matchJobs = this.matchJobs.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clearSelectedJob = this.clearSelectedJob.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user !== undefined && this.props.user === undefined) {
      this.setState({
        jobs: this.matchJobs(newProps.user),
      });
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
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

  matchJobs(user) {
    const userSkillTitles = user.profile.skills.map((skill) => skill.name);
    const filteredJobs = this.jobs.filter(function (job) {
      const jobSkillTitles = job.skills.map((skill) => skill.name);
      return _.intersection(jobSkillTitles, userSkillTitles).length > 0; //eslint-disable-line
    });
    return filteredJobs;
  }

  /** Render the page */
  render() {
    return (this.props.user !== undefined) ? this.renderPage() : <Loader>Loading user profile</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { loading, jobs, modalOpen, selectedJob } = this.state; //eslint-disable-line
    const profile = this.props.user.profile;
    return (
        <Container>
          <Modal
              open={modalOpen}
              onClose={this.clearSelectedJob}>
            <Modal.Header>
              Apply to this job : <i>Posted {distanceInWordsToNow(selectedJob.postDate)} ago</i>
            </Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='/images/uh_logo.png'/>
              <Modal.Description>
                <Header>{selectedJob.title}</Header>
                <p>{selectedJob.description}</p>
                <p>Contact For More Info At {'some contact info here'}</p>
                <strong>Locaton:</strong> {selectedJob.location} <br/>
                <strong>Pay:</strong> ${selectedJob.pay} <br/>
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
          <Grid container divided='vertically' rows={3}>
            <Grid.Row columns={2}>
              <Grid.Column floated='left'>
                <Image ui size='medium' src={profile.imageURL}/>
                <br/>
                <Button onClick={this.handleEditResume}>Edit Resume</Button>
              </Grid.Column>
              <Grid.Column floated='right'>
                <Header as='h1'>
                  {'Name: '} {profile.firstName} {profile.lastName}
                </Header>
                <Header as='h2'>
                  Address: {profile.address}
                </Header>
                <Header as='h2'>
                  Phone: {profile.phone}
                </Header>
                <Header as='h2'>
                  Email: {this.props.user.emails[0].address}
                </Header>
              </Grid.Column>
            </Grid.Row>
            {
              (profile.skills.length !== 0) &&
              <Grid.Row>
                <Skills skills={profile.skills}/>
              </Grid.Row>
            }
            {
              (profile.skills.length !== 0) &&
              <Grid.Row>
                <Header as='h1'>Recommended Jobs</Header>
                <Container>
                  <Card.Group itemsPerRow={3}>
                    {this.state.jobs.map((job) => <JobCard key={job._id} openModal={this.openModal} job={job}/>)}
                  </Card.Group>
                </Container>
              </Grid.Row>
            }
          </Grid>
        </Container>
    );
  }
}

DisplayProfile.propTypes = {
  history: PropTypes.any,
  user: PropTypes.object,
};

export default withTracker(() => {
  const user = Meteor.users.findOne({ _id: Meteor.userId() });
  return {
    user: user,
  };
})(DisplayProfile);

