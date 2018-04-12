import React from 'react';
import { Grid, Input, Image, Container, List, Divider, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const videoDivStyle = {
  width: '100%',
  position: 'relative',

};

const videoBlock = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const contentBlock = {
  position: 'absolute',
  top: '25%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const topColumnStyle = {
  paddingTop: '0',
};

const rowStyle = {
  backgroundColor: '#F9FAFB',
}

const headingStyle = {
  fontFamily: 'Pacifico',
  fontSize: '3rem',
}

const instructionStyle = {
  padding: '7rem',
}

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleNextVideo = this.handleNextVideo.bind(this);
  }

  handleSearch() {
    const { history } = this.props;
    history.push(`job-search-results?title=${this.state.searchText}`);
  }

  handleSearchText(e, data) {
    this.setState({
      searchText: data.value,
    });
  }

  videoSrcs = [
    'videos/student_teacher.webm',
    'videos/hawaii.webm',
    'videos/computer_view.webm',
  ];

  currentVideo = 0;

  handleNextVideo(e) {
    const videoEl = e.target;
    this.currentVideo++;
    if (this.currentVideo === this.videoSrcs.length) {
      this.currentVideo = 0;
    }
    videoEl.src = this.videoSrcs[this.currentVideo];
  }

  render() {
    return (
        <div>
          <div>
            <Grid centered verticalAlign='middle' textAlign='center'>
              <Grid.Row style={topColumnStyle}>
                <Grid.Column>
                  <div style={videoDivStyle}>
                    <div style={videoBlock}>
                      <video style={{ filter: 'grayscale(100%)' }}
                             autoPlay
                             width='100%'
                             onEnded={(e) => this.handleNextVideo(e)}
                              src='/videos/student_teacher.webm'>
                      </video>
                    </div>
                    <div style={contentBlock}>
                      <Input style={{ width: '800px' }} size={'massive'}
                             placeholder="Search job title" action
                             onChange={(e, data) => this.handleSearchText(e, data)}>
                        <input/>
                        <Button color={'blue'} size={'massive'} type={'submit'} onClick={this.handleSearch}>
                          Search
                        </Button>
                    </Input>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div style={rowStyle}>
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
                <Divider/>
                <Grid.Row>
                  <Grid.Column width ={4}>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <img src='/images/landingPage/profiles.png' floated='right'/>
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
                        <h3>
                          Create your profile. If you're looking for employees just add your basic info. If you're
                          looking for a small kine job, list your skills so that way we can help you find the perfect job
                          for you.
                        </h3>
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
                        <h2>Small kine search or small kine post</h2>
                      </List.Item>
                      <List.Item>
                        <h3>
                          Once you have your profile created employers can post up jobs that they need help where
                          employees can apply for that job. Employees will have 'recommended jobs' depending on the skills
                          listed on your profile, you can also search for other jobs if you want to see more.
                        </h3>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <img src='/images/landingPage/choose.png'/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <br/>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width ={4}>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <img width='60%' src='/images/landingPage/shaka.png'/>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <List>
                      <List.Item>
                        <h1>Step 3</h1>
                      </List.Item>
                      <List.Item>
                        <h2>Apply and cruise 'um</h2>
                      </List.Item>
                      <List.Item>
                        <h3>Once you have posted a job and/or applied for a job sit back and relax.</h3>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>


          <Container style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
            <Grid centered verticalAlign='middle' textAlign='center'>
              <Grid.Row>
                <h1 style={headingStyle}>What is 'Small Kine Jobs'?</h1>
              </Grid.Row>
              <Divider/>
              <Grid.Row>
                <Container text>
                  <h2>
                    Small Kine Jobs is an app that allows students and faculty of UH Manoa to find or post a job that
                    doesn't require a long time commitment.
                  </h2>
                  <h2>
                    These small tasks can range from office work, to yard
                    maintenence, or other small tasks where you could use an exta hand. This also offers a platform for
                    those who are seeking assistance with these tasks, to find help as quickly as possible.
                  </h2>
                  <h2>
                    We hope that Small Kine Jobs can fulfill the Hawaiian value of "Laulima" or cooperation. Where we can have
                    employees who are willing to help employers and employers offer the opportunity for employees to
                    showcase their skills.
                  </h2>
                </Container>
              </Grid.Row>
            </Grid>
          </Container>

          <div style={rowStyle}>
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
Landing.propTypes = {
  history: PropTypes.any,
};

export default Landing;
