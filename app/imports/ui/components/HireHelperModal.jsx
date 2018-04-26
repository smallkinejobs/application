import React from 'react';
import { Modal, Button, Grid, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EmployeeCard from './EmployeeCard';

const appliedHelpers = [
  {
    _id: 1,
    firstName: 'Steve',
    lastName: 'Sanders',
    aveRating: 3,
    skills: ['Handy Man', 'Landscaping'],
    profileImg: '/images/landingPage/student1.jpg',
  },
  {
    _id: 2,
    firstName: 'Julie',
    lastName: 'Sanders',
    aveRating: 4,
    skills: ['Transporting'],
    profileImg: '/images/landingPage/student3.jpeg',
  },
  {
    _id: 3,
    firstName: 'Julie',
    lastName: 'Sanders',
    aveRating: 4,
    skills: ['Transporting'],
    profileImg: '/images/landingPage/student3.jpeg',
  },
  {
    _id: 4,
    firstName: 'Julie',
    lastName: 'Sanders',
    aveRating: 4,
    skills: ['Transporting'],
    profileImg: '/images/landingPage/student3.jpeg',
  },
];
export default class HireHelperModal extends React.Component {
  render() {
    const { hireModalOpen, closeHireModal } = this.props;
    return (
      <Modal
          open={hireModalOpen}>
        <Modal.Header>
          Select the Best Candidate
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Card.Group>
                {
                  appliedHelpers.map((helper, index) =>
                      <EmployeeCard key={index} employee={helper} job={this.props.job}
                                    handleSuccessHire={this.props.handleSuccessHire} cardType='hire'/>)
                }
              </Card.Group>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={closeHireModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

HireHelperModal.propTypes = {
  hireModalOpen: PropTypes.bool,
  closeHireModal: PropTypes.func,
  job: PropTypes.object,
  handleSuccessHire: PropTypes.func,
};
