import { Card, Button, Icon, Image, Rating, Input, Select, Grid, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useAlcoholsQuery } from '../../hooks/api/alcohols/useAlcoholsQuery';
import { Alcohol } from '../../app/models/alcohol';
import './AlcoholsTable.css';
import ErrorPage from '../errors/ErrorPage';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { apiClient } from '../../app/api/agent';
import { useCurrentUser } from '../../hooks/api/users/useCurrentUser';

const options = [
    { key: 5, text: '5', value: 5 },
    { key: 10, text: '10', value: 10 },
    { key: 20, text: '20', value: 20 },
    { key: 30, text: '30', value: 30 },
    { key: 50, text: '50', value: 50 },
    { key: 100, text: '100', value: 100 },
];

export default function AlcoholsTable() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isDeleting, setIsDeleting] = useState(false);
    const alcoholsQuery = useAlcoholsQuery(page, pageSize);
    const currentUser = useCurrentUser();

    if (alcoholsQuery.error) {
        console.log(alcoholsQuery.error)
        return <ErrorPage message={alcoholsQuery.error.response.data.message} statusText={alcoholsQuery.error.response.statusText} />
    }

    if (alcoholsQuery.isLoading) {
        return <LoadingComponent content='Loading alcohols...' />;
    }

    const countAverageRate = (reviews) => {
        if (reviews.length === 0) {
            return 0;
        }
        const sum = reviews.reduce((total, review) => total + review.review.rating, 0);
        const average = sum / reviews.length;
        return average;
    };

    const deleteAlcohol = async (alcoholId: string) => {
        setIsDeleting(true);
        try {
            const response = await apiClient.delete(`http://localhost:5000/api/v1/alcohols/${alcoholId}`);
            if (response.status === 204) {
                console.log('Review deleted successfully.');
            } else {
                console.error('Review deletion failed. Status:', response.status);
            }
            setTimeout(() => {
                setIsDeleting(false);
                alcoholsQuery.refetch();
            }, 500);
        } catch (error) {
            console.error('An error occurred while deleting the review:', error);
        }
    };

    const handleChange = (e, { value }) => {
        setPageSize(value);
    };

    return (
        <div>
            <Segment>
                <p style={{ fontSize: '20px', marginBottom: '10px' }}>
                    Limit:
                </p>
                <Select
                    className="pagination-select-list"
                    options={options}
                    value={pageSize}
                    onChange={handleChange}
                    label="Items per page"
                    labelPosition="right"
                />
                {(currentUser.data && currentUser.data?.role === 'admin' || currentUser.data?.role === 'moderator')
                    ? (
                        <Link to={`/alcoholAdd`}>
                            <Button color="blue">Add Review</Button>
                        </Link>
                    )
                    : null
                }
            </Segment>
            <Segment className="pagination_Container_Style">
                <div>
                    <Button onClick={() => { setPage(page - 1); }} disabled={page === 1} className="pagination-Button-Style">
                        Previous
                    </Button>
                    <span>Page {page}</span>
                    <Button onClick={() => { setPage(page + 1) }} disabled={alcoholsQuery.data?.alcohols.length < pageSize} className="pagination-Button-Style">
                        Next
                    </Button>
                </div>
            </Segment>
            <Card.Group>
                {alcoholsQuery.data?.alcohols.map((alcohol: Alcohol) => (
                    <Card key={alcohol._id}>
                        <Link to={`/alcohols/${alcohol._id}`}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>{alcohol.name}</Card.Header>
                                    <Card.Meta>Type: {alcohol.type}</Card.Meta>
                                    <Image src={alcohol.image} alt={alcohol.name} className="alcohol-image" style={{ width: '250px', height: '300px' }} />
                                    <Card.Description>{alcohol.description}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Link>
                        <Card.Content extra>
                            <div>Age: {alcohol.age} years</div>
                            <div>Alcohol Percentage: {alcohol.alcohol_percentage}%</div>
                            <div>Price: ${alcohol.price.toFixed(2)}</div>
                            {countAverageRate(alcohol.alcoholReviews) === 0 ? (
                                <span className="no-rating"> No rating</span >
                            ) : (
                                <span>
                                    Rating: <Rating icon="star" rating={countAverageRate(alcohol.alcoholReviews)} maxRating={10} disabled />
                                </span>
                            )}
                        </Card.Content>
                        <Card.Content extra>
                            <Link to={`/reviewDetails/${alcohol._id}`}>
                                <div className="ui buttons">
                                    <Button basic color="blue">
                                        <Icon name="edit" /> Review
                                    </Button>
                                </div>
                            </Link>
                            {(currentUser.data && currentUser.data?.role === 'admin') ? <Button onClick={() => deleteAlcohol(alcohol._id)} color="red"> Delete </Button> : null}
                        </Card.Content>
                    </Card>
                ))
                }
            </Card.Group>
        </div >
    );
};
