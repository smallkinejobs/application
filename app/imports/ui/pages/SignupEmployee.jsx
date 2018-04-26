import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { Skills } from '../../api/skills/skills';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
class SignupEmployee extends React.Component {
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
      skills: [],
      skillSearchQuery: '',
      redirectToReferer: false,
    };
    // Ensure that 'this' is bound to this component in these two functions.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSkillSearchChange = this.handleSkillSearchChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
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
      skills,
      firstName,
      lastName,
      phone,
      imageURL,
      streetAddress,
      unit,
      zipcode,
      city,
    } = this.state;
    const address = `${streetAddress} + ${unit} + ","+  ${city}+ "," + ${zipcode}`;
    const profile = { skills: skills, firstName, lastName, phone, address, imageURL };
    Accounts.createUser({
      email,
      username: email,
      password,
      profile,
    }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Roles.addUsersToRoles(Meteor.userId(), 'employee');
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** This handles the changing jobs**/
  handleSkillChange = (e, { value }) => {
    this.setState({
      skillSearchQuery: '',
      skills: value,
    });
  };

  /** This handles skills changing during the search **/
  handleSkillSearchChange = (e, { searchQuery }) =>
      this.setState({
        skillSearchQuery: searchQuery,
      });

  /** Display the signup form. */
  render() {
    const { skills, skillSearchQuery } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container>
          <Grid style={{ textAlign: 'center', verticalAlign: 'middle', margin: '0rem' }} centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Create your Helper profile
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
                        name="phoneNumber"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                        width={6}
                        label="Address"
                        name="streetAddress"
                        placeholder="Street Number Street Name"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={3}
                        label="Unit Number"
                        placeholder="####"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        width={4}
                        label="City"
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
                  <Form.Dropdown
                      label='Skills Needed'
                      name='skills'
                      multiple
                      onChange={this.handleSkillChange}
                      onSearchChange={this.handleSkillSearchChange}
                      options={this.props.skills}
                      placeholder='Skills'
                      search
                      searchQuery={skillSearchQuery}
                      selection
                      value={skills}
                  />
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

SignupEmployee.propTypes = {
  skills: PropTypes.array.isRequired,
  location: PropTypes.object,
};

export default withTracker(() => {
  const skillSubscription = Meteor.subscribe('SkillsString');
  return {
    ready: skillSubscription.ready(),
    skills: Skills.find({}).map((skill) => ({
      key: skill._id,
      text: skill.name,
      value: skill._id,
    })),
  };
})(SignupEmployee);
