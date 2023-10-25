import { Form, Formik } from 'formik';
import { Button, Form as SemanticForm, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import './ReviewForm.css';
import { useAddReviewWithAlcoholMutation } from '../../hooks/api/reviews/userAddReviewsAlcoholDataMutation';
import { router } from '../../app/router/Routes';
import { useParams } from 'react-router-dom';
import { useAlcoholDetailsQuery } from '../../hooks/api/alcohols/useAlcoholDetailsQuery';

const validationSchema = Yup.object().shape({
    rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be at least 1')
        .max(10, 'Rating can be at most 10'),
    comment: Yup.string()
        .required('Comment is required'),
});

export default function ReviewForm() {
    const { id } = useParams<{ id: string }>();
    const ids = id?.split('and');
    const addReviewWithAlcohol = useAddReviewWithAlcoholMutation();

    const handleAddReviewAlcoholSubmit = async (values) => {
        if (!ids || !Array.isArray(ids) || ids.length < 2) {
            console.error('Error: Invalid ids');
            return;
        }
        try {
            const { rating, comment } = values;
            const data = {
                rating,
                comment,
                alcoholId: ids[0],
                user: ids[1]
            };
            addReviewWithAlcohol.mutate(data);
            router.navigate(`/reviewDetails/${ids[0]}and${ids[1]}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="review-container">
            <Header as="h2" color="teal" textAlign="center">
                Add Review
            </Header>
            <Formik
                initialValues={{ rating: '', comment: '' }}
                validationSchema={validationSchema}
                onSubmit={handleAddReviewAlcoholSubmit}
            >
                <Form className='ui form' autoComplete='off'>
                    <SemanticForm.Field>
                        <label>Rating</label>
                        <MyTextInput name='rating' type='number' placeholder='Rating (1-10)' />
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                        <label>Comment</label>
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                        <MyTextInput name='comment' placeholder="comment" />
                    </SemanticForm.Field>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button positive content='Create review' type='submit' fluid />
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
