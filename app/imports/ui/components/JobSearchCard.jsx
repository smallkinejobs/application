import React from 'react';
import { Card, Icon, Label, Image } from 'semantic-ui-react';
import { _ } from 'lodash';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { distanceInWordsToNow } from 'date-fns';

class JobSearchCard extends React.Component {
  render() {
    const { job, skills, openModal, jobApplicants } = this.props;
    job.skillNames = [];
    job.skills.forEach((skill) => {
      const foundSkill = _.find(skills, { _id: skill });
      if (foundSkill) {
        job.skillNames.push(foundSkill.name);
      }
    });
    let applied = false;
    const foundJob = _.find(jobApplicants, { jobId: job._id });
    if (_.includes(foundJob.applicantIds, Meteor.userId())) {
      applied = true;
    }

    let status = <p style={{ color: 'red' }}>CLOSED</p>;
    let cardColor = 'red';

    if (job.open === 1) {
      status = <p style={{ color: 'blue' }}>OPEN</p>;
      cardColor = 'blue';
    }
    if (job.open === 0) {
      status = <p style={{ color: 'orange' }}>IN PROGRESS</p>;
      cardColor = 'orange';
    }
    if (job.open === 2) {
      status = <p style={{ color: 'green' }}>COMPLETED<Icon name='checkmark'/></p>;
      cardColor = 'green';
    }

    return (
      !applied &&
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
            job.skillNames.map((skill, index) =>
              <Label color='blue' content={skill} key={index}/>)
        }
        </Card.Content>
      </Card>
    );
  }
}

JobSearchCard.propTypes = {
  job: PropTypes.object.isRequired,
  skills: PropTypes.array,
  openModal: PropTypes.func,
  jobApplicants: PropTypes.array,
};

export default JobSearchCard;
