import React from 'react';
import { Modal, Button, Label, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow } from 'date-fns';
import { _ } from 'lodash';

export default class JobDetailModal extends React.Component {
  render() {
    const { modalOpen, selectedJob, clearSelectedJob, closeModal, handleApply, skills } = this.props;
    selectedJob.skillNames = [];
    selectedJob.skills.forEach((skill) => {
      const foundSkill = _.find(skills, { key: skill });
      if (foundSkill) {
        selectedJob.skillNames.push(foundSkill.text);
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
          <Button primary onClick={handleApply}>
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
  handleApply: PropTypes.func,
};
