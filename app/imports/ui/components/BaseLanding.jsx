import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Grid, Segment, Image, Container, Icon, Divider, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Testimonials } from '../../api/testimonials/testimonials';
import TestimonialRow from '../components/TestimonialRow';

const firstRowStyle = {
  backgroundColor: '#F9FAFB',
}

const secondRowStyle = {
  backgroundColor: '#dc7b42',
}

const headingStyle = {
  fontFamily: 'Pacifico',
  fontSize: '3rem',
}

const instructionStyle = {
  padding: '7rem',
}

class BaseLanding extends React.Component {
  constructor(props) {
    super(props);
    this.employeeSignUpButton = this.employeeSignUpButton.bind(this);
    this.employerSignUpButton = this.employerSignUpButton.bind(this);
  }

  employeeSignUpButton() {
    const { history } = this.props;
    history.push('signupemployee');
  }

  employerSignUpButton() {
    const { history } = this.props;
    history.push('signupemployer');
  }

  renderPage() {
    console.log(this.props.testimonials);
    return (
        <div>
          <div style={firstRowStyle}>
            <Container style={instructionStyle}>
              <Grid centered verticalAlign='middle' textAlign='center'>
                <Grid.Row>
                  <h1 style={headingStyle}>
                    <span>Turning </span>
                    <span style={{ fontSize: '4rem', color: '#f2711c' }}>BIG </span>
                    <span>problems in to </span>
                    <span style={{ fontSize: '2rem', color: '#2185d0' }}>"small kine" </span>
                    <span>ones</span>
                  </h1>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column style={{ paddingRight: '3rem' }} textAlign='center'>
                    <Segment color='orange'>
                      <h1 style={{ color: '#F2711C' }}>Find Help</h1>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column textAlign='right'>
                            <Icon name='users' circular color='orange' size='huge'/>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <h3>Sign up as a Employer to find help</h3>
                            <Button color='orange' onClick={this.employerSignUpButton}>
                              Sign up as an Employer
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column textAlign='right'>
                            <h3>Post your task that you need completed</h3>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <Icon name='announcement' circular color='orange' size='huge'/>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column textAlign='right'>
                            <Icon name='write' circular color='orange' size='huge'/>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <h3>Compensate and rate your helper</h3>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                  <Divider vertical>OR</Divider>
                  <Grid.Column style={{ paddingLeft: '3rem' }} textAlign='center'>
                    <Segment color='blue'>
                      <h1 style={{ color: '#2185D0' }}>Lend a Hand</h1>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column textAlign='right'>
                            <Icon name='users' circular color='blue' size='huge'/>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <h3>Sign up as a helper</h3>
                            <Button color='blue' onClick={this.employeeSignUpButton}>
                              Sign up as a Helper
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column textAlign='right'>
                            <h3>List your skills for match up with the perfect task</h3>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <Icon name='checkmark box' circular color='blue' size='huge'/>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column textAlign='right'>
                            <Icon name='money' circular color='blue' size='huge'/>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <h3>Complete a task requested and get paid</h3>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>

          <div style={secondRowStyle}>
            <Container style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
              <Grid textAlign='center'>
                <Grid.Row>
                  <h1 style={headingStyle}>
                    Real Students - Real Jobs
                  </h1>
                  <h2>
                    ‘A‘ohe hana nui ke alu ‘ia. - <i>"No task is too big when done together by all."</i>
                  </h2>
                </Grid.Row>
                <Grid.Row>
                {
                  this.props.testimonials.map((testimonial) => (
                    <TestimonialRow key={testimonial._id} testimonial={testimonial}/>
                  ))
                }
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </div>
    );
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <h1>Loading Page</h1>;
  }
}

BaseLanding.propTypes = {
  history: PropTypes.any,
  testimonials: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const testimonialSubscription = Meteor.subscribe('AllTestimonials');
  return {
    ready: testimonialSubscription.ready(),
    testimonials: Testimonials.find({}).fetch(),
  };
})(BaseLanding);
