import React from 'react';
import { Card, Image, Button, Label, Dropdown, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { Jobs } from '../../api/jobs/jobs';

export default class EmployeeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJobID: '',
    };
    this.handleHireHelper = this.handleHireHelper.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleHireHelper() {
    const { job, employee, handleSuccessHire } = this.props;
    Jobs.update(
      {
        _id: job._id,
      },
      {
        $set: { employeeId: employee.username, open: 0 },
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          handleSuccessHire(employee, job);
        }
      },
    );
  }

  handleChange(event, data) {
    console.log(data.value);
    this.setState({
      selectedJobID: data.value,
    });
  }

  render() {
    const { employee, cardType, skills, ratings, jobs, inviteHelperCallback } = this.props;
    const { selectedJobID } = this.state;
    const skillObjects = employee.profile.skills.map((skillId) => skills.find((skill) => skill.key === skillId));
    const skillNames = skillObjects.map((skill) => skill.text);
    const ratingValues = ratings.map((rating) => rating.rating);
    const ratingSum = ratingValues.reduce((acc, value) => acc + value, 0);
    const aveRating = ratingSum / ratings.length;
    let jobInviteSelections;
    if (cardType === 'feedback') {
      jobInviteSelections = jobs.filter((job) => job.open === 1).map(function (job) {
        return { key: job._id, text: job.title, value: job._id };
      });
    }
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={employee.profile.imageURL} />
          <Card.Header>
            {employee.profile.firstName} {employee.profile.lastName}
          </Card.Header>
          <Card.Meta>
            <div>
              Ave. Rating:
              <StarRating rating={aveRating}/>
            </div>
          </Card.Meta>
          <Card.Description>
            Skills:
            {skillNames.map((skill, index) => <Label size='mini' tag color='green' key={index} content={skill}/>)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {
            cardType === 'feedback' &&
            <Grid container rows={2}>
              <Grid.Row>
              <Dropdown placeholder='Invite to a Job' selection
                        options={jobInviteSelections}
                        onChange={this.handleChange}></Dropdown>
              </Grid.Row>
              <Grid.Row>
              <div className='ui one buttons'>
                <Button basic color='green'
                        onClick={() => inviteHelperCallback(selectedJobID, employee)}>Invite To a Job</Button>
              </div>
              </Grid.Row>
            </Grid>
          }
          {
            cardType === 'hire' &&
            <div className='ui one buttons'>
              <Button basic color='green' onClick={this.handleHireHelper}>Hire</Button>
            </div>
          }
        </Card.Content>
      </Card>
    );
  }
}

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  cardType: PropTypes.string,
  job: PropTypes.object,
  handleSuccessHire: PropTypes.func,
  skills: PropTypes.array,
  ratings: PropTypes.array,
  inviteHelperCallback: PropTypes.func,
  jobs: PropTypes.array,
};
