import React from 'react';
import { Modal, Button, Label, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { distanceInWordsToNow } from 'date-fns';
import { _ } from 'lodash';
import { JobApplicants } from '../../api/jobApplicants/jobApplicants.js';

export default class JobDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
  }

  handleApply() {
    const job = _.find(this.props.jobApplicants, { jobId: this.props.selectedJob._id });
    JobApplicants.update(
        {
          _id: job._id,
        },
        {
          $push: { applicantIds: Meteor.userId() },
        },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            this.props.closeModal();
            Bert.alert(`Successfully Applied to ${this.props.selectedJob.title}`, 'success', 'growl-top-right');
          }
        },
    );
  }

  render() {
    const { modalOpen, selectedJob, clearSelectedJob, closeModal, skills } = this.props;
    selectedJob.skillNames = [];
    selectedJob.skills.forEach((skill) => {
      const foundSkill = _.find(skills, { _id: skill });
      if (foundSkill) {
        selectedJob.skillNames.push(foundSkill.name);
      }
    });
    return (
      <Modal
          open={modalOpen}
          onClose={clearSelectedJob}
          closeOnRootNodeClick={false}>
        <Modal.Header>
          Apply to this job : <i>Posted {distanceInWordsToNow(selectedJob.postDate)} ago</i>
        </Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='/images/uh_logo.png' />
          <Modal.Description>
            <Header>{ selectedJob.title }</Header>
            <p>{ selectedJob.description }</p>
            <p>Contact For More Info At { 'some contact info here' }</p>
            <strong>Locaton:</strong> { selectedJob.location } <br/>
            <strong>Pay:</strong> ${ selectedJob.pay } <br/>
            <strong>Skills:</strong> {
            selectedJob.skillNames.map((skill, index) =>
                <Label size='tiny' key={index} color='blue'>{skill}</Label>)
          }
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleApply}>
            Apply
          </Button>
          <Button color='red' onClick={closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

JobDetailModal.propTypes = {
  modalOpen: PropTypes.bool,
  selectedJob: PropTypes.object.isRequired,
  clearSelectedJob: PropTypes.func,
  closeModal: PropTypes.func,
  skills: PropTypes.array.isRequired,
  jobApplicants: PropTypes.array,
};
