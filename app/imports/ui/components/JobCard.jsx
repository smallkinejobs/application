import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow } from 'date-fns';

class JobCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleJobClick = this.handleJobClick.bind(this);
  }
  handleJobClick() {
    console.log('hello');
  }
  render() {
    return (
      <Card onClick={this.handleJobClick}>
        <Card.Content>
          <Card.Header>
            {this.props.job.title}
          </Card.Header>
          <Card.Meta>
            {this.props.job.location}
          </Card.Meta>
          <Card.Meta>
            Pay: ${this.props.job.pay}
          </Card.Meta>
          <Card.Meta>
            <Icon name='calendar' />
            Posted: {distanceInWordsToNow(this.props.job.postDate)} ago
          </Card.Meta>
        </Card.Content>
        <Card.Content
          description={this.props.job.description}
        />
        <Card.Content extra>
          Skills: {
            this.props.job.skills.map((skill, index) =>
              <Label size='tiny' key={index} color='green'>{skill.name}</Label>)
        }
        </Card.Content>
      </Card>
    );
  }
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobCard;
