import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Icon, Header, Segment } from 'semantic-ui-react';

export default function AgeVerificationPage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead segmentStyle'>
            <Container text>
                <Header as='h1' inverted className='headerStyle'>
                    Are You 18+?
                </Header>
                <p className='subheaderStyle'>Please confirm your age to access our website.</p>
                <Link to='/home'>
                    <Button size='huge' className='buttonStyle'>
                        Yes, I'm 18+
                        <Icon name='right arrow' />
                    </Button>
                </Link>
            </Container>
        </Segment>
    );
}
