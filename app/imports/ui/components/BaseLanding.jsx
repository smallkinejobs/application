import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Grid, Segment, Image, Container, Icon, Divider, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const firstRowStyle = {
  backgroundColor: '#F9FAFB',
}

const secondRowStyle = {
  backgroundColor: '#2185d0',
}

const headingStyle = {
  fontFamily: 'Pacifico',
  fontSize: '3rem',
}

const instructionStyle = {
  padding: '7rem',
}


export default class BaseLanding extends React.Component {
  render() {
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
                        <Grid.Column textAlign='left' >
                          <h3>Sign up as a Employer to find help</h3>
                          <Button color='orange' as={NavLink} exact to="/signupemployer">Employer Sign Up</Button>
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
                        <Grid.Column textAlign='left' >
                          <h3>Sign up as a helper</h3>
                          <Button color='blue' as={NavLink} exact to="/signupemployee">Helper Sign Up</Button>
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
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Image floated='right' circular size='small' src='/images/landingPage/student1.jpg' />
                </Grid.Column>
                <Grid.Column floated='left'>
                  <h3>
                    <i>
                      "I found my job through Small Kine Jobs and was able to gain better skills as a programmer!"
                    </i>
                  </h3>
                  <h4>
                    Joe Smith <br/>
                    Web Developer at Food Court
                  </h4>
                </Grid.Column>
                <Grid.Column>
                  <Image floated='right' circular size='small' src='/images/landingPage/student2.jpg' />
                </Grid.Column>
                <Grid.Column floated='left'>
                  <h3>
                    <i>
                      "Thanks to Small Kine Jobs I gained valuable experience for my career."
                    </i>
                  </h3>
                  <h4>
                    Sally Pickle <br/>
                    Admin Assistant at Warrior Rec Center
                  </h4>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Image floated='right' circular size='small' src='/images/landingPage/student3.jpeg' />
                </Grid.Column>
              <Grid.Column floated='left'>
                <h3>
                  <i>
                    "I was broke eating ramen all day, now thanks to SKJ I'm eating real food!"
                  </i>
                </h3>
                <h4>
                  Sara Brown <br/>
                  Librarian at Sinclair Library
                </h4>
              </Grid.Column>
              <Grid.Column>
              <Image floated='right' circular size='small' src='/images/landingPage/student4.jpg' />
                  </Grid.Column>
              <Grid.Column floated='left'>
                <h3>
                  <i>
                    "I only had imaginary friends before, but now at my job I have real ones! Thanks SKJ!"
                  </i>
                </h3>
                <h4>
                  Bruce Wayne <br/>
                  Graphic Designer at Lava Labs
                </h4>
              </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

BaseLanding.propTypes = {
  history: PropTypes.any,
};
