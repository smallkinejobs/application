import React from 'react';
import { subDays } from 'date-fns';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { Grid, Header, Card } from 'semantic-ui-react';
import JobCard from '../components/JobCard';

/** Renders the Page for job search results. */
class JobSearchResult extends React.Component {

  jobs = [
    {
      _id: 1,
      title: 'Job 1',
      description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
      location: 'Campus Center',
      pay: 12.44,
      postDate: subDays(new Date(), 3),
      skills: [
        { _id: 1, name: 'technology' },
        { _id: 2, name: 'IT' },
        { _id: 3, name: 'programming' },
      ],
    },
    {
      _id: 2,
      title: 'Job 1',
      description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
      location: 'Food Court',
      pay: 11.22,
      postDate: subDays(new Date(), 1),
      skills: [
        { _id: 1, name: 'MS Word' },
        { _id: 2, name: 'IT' },
        { _id: 3, name: 'Typing' },
      ],
    },
    {
      _id: 3,
      title: 'Job 3',
      description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      location: 'Library',
      pay: 10.11,
      postDate: subDays(new Date(), 10),
      skills: [
        { _id: 1, name: 'AWS' },
        { _id: 2, name: 'Unix' },
      ],
    },
    {
      _id: 4,
      title: 'Job 4',
      description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      location: 'Landscaping',
      pay: 12.22,
      postDate: subDays(new Date(), 3),
      skills: [
        { _id: 2, name: 'React' },
        { _id: 3, name: 'UI Design' },
      ],
    },
    {
      _id: 5,
      title: 'Job 5',
      description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      location: 'Athletic Center',
      pay: 10.77,
      postDate: subDays(new Date(), 22),
      skills: [
        { _id: 3, name: 'Project Management' },
      ],
    },
  ];
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      jobs: this.jobs,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = qs.parse(location.search);
    const jobs = this.jobs.filter((job) => job.title.includes(queryParams.title));
    this.setState({
      jobs,
    });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const { jobs } = this.state;
    return (
      <Grid container>
        <Grid.Column>
          <Header as="h2">{jobs.length} jobs found</Header>
          <Card.Group itemsPerRow={4}>
            {jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </Card.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

JobSearchResult.propTypes = {
  location: PropTypes.any,
};

export default JobSearchResult;
