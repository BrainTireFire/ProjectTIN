import { Link, useParams } from 'react-router-dom';
import { Segment, Header, Rating, Comment, Card, Button } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAlcoholDetailsQuery } from '../../hooks/api/alcohols/useAlcoholDetailsQuery';
import { useAddReviewWithAlcoholMutation } from '../../hooks/api/reviews/userAddReviewsAlcoholDataMutation';
import './ReviewDetails.css';

export default function ReviewDetails() {
    const { id } = useParams<{ id: string }>();
    const reviewsDetailsOfAlcoholQuery = useAlcoholDetailsQuery(id);

    if (reviewsDetailsOfAlcoholQuery.isLoading) {
        return <LoadingComponent content='Loading reviews...' />;
    }

    return (
        <div>
            <Header as="h2">Reviews of the {reviewsDetailsOfAlcoholQuery.data?.name}</Header>
            {reviewsDetailsOfAlcoholQuery.data?.alcoholReviews.length > 0 ? (
                reviewsDetailsOfAlcoholQuery.data?.alcoholReviews.map((review) => (
                    <Card key={review.review._id} className="review-card">
                        <Card.Content>
                            <Rating icon="star" rating={review.review.rating} maxRating={10} disabled />
                            <Comment>
                                <Comment.Content>
                                    <Comment.Text>{review.review.comment}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Card.Content>
                    </Card>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
            <Link to={`/reviewDetailsAdd/${id}`}>
                <Button color="blue">Add Review</Button>
            </Link>
        </div>
    );
}
