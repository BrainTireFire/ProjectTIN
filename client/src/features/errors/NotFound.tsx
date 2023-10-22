import { Container, Header, Icon } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Container text textAlign='center' style={{ marginTop: '2rem' }}>
            <Header as='h1' icon textAlign='center'>
                <Icon name='frown' />
                Page Not Found
                <Header.Subheader>The requested page was not found.</Header.Subheader>
            </Header>
        </Container>
    );
}
