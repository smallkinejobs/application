import React from 'react';
import BaseLanding from '../components/BaseLanding';
import EmployerLanding from '../components/EmployerLanding';

const testUser = {
  roles: ['employer'],
}

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        {
          testUser.roles.length === 0 &&
          <BaseLanding/>
        }
        {
          testUser.roles.includes('employer') &&
          <EmployerLanding/>
        }
      </div>
    );
  }
}


export default Landing;
