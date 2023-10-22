import React from 'react';
import { Container, Header, Button, Icon, Grid, Segment, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead segmentStyle'>
            <Container text>
                <Header as='h1' inverted className='headerStyle'>
                    Welcome to the Alcohol Web Page
                </Header>
                <p className='subheaderStyle'>Discover the Finest Selection of Alcoholic Beverages</p>
                <Link to='/register'>
                    <Button size='huge' className='buttonStyle registerButton'>
                        Register
                    </Button>
                </Link>
                <Link to='/login'>
                    <Button size='huge' className='buttonStyle loginButton'>
                        Login
                    </Button>
                </Link>
            </Container>
        </Segment>
    );
}
