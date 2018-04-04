import React from 'react';
import { Grid, Input, Container, List, Divider, Button } from 'semantic-ui-react';

const bgStyle = {
  backgroundImage: "url('https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
  height: '50rem',
  backgroundSize: 'cover',
};

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <div style={bgStyle}>
          <Grid centered verticalAlign='middle' textAlign='center'>
            <Grid.Column width={8} verticalAlign={'middle'}>
              <Input fluid size={'massive'}
                     placeholder="Enter job keyword/description to search for a small kine job" action>
                <input/>
                <Button color={'black'} size={'massive'} type={'submit'}>Search</Button>
              </Input>
            </Grid.Column>
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
