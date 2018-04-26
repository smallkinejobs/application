import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // go to employee page
      }
    });
  }

  /** Display the signup form. */
  render() {
    return (
        <Container>
          <Grid style={{ textAlign: 'center', verticalAlign: 'middle', margin: '0rem' }} centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Create your Employee profile
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Group>
                    <Form.Input
                        width={8}
                        required
                        label="First Name"
                        placeholder="First Name"
                        name="firstName"
                        type="firstName"
                    />
                    <Form.Input
                        width={8}
                        required
                        label="Last Name"
                        placeholder="Last Name"
                        name="lastName"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                        width={4}
                        required
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={7}
                        required
                        label="Password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={5}
                        label="Phone Number"
                        placeholder="(123) 456 7890"
                    />
                  </Form.Group>
                  <Form.Input
                      width={5}
                      label="Profile Picture"
                      action={{ color: 'blue', labelPosition: 'right', icon: 'photo', content: 'Upload' }}
                  />
                  <Form.Input
                      width={8}
                      label="Skills"
                      placeholder="Enter a skill then press the enter button"
                      name="skills"
                  />
                  <hr/>
                  <h2>Skills component</h2>
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
