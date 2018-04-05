import React from 'react';
import { Grid, Input, Container, List, Divider, Button } from 'semantic-ui-react';

const videoDivStyle = {
  width: '100%',
  position: 'relative',
}

const videoBlock = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const contentBlock = {
  position: 'absolute',
  top: '25%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const topColumnStyle = {
  paddingTop: '0',
}

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Grid centered verticalAlign='middle' textAlign='center'>
            <Grid.Row centered style={topColumnStyle}>
              <Grid.Column centered>
                  <div style={videoDivStyle}>
                    <div style={videoBlock}>
                      <video style={{ filter: 'grayscale(100%)' }} autoPlay loop width='100%'>
                        <source src="/videos/student_teacher.mp4" type='video/mp4'></source>
                        <source src="/videos/student_teacher.webm" type='video/mp4'></source>
                      </video>
                    </div>
                    <div style={contentBlock}>
                      <Input styl={{ width: '800px' }} size={'massive'}
                           placeholder="Search job title" action>
                      <input/>
                      <Button color={'black'} size={'massive'} type={'submit'}>Search</Button>
                      </Input>
                    </div>
                  </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Container>
          <Divider horizontal/>
          <Grid centered verticalAlign='middle' textAlign='center'>
            <Grid.Row>
              <h1>How to find one (or plenneh) small kine jobs</h1>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <h1>image</h1>
              </Grid.Column>
              <Grid.Column width={8}>
                <List>
                  <List.Item>
                    <h1>Step 1</h1>
                  </List.Item>
                  <List.Item>
                    <h2>Create your profile</h2>
                  </List.Item>
                  <List.Item>
                    <h3>Create your personal account that showcases your skills and/or interests</h3>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <br/>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign={'right'} width={8}>
                <List>
                  <List.Item>
                    <h1>Step 2</h1>
                  </List.Item>
                  <List.Item>
                    <h2>Small kine search for small kine jobs</h2>
                  </List.Item>
                  <List.Item>
                    <h3>
                      Once you have your profile created you can either
                      choose from the recommended jobs or search for more jobs
                      in the search bar
                    </h3>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={8}>
                <h1>image</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <br/>
            </Grid.Row> <Grid.Row>
            <Grid.Column width={8}>
              <h1>image</h1>
            </Grid.Column>
            <Grid.Column width={8}>
              <List>
                <List.Item>
                  <h1>Step 3</h1>
                </List.Item>
                <List.Item>
                  <h2>Apply and Cruise 'um</h2>
                </List.Item>
                <List.Item>
                  <h3>Once you apply to your chosen jobs, and our employers will get back to you</h3>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>

          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
