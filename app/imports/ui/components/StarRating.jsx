import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
    };
  }
  _maxRating = 5;

  componentDidMount() {
    this.getStars();
  }

  getStars() {
    const { stars } = this.state;
    const { rating } = this.props;
    for (let i = 0; i < rating; i++) {
      stars.push(<Icon key={i} color='blue' name='star' />);
    }

    const emptyStarIndex = rating;
    for (let i = emptyStarIndex; i < this._maxRating; i++) {
      stars.push(<Icon key={i} color='blue' name='empty star' />);
    }
    this.setState({
      stars,
    });
  }

  render() {
    const { stars } = this.state;
    return (
      stars
    );
  }
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
}
