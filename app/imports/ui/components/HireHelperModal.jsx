import React from 'react';
import { Modal, Button, Grid, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { JobApplicants } from '../../api/jobApplicants/jobApplicants';
import { Meteor } from "meteor/meteor";
import EmployeeCard from './EmployeeCard';

export default class HireHelperModal extends React.Component {
  render() {
    let jobApplicants = [];
    const { hireModalOpen, closeHireModal, skills, job, ratings } = this.props;
    if (job != null) {
      const jobApplicantsNames = JobApplicants.findOne({ jobId: job._id });
      jobApplicants = jobApplicantsNames.applicantIds.map((name) => Meteor.users.findOne({ username: name }));
    }
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
                  jobApplicants.map((helper, index) =>
                      <EmployeeCard key={index} employee={helper} job={job} skills={skills}
                                    handleSuccessHire={this.props.handleSuccessHire} cardType='hire'
                                    ratings={ratings.filter((rating) => rating.user === helper.username)}/>)
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
  skills: PropTypes.array,
  ratings: PropTypes.array,
};
