import React from 'react';
import { Grid, Header, Image, Card, Container, Modal, Button, Label, Loader } from 'semantic-ui-react';
import Skills from '/imports/ui/components/Skills';
import JobCard from '/imports/ui/components/JobCard';
import { subDays, distanceInWordsToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Ratings } from '../../api/ratings/ratings.js';

class JobFeedback extends React.Component {
  render() {
    return ();
  }
}

JobFeedback.propTypes = {
  job: PropTypes.object.isRequired,
}
export default withTracker(() => {

})(JobFeedback);

