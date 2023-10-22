import React from 'react';
import { Container, Header, Icon, Message } from 'semantic-ui-react';

export default function ForgetPassword() {
    return (
        <Container text textAlign='center' style={containerStyle}>
            <Header as='h2' icon>
                <Icon name='envelope outline' />
                Check Your Email
            </Header>
            <Message info>
                <Message.Header>Password Reset Instructions</Message.Header>
                <p>
                    We've sent instructions to your email address. Please check your inbox, including your spam folder, for a password reset link. Click the link to reset your password.
                </p>
            </Message>
        </Container>
    );
}

const containerStyle = {
    marginTop: '2rem',
};
