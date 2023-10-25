import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Segment, Header, Rating, Comment, Card, Button } from 'semantic-ui-react';
import { apiClient } from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAlcoholDetailsQuery } from '../../hooks/api/alcohols/useAlcoholDetailsQuery';
import { useAddReviewWithAlcoholMutation } from '../../hooks/api/reviews/userAddReviewsAlcoholDataMutation';
import { useCurrentUser } from '../../hooks/api/users/useCurrentUser';
import './ReviewDetails.css';

export default function ReviewDetails() {
    const { id } = useParams<{ id: string }>();
    const [isDeleting, setIsDeleting] = useState(false);
    const ids = id?.split('and');
    const reviewsDetailsOfAlcoholQuery = useAlcoholDetailsQuery(ids[0]);
    const currentUser = useCurrentUser();

    if (reviewsDetailsOfAlcoholQuery.isLoading && currentUser.isLoading) {
        return <LoadingComponent content='Loading reviews...' />;
    }

    const deleteReview = async (reviewId: string) => {
        setIsDeleting(true);
        try {
            const response = await apiClient.delete(`http://localhost:5000/api/v1/reviews/${reviewId}`);
            if (response.status === 204) {
                console.log('Review deleted successfully.');
            } else {
                console.error('Review deletion failed. Status:', response.status);
            }
            setTimeout(() => {
                setIsDeleting(false);
                reviewsDetailsOfAlcoholQuery.refetch();
            }, 500);
        } catch (error) {
            console.error('An error occurred while deleting the review:', error);
        }
    };

    if (isDeleting) {
        return <LoadingComponent content='Deleting...' />;
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
                        {(currentUser.data && currentUser.data?._id === review.review.user._id) ? <Button onClick={() => deleteReview(review.review._id)} color="red"> Delete </Button> : null}
                    </Card>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
            <Link to={`/reviewDetailsAdd/${id}and${currentUser.data?._id}`}>
                <Button color="blue">Add Review</Button>
            </Link>
        </div>
    );
}
