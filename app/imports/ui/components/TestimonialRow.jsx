import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import StarRating from '../components/StarRating';

export default class TestimonialRow extends React.Component {
  render() {
    return (
          <Grid.Column width={5} floated='left'>
            <StarRating rating={this.props.testimonial.rating}/>
            <h3>
              <i>"{this.props.testimonial.comment}"</i>
            </h3>
            <h4>
              - {this.props.testimonial.name}<br/>
            </h4>
            <Divider/>
          </Grid.Column>
    );
  }
}

TestimonialRow.propTypes = {
  testimonial: PropTypes.object.isRequired,
};

