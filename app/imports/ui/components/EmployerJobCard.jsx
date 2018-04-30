import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { _ } from 'lodash';
import PropTypes from 'prop-types';
import { distanceInWordsToNow } from 'date-fns';

class EmployerJobCard extends React.Component {
  render() {
    const { job, openHireModal, feedBackModal, skills } = this.props;
    job.skillNames = [];
    job.skills.forEach((skill) => {
      const foundSkill = _.find(skills, { key: skill });
      if (foundSkill) {
        job.skillNames.push(foundSkill.text);
      }
    });
    job.skillNames = [];
    job.skills.forEach((skill) => {
      const foundSkill = _.find(skills, { key: skill });
      if (foundSkill) {
        job.skillNames.push(foundSkill.text);
      }
    });

    let status = <p style={{ color: 'blue' }}>OPEN</p>;
    let cardColor = 'blue';

    if (job.open === -1 && job.employerSubmitRating) {
      status = <p style={{ color: 'red' }}>CLOSED</p>;
      cardColor = 'red';
    }
    if (job.open === 0) {
      status = <p style={{ color: 'orange' }}>IN PROGRESS</p>;
      cardColor = 'orange';
    }
    if ((job.open === 2) || (job.open === -1 && !job.employerSubmitRating)) {
      status = <p style={{ color: 'green' }}>COMPLETED<Icon name='checkmark'/></p>;
      cardColor = 'green';
    }
    const feedBackButton = <Button onClick={feedBackModal} color='blue'>
      <Icon name='announcement'/> Submit Feedback
    </Button>;

    const hireButton = <Button onClick={openHireModal} color='blue'>
      <Icon name='users'/> Hire Helper
    </Button>;

    return (
        <Card color={cardColor}>
          <Card.Content>
            <Label content={status} ribbon />
            <Image src='/images/uh_logo.png' size='mini' floated='right'/>
            <br/>
            <br/>
            <Card.Header>
              {job.title}
            </Card.Header>
            <Card.Meta>
              {job.location}
            </Card.Meta>
            <Card.Meta>
              <Icon name='money' />
              Pay: ${job.pay}
            </Card.Meta>
            <Card.Meta>
              <Icon name='calendar' />
              Posted: {distanceInWordsToNow(job.postDate)} ago
            </Card.Meta>
          </Card.Content>
          <Card.Content
              description={job.description}
          />
          <Card.Content extra>
            Skills: {
            job.skillNames.map((skill, index) =>
                <Label tag size='mini' color='blue' content={skill} key={index}/>)
          }
          </Card.Content>
          <Card.Content extra>
            {
              (job.open === 2 ||
              (job.open === -1 && !job.employerSubmitRating)) &&
              feedBackButton
            }
            {
              job.open === 1 &&
              hireButton
            }
          </Card.Content>
        </Card>
    );
  }
}

EmployerJobCard.propTypes = {
  job: PropTypes.object.isRequired,
  skills: PropTypes.array,
  openHireModal: PropTypes.func,
  feedBackModal: PropTypes.func,
};

export default EmployerJobCard;
