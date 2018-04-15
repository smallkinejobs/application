import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class StarRating extends React.Component {
  _maxRating = 5;

  stars = [];

  getStars() {
    const { rating } = this.props;

    for (let i = 0; i < rating; i++) {
      this.stars.push(<Icon key={i} color='blue' name='star' />);
    }

    const emptyStarIndex = rating;
    for (let i = emptyStarIndex; i < this._maxRating; i++) {
      this.stars.push(<Icon key={i} color='blue' name='empty star' />);
    }

    return this.stars;
  }

  render() {
    return (
      this.getStars()
    );
  }
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
}
