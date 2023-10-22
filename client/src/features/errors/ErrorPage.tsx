import { Container, Header, Icon } from 'semantic-ui-react';
import './ErrorPage.css';

interface Props {
    message: string;
    statusText: string;
}

export default function ErrorPage(props: Props) {
    return (
        <Container text textAlign='center' style={{ marginTop: '2rem' }}>
            <Header as='h1' icon textAlign='center'>
                <Icon name='frown' />
                {props.statusText}
                <Header.Subheader>{props.message}</Header.Subheader>
            </Header>
        </Container>
    );
}
