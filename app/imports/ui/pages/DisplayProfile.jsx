import React from 'react';
import { Grid, Header, Image, Card, Container, Modal, Button, Label } from 'semantic-ui-react';
import Skills from '/imports/ui/components/Skills';
import JobCard from '/imports/ui/components/JobCard';
import { subDays, distanceInWordsToNow } from 'date-fns';

/** Renders the Profile Page of the Current User. Includes skills and recommended jobs for
 * prospective employees */
class DisplayProfile extends React.Component {

  user = {
    firstName: 'John',
    lastName: 'Foo',
    businessName: 'FooProductions Ltd.',
    address: '1234 Sunnyville Ln. Anywhere USA',
    phone: '555-5555',
    email: 'john@foo.com',
    image: '/images/john.png',
    role: 'employee',
    skills: [{
      name: 'C/C++',
      _id: 1,
    },
      {
        name: 'IT',
        _id: 2,
      },
      {
        name: 'Data Analytics',
        _id: 3,
      },
      {
        name: 'Web Development',
        _id: 4,
      },
    ],
  };

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

  componentDidMount() {
    this.setState({
      loading: true,
      jobs: this.matchJobs(),
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

  matchJobs() {
    const userSkillTitles = this.user.skills.map((skill) => skill.name);
    const filteredJobs = this.jobs.filter(function (job) {
      const jobSkillTitles = job.skills.map((skill) => skill.name);
      return _.intersection(jobSkillTitles, userSkillTitles).length > 0; //eslint-disable-line
    });
    return filteredJobs;
  }

  /** Render the page */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { loading, jobs, modalOpen, selectedJob } = this.state;
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
                <Image ui size='medium' src={this.user.image}/>
              </Grid.Column>
              <Grid.Column floated='right'>
                {(this.user.role === 'employee') &&
                <Header as='h1'>
                  {'Name: '} {this.user.firstName} {this.user.lastName}
                </Header>
                }
                {(this.user.role === 'employer') &&
                <Header as='h1'>
                  {'Company Name: '} {this.user.businessName}
                </Header>
                }
                <Header as='h2'>
                  Address: {this.user.address}
                </Header>
                <Header as='h2'>
                  Phone: {this.user.phone}
                </Header>
                <Header as='h2'>
                  Email: {this.user.email}
                </Header>
              </Grid.Column>
            </Grid.Row>
            {
              (this.user.role === 'employee') &&
              <Grid.Row>
                <Skills skills={this.user.skills}/>
              </Grid.Row>
            }
            {
              (this.user.role === 'employee') &&
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

export default DisplayProfile;

