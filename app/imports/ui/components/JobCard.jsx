import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow } from 'date-fns';

class JobCard extends React.Component {
  render() {
    const { job, openModal, openHireModal } = this.props;

    let status = <p style={{ color: 'red' }}>CLOSED</p>;
    let cardColor = 'red';
    let disabled = true;

    if (job.open === 1) {
      status = <p style={{ color: 'blue' }}>OPEN</p>;
      cardColor = 'green';
    }
    if (job.open === 0) {
      status = <p style={{ color: 'orange' }}>IN PROGRESS</p>;
      cardColor = 'orange';
    }
    if (job.open === 2) {
      status = <p style={{ color: 'green' }}>COMPLETED<Icon name='checkmark'/></p>;
      cardColor = 'green';
      disabled = false;
    }
    const feedBackButton = <Button disabled={ disabled } color='blue'>
      <Icon name='announcement'/> Submit Feedback
    </Button>;

    const hireButton = <div>
      <div onClick={openHireModal} color='green'
           className="ui button" data-tooltip="5 Applied" data-position="right center">
        Hire Helper
      </div>
    </div>;

    return (
      <Card onClick={() => openModal(job._id)} color={cardColor}>
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
            job.skills.map((skill, index) =>
              <Label tag size='tiny' key={index} color='blue'>{skill.name}</Label>)
        }
        </Card.Content>
        <Card.Content extra>
          {
            job.open === -1 &&
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

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  openModal: PropTypes.func,
  openHireModal: PropTypes.func,
};

export default JobCard;
