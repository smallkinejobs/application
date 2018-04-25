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
        $set: { employeeId: employee._id, open: 0 },
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
    const { employee, cardType } = this.props;
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={employee.profileImg} />
          <Card.Header>
            {employee.firstName} {employee.lastName}
          </Card.Header>
          <Card.Meta>
            <div>
              Ave. Rating:
              <StarRating rating={employee.aveRating}/>
            </div>
          </Card.Meta>
          <Card.Description>
            Skills:
            {employee.skills.map((skill, index) => <Label size='mini' tag color='green' key={index} content={skill}/>)}
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
};
