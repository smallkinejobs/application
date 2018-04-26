import React from 'react';
import { Modal, Button, Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Implements the feedback Modal for allowing users to submit feedback/ratings
 *  on employees/employers who were tied to a specific job/task
 */
class FeedbackModal extends React.Component {

  render() {

    return (
        <Modal
            open={this.props.isOpen}
            onClose={this.props.closeCallback}>
          <Modal.Header>
            Rating User: {this.props.ratedUser}
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group inline>
                <Label>Rating</Label>
                <Form.Radio label='0' value={0} checked={this.props.ratingValue === 0}
                            onChange={this.props.ratingChangeCallback}>
                </Form.Radio>
                <Form.Radio label='1' value={1} checked={this.props.ratingValue === 1}
                            onChange={this.props.ratingChangeCallback}>
                </Form.Radio>
                <Form.Radio label='2' value={2} checked={this.props.ratingValue === 2}
                            onChange={this.props.ratingChangeCallback}>
                </Form.Radio>
                <Form.Radio label='3' value={3} checked={this.props.ratingValue === 3}
                            onChange={this.props.ratingChangeCallback}>
                </Form.Radio>
                <Form.Radio label='4' value={4} checked={this.props.ratingValue === 4}
                            onChange={this.props.ratingChangeCallback}>
                </Form.Radio>
                <Form.Radio label='5' value={5} checked={this.props.ratingValue === 5}
                            onChange={this.props.ratingChangeCallback}>
                </Form.Radio>
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.props.submitCallback}>
              Submit Rating
            </Button>
            <Button color='red' onClick={this.props.closeCallback}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
    );
  }
}

/** All callback functions for handling rating processing are passed down from the parent */
FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  ratedUser: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  ratingChangeCallback: PropTypes.func.isRequired,
  ratingValue: PropTypes.number.isRequired,

};

export default FeedbackModal;
