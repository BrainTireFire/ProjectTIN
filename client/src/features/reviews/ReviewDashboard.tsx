import { useState } from 'react';
import { Card, List, Button } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useReviewsQuery } from '../../hooks/api/reviews/useReviewsQuery';

export default function ReviewDashboard() {
    const reviewsQuery = useReviewsQuery();
    const [viewAsList, setViewAsList] = useState(false);

    const toggleView = () => {
        setViewAsList(!viewAsList);
    };

    if (reviewsQuery.isLoading) {
        return <LoadingComponent content='Loading reviews...' />;
    }

    return (
        <div>
            <Button
                primary
                style={{ marginBottom: '10px' }}
                onClick={toggleView}
            >
                {viewAsList ? 'View as Cards' : 'View as List'}
            </Button>
            {viewAsList ? (
                <List divided relaxed>
                    {reviewsQuery.data?.reviews.map((review) => (
                        <List.Item key={review._id}>
                            <List.Icon name='star' />
                            <List.Content>
                                <List.Header>Rating: {review.rating}</List.Header>
                                <List.Description>Comment: {review.comment}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            ) : (
                <Card.Group itemsPerRow={3}>
                    {reviewsQuery.data?.reviews.map((review) => (
                        <Card key={review._id}>
                            <Card.Content>
                                <Card.Header>Reviews</Card.Header>
                                <Card.Meta>Rating: {review.rating}</Card.Meta>
                                <Card.Description>Comment: {review.comment}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            )}
        </div>
    );
}
