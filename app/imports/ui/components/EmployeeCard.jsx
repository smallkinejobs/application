import React from 'react';
import { Card, Image, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { Jobs } from '../../api/jobs/jobs';

export default class EmployeeCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleHireHelper = this.handleHireHelper.bind(this);
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

  render() {
    const { employee, cardType, skills, ratings } = this.props;
    const skillObjects = employee.profile.skills.map((skillId) => skills.find((skill) => skill.key === skillId));
    const skillNames = skillObjects.map((skill) => skill.text);
    const ratingValues = ratings.map((rating) => rating.rating);
    const ratingSum = ratingValues.reduce((acc, value) => acc + value, 0);
    const aveRating = ratingSum / ratings.length;
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
            <div className='ui one buttons'>
              <Button basic color='green'>Invite To a Job</Button>
            </div>
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
};
