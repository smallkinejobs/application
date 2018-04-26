import React from 'react';
import { Modal, Message, Form, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class NewJobModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSkillSearchChange = this.handleSkillSearchChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleCategorySearchChange = this.handleCategorySearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleSkillChange = (e, { value }) => {
    const newJob = this.props.newJob;
    newJob.skills = value;
    this.setState({
      skillSearchQuery: '',
      newJob,
    });
  };

  handleSkillSearchChange = (e, { searchQuery }) =>
      this.setState({
        skillSearchQuery: searchQuery,
      });

  handleCategoryChange = (e, { value }) => {
    const newJob = this.props.newJob;
    newJob.categoryId = value;
    this.setState({
      categorySearchQuery: '',
      newJob,
    });
  };

  handleCategorySearchChange = (e, { searchQuery }) =>
      this.setState({
        categorySearchQuery: searchQuery,
      });

  render() {
    const { jobModalOpen, newJob, formError,
            categories, categorySearchQuery,
            skills, skillSearchQuery, submitJob,
            closeJobModal, clearNewJob, handleFormChanges } = this.props;
    return (
      <Modal
          open={jobModalOpen}
          onClose={clearNewJob}>
        <Modal.Header>
          <Message style={{ fontSize: '1rem' }} hidden={!formError} error={formError}>
            <p>Please correct errors for job post.</p>
          </Message>
          Post a New Job
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input name='title' label='Job Title' value={newJob.title} onChange={handleFormChanges}/>
            <Form.TextArea name='description' label='Describe Your Job'
                           value={newJob.description} onChange={handleFormChanges}/>
            <Form.Input name='location' label='Location of Work' value={newJob.location}
                        onChange={handleFormChanges}/>
            <Form.Input labelPosition='left' type='number'
                        placeholder='Amount' label='Pay Offered'
                        name='pay' value={newJob.pay} onChange={handleFormChanges}>
              <Label basic>$</Label>
              <input />
            </Form.Input>
            <Form.Dropdown
                label='Category'
                name='categoryId'
                onChange={this.handleCategoryChange}
                onSearchChange={this.handleCategorySearchChange}
                options={categories}
                placeholder='Category'
                search
                searchQuery={categorySearchQuery}
                selection
                value={newJob.categoryId} />
            <Form.Dropdown
                label='Skills Needed'
                name='skills'
                multiple
                onChange={this.handleSkillChange}
                onSearchChange={this.handleSkillSearchChange}
                options={skills}
                placeholder='Skills'
                search
                searchQuery={skillSearchQuery}
                selection
                value={newJob.skills} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={submitJob}>
            Post
          </Button>
          <Button color='red' onClick={closeJobModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

NewJobModal.propTypes = {
  newJob: PropTypes.object.isRequired,
  skillSearchQuery: PropTypes.string,
  skills: PropTypes.array,
  categorySearchQuery: PropTypes.string,
  categories: PropTypes.array,
  jobModalOpen: PropTypes.bool,
  formError: PropTypes.bool,
  submitJob: PropTypes.func,
  clearNewJob: PropTypes.func,
  closeJobModal: PropTypes.func,
  handleFormChanges: PropTypes.func,
}
