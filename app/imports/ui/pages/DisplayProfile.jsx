import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import Skills from '/imports/ui/components/Skills';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class DisplayProfile extends React.Component {

  user = {
    firstName: 'John',
    lastName: 'Foo',
    businessName: 'FooProductions Ltd.',
    address: '1234 Sunnyville Ln. Anywhere USA',
    phone: '555-5555',
    email: 'john@foo.com',
    image: '/images/john.png',
    role: 'employer',
    skills: [{
      title: 'C/C++',
      _id: 1,
    },
      {
        title: 'Web Development',
        _id: 2,
      },
      {
        title: 'Data Analytics',
        _id: 3,
      },
    ],
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
       <Grid container divided='vertically' rows={2}>
         <Grid.Row columns={2}>
           <Grid.Column floated='left'>
             <Image ui size='small' src={this.user.image}/>
           </Grid.Column>
           <Grid.Column floated='right'>
               {(this.user.role === 'employee') &&
               <Header as='h1'>
               {'Name: '} {this.user.firstName} {this.user.lastName}
               </Header>
               }
               {(this.user.role === 'employer') &&
                 <Header as='h1'>
               {'Company Name: '} {this.user.businessName}
                 </Header>
               }
             <Header as='h2'>
               Address: {this.user.address}
             </Header>
             <Header as='h2'>
               Phone: {this.user.phone}
             </Header>
             <Header as='h2'>
               Email: {this.user.email}
             </Header>
           </Grid.Column>
         </Grid.Row>
         {
           (this.user.role === 'employee') &&
           <Grid.Row>
             <Skills skills={this.user.skills}/>
           </Grid.Row>
         }
       </Grid>
    );
  }
}

export default DisplayProfile;

