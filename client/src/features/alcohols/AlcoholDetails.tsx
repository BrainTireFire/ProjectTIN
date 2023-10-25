import { Card, Image } from 'semantic-ui-react';
import { useParams } from 'react-router-dom'; // Import Link from react-router-dom
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAlcoholDetailsQuery } from '../../hooks/api/alcohols/useAlcoholDetailsQuery';


export default function AlcoholsDetails() {
    const { id } = useParams<{ id: string }>();
    const alcoholQuery = useAlcoholDetailsQuery(id);

    if (alcoholQuery.isLoading) {
        return <LoadingComponent content='Loading alcohols...' />;
    }

    return (
        <Card.Group itemsPerRow={3}>
            <Card>
                <Card.Content>
                    <Card.Header>{alcoholQuery.data?.name}</Card.Header>
                    <Card.Meta>Type: {alcoholQuery.data?.type}</Card.Meta>
                    <Image src={alcoholQuery.data?.image} alt={alcoholQuery.data?.name} className="alcohol-image" style={{ width: '400px', height: '500px' }} />
                    <Card.Description>{alcoholQuery.data?.description}</Card.Description>
                </Card.Content>
            </Card>
        </Card.Group>
    );
};
