import { Card, Button, Icon, Image, Rating } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useAlcoholsQuery } from '../../hooks/api/alcohols/useAlcoholsQuery';
import { Alcohol } from '../../app/models/alcohol';
import './AlcoholsTable.css';
import ErrorPage from '../errors/ErrorPage';

export default function AlcoholsTable() {
    const alcoholsQuery = useAlcoholsQuery();

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

    return (
        <Card.Group>
            {alcoholsQuery.data?.alcohols.map((alcohol: Alcohol) => (
                <Card key={alcohol._id}>
                    <Link to={`/alcohols/${alcohol._id}`}>
                        <Card>
                            <Card.Content>
                                <Card.Header>{alcohol.name}</Card.Header>
                                <Card.Meta>Type: {alcohol.type}</Card.Meta>
                                <Image src={'../../../public/image/hibiki-harmony.jpg'} alt={alcohol.name} className="alcohol-image" />
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
                        {
                            //TODO
                            //ERROR Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>. 
                        }
                        <Link to={`/reviewDetails/${alcohol._id}`}>
                            <div className="ui buttons">
                                <Button basic color="blue">
                                    <Icon name="edit" /> Review
                                </Button>
                            </div>
                        </Link>
                    </Card.Content>
                </Card>
            ))
            }
        </Card.Group >
    );
};
