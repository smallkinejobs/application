import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class SignupEmployer extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      streetAddress: '',
      unit: '',
      city: '',
      zipcode: '',
      error: '',
    };
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
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      imageURL,
      streetAddress,
      unit,
      zipcode,
      city,
    } = this.state;
    const address = `${streetAddress} + ${unit} + ${zipcode} + ${city}`;
    const profile = { firstName, lastName, phone, address, imageURL };
    Accounts.createUser({
      email,
      username: email,
      password,
      profile,
    }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Roles.addUsersToRoles(Meteor.userId(), 'employer');
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container>
          <Grid style={{ textAlign: 'center', verticalAlign: 'middle', margin: '0rem' }} centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Create your Employer profile
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
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={8}
                        required
                        label="Last Name"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                        width={7}
                        required
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={4}
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
                        name="phone"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                        width={6}
                        label="Address"
                        name="streetAdress"
                        placeholder="Street Number Street Name"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={3}
                        label="Unit Number"
                        name="unit"
                        placeholder="####"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={4}
                        label="City"
                        name="city"
                        placeholder="City"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={3}
                        label="Zipcode"
                        placeholder="Zipcode"
                        name="zip"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
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
SignupEmployer.propTypes = {
  location: PropTypes.object,
};
