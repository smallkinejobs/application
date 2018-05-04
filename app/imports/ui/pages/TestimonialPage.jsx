import React from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Testimonials } from '../../api/testimonials/testimonials';
import { Container, Form, Grid, Header, Label, Segment } from 'semantic-ui-react';

/**
 *Testimonial page that adds a testimonial to the testimonials collection
 * Takes in a rating from 1 to 5, and a comment as a string
 */
export default class TestimonialPage extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { name: '', rating: 3, comment: '' };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.returnToHomepageButton = this.returnToHomepageButton.bind(this);
    this.ratingChange = this.ratingChange.bind(this);
    this.submitTestimonial = this.submitTestimonial.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  handleSubmit() {
    const { name, rating, comment } = this.state;
  }

  returnToHomepageButton() {
    const { history } = this.props;
    history.push('/');
  }
  ratingChange(e, { value }) {
    this.setState({ rating: value });
  }

  submitTestimonial() {
    Testimonials.insert(this.state, (err, id) => {
      if (err) {
        Bert.alert('Failed to post testimonial', 'danger', 'growl-top-right');
      } else {
        console.log(id);
        this.setState({
          name: '',
          rating: '',
          comment: '',
        })
        this.returnToHomepageButton();
      }
    });
  }

  /** Render the signin form. */
  render() {
    return (
        <div style={{
          backgroundImage: 'url(/images/login/blueBack.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}>
          <Container>
            <Grid style={{ textAlign: 'center', verticalAlign: 'middle', margin: '0rem' }} centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center" inverted>
                  Welcome Back
                </Header>
                <Form onSubmit={this.handleSubmit}>
                  <Segment basic style={{ backgroundColor: 'none' }}>
                    <Form.Input
                    name ='name'
                    placeholder='Name'
                    onChange={this.handleChange}>
                    </Form.Input>
                    <Form.Group inline>
                      <Label>Rating</Label>
                      <Form.Radio label='0' value={0} checked={this.state.rating === 0}
                                  onChange={this.ratingChange}>
                      </Form.Radio>
                      <Form.Radio label='1' value={1} checked={this.state.rating === 1}
                                  onChange={this.ratingChange}>
                      </Form.Radio>
                      <Form.Radio label='2' value={2} checked={this.state.rating === 2}
                                  onChange={this.ratingChange}>
                      </Form.Radio>
                      <Form.Radio label='3' value={3} checked={this.state.rating === 3}
                                  onChange={this.ratingChange}>
                      </Form.Radio>
                      <Form.Radio label='4' value={4} checked={this.state.rating === 4}
                                  onChange={this.ratingChange}>
                      </Form.Radio>
                      <Form.Radio label='5' value={5} checked={this.state.rating === 5}
                                  onChange={this.ratingChange}>
                      </Form.Radio>
                    </Form.Group>
                    <Form.TextArea placeholder='Like the app? Hate it? Tell us how you really feel...'
                    name='comment'
                    onChange={this.handleChange}/>
                    <Form.Button color='blue' onClick={this.submitTestimonial}>
                      Submit
                    </Form.Button>
                    <Form.Button color='orange' onClick={this.returnToHomepageButton}>
                      Return to Homepage
                    </Form.Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    )
        ;
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
TestimonialPage.propTypes = {
  history: PropTypes.any,

};
