import React from 'react';
import { Card, Image, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

export default class EmployeeCard extends React.Component {
  render() {
    const { employee } = this.props;
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
          <div className='ui one buttons'>
            <Button basic color='green'>Invite To a Job</Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
};
