import React from 'react';
import { Container, Grid, Divider, Card } from 'semantic-ui-react';
import { subDays } from 'date-fns';
import JobCard from './JobCard';
import EmployeeCard from './EmployeeCard';

const jobs = [
  {
    _id: 1,
    title: 'Job 1',
    description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    location: 'Campus Center',
    employerName: 'Jessy',
    pay: 12.44,
    open: true,
    postDate: subDays(new Date(), 3),
    skills: [
      { _id: 1, name: 'technology' },
      { _id: 2, name: 'IT' },
      { _id: 3, name: 'programming' },
    ],
  },
  {
    _id: 2,
    title: 'Job 11',
    description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
    location: 'Food Court',
    pay: 11.22,
    employerName: 'Bill',
    open: true,
    postDate: subDays(new Date(), 1),
    skills: [
      { _id: 1, name: 'MS Word' },
      { _id: 2, name: 'IT' },
      { _id: 3, name: 'Typing' },
    ],
  },
  {
    _id: 3,
    title: 'Job 123',
    description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    location: 'Library',
    employerName: 'Bill',
    open: true,
    pay: 10.11,
    postDate: subDays(new Date(), 10),
    skills: [
      { _id: 1, name: 'AWS' },
      { _id: 2, name: 'Unix' },
    ],
  },
  {
    _id: 4,
    title: 'Job 12',
    description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    location: 'Landscaping',
    employerName: 'Bill',
    open: true,
    pay: 12.22,
    postDate: subDays(new Date(), 3),
    skills: [
      { _id: 2, name: 'React' },
      { _id: 3, name: 'UI Design' },
    ],
  },
  {
    _id: 5,
    title: 'Job 135',
    description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    location: 'Athletic Center',
    employerName: 'Bill',
    open: false,
    pay: 10.77,
    postDate: subDays(new Date(), 22),
    skills: [
      { _id: 3, name: 'Project Management' },
    ],
  },
];

const pastHelpers = [
  {
    _id: 1,
    firstName: 'Steve',
    lastName: 'Sanders',
    aveRating: 3,
    skills: ['Handy Man', 'Landscaping'],
    profileImg: '/images/landingPage/student1.jpg',
  },
  {
    _id: 1,
    firstName: 'Julie',
    lastName: 'Sanders',
    aveRating: 4,
    skills: ['Transporting'],
    profileImg: '/images/landingPage/student3.jpeg',
  },
]

export default class EmployeeLanding extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: '#009688' }}>
        <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <h1>Jobs Applied For</h1>
          <Divider/>
          <Grid>
            <Grid.Row>
              <Card.Group>
                {
                  jobs.map((job) => <JobCard key={job._id} job={job}/>)
                }
              </Card.Group>
            </Grid.Row>
          </Grid>

          <h1>Other Recommended Jobs</h1>
          <Divider/>
          <Grid>
            <Grid.Row>
              <Card.Group>
                {
                  jobs.map((job) => <JobCard key={job._id} job={job}/>)
                }
              </Card.Group>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
