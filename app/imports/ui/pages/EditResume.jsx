/* eslint-disable no-undef */
import React from 'react';
import { Segment, Container, Form, Divider, Label, Button, Grid, Input, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { format } from 'date-fns';

export default class EditResume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: '',
      resume: {
        experiences: [],
        educations: [],
        skills: [],
      },
    };
    this.handleAddExperience = this.handleAddExperience.bind(this);
    this.handleAddEducation = this.handleAddEducation.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
  }

  handleAddExperience() {
    const newExperience = {
      title: '',
      company: '',
      start: format(new Date(), 'YYYY-MM-DD'),
      end: format(new Date(), 'YYYY-MM-DD'),
      duties: '',
    };
    const experiences = this.state.resume.experiences;
    experiences.push(newExperience);
    const resume = _.set(this.state.resume, 'experiences', experiences);
    this.setState({
      resume,
    });
  }

  handleAddEducation() {
    const newEducation = {
      school: '',
      degree: '',
      major: '',
      start: format(new Date(), 'YYYY-MM-DD'),
      end: format(new Date(), 'YYYY-MM-DD'),
    };
    const educations = this.state.resume.educations;
    educations.push(newEducation);
    const resume = _.set(this.state.resume, 'educations', educations);
    this.setState({
      resume,
    });
  }

  handleAddSkill() {
    const { resume, skill } = this.state;
    resume.skills.push(skill);
    this.setState({
      resume,
      skill: '',
    });
  }

  handleSkillChange(e, data) {
    this.setState({
      skill: data.value,
    });
  }



  render() {
    const { resume, skill } = this.state;
    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column textAlign='center'>
            <h2>Fill in Resume Form</h2>
            <Divider horizontal>Or</Divider>
            <Button color='linkedin'>
              Get <Icon name='linkedin' /> LinkedIn Resume
            </Button>
          </Grid.Column>
        </Grid>
        <Form>
          <Form.Group>
            <Form.Input label='First Name' />
            <Form.Input label='Last Name' />
          </Form.Group>
          <Form.Group>
            <Form.Input label='Address' />
            <Form.Input label='State' />
            <Form.Input type='number' label='Zip' />
            <Form.Input type='number' label='Phone' />
          </Form.Group>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <h2>Work Experience</h2>
              </Grid.Column>
              <Grid.Column floated='right' textAlign='right'>
                <Button onClick={this.handleAddExperience}><Icon name='add'></Icon>Add Experience</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <hr/>
          {
            resume.experiences.map((experience, index) => <WorkExperience key={index}/>)
          }
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <h2>Education</h2>
              </Grid.Column>
              <Grid.Column floated='right' textAlign='right'>
                <Button onClick={this.handleAddEducation}><Icon name='add'></Icon>Add Education</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <hr/>
          {
            resume.educations.map((education, index) => <Education key={index}/>)
          }
          <Grid.Row columns={2}>
            <Grid.Column>
              <h2>Skills</h2>
            </Grid.Column>
            <Grid.Column floated='right' textAlign='right'>
              <Input placeholder='Skill'
                     value={ skill }
                     onChange={this.handleSkillChange}
                     action={{ icon: 'add', content: 'Add Skill', onClick: this.handleAddSkill }}>
              </Input>
            </Grid.Column>
          </Grid.Row>
          <hr/>
          <Segment>
            {
              resume.skills.map((currentSkill, index) => <Label key={index} color='green'>{ currentSkill }</Label>)
            }
          </Segment>
        </Form>
      </Container>
    );
  }
}

class WorkExperience extends React.Component {
  render() {
    return (
      <Segment>
        <Form.Group inline>
          <Form.Input label='Title'/>
          <Form.Input label='Company'/>
          <Form.Input label='Start' type='date'/>
          <Form.Input label='End' type='date'/>
        </Form.Group>
        <Form.TextArea label='Duties'/>
      </Segment>
    );
  }
}

class Education extends React.Component {
  render() {
    return (
      <Segment>
        <Form.Group inline>
          <Form.Input label='School'/>
          <Form.Input label='Degree'/>
          <Form.Input label='Major'/>
          <Form.Input label='Start' type='date'/>
          <Form.Input label='End' type='date'/>
        </Form.Group>
      </Segment>
    );
  }
}
