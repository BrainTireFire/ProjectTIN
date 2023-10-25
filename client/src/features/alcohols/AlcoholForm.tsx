import { Form, Formik } from 'formik';
import { Button, Dropdown, Form as SemanticForm, Header } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import './AlcoholForm.css';
import { router } from '../../app/router/Routes';
import { useParams } from 'react-router-dom';
import { useAlcoholCreate } from '../../hooks/api/alcohols/useAlcoholCreate';

const typeOptions = [
    { key: 'whiskey', text: 'Whiskey', value: 'Whiskey' },
    { key: 'vodka', text: 'Vodka', value: 'Vodka' },
    { key: 'rum', text: 'Rum', value: 'Rum' },
    { key: 'gin', text: 'Gin', value: 'Gin' },
    { key: 'tequila', text: 'Tequila', value: 'Tequila' },
    { key: 'brandy', text: 'Brandy', value: 'Brandy' },
    { key: 'wine', text: 'Wine', value: 'Wine' },
    { key: 'beer', text: 'Beer', value: 'Beer' },
    { key: 'cider', text: 'Cider', value: 'Cider' },
    { key: 'sake', text: 'Sake', value: 'Sake' },
];

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    // image: Yup.string().url('Image URL must be a valid URL'),
    type: Yup.string().required('Type is required'),
    alcohol_percentage: Yup.number()
        .required('Alcohol Percentage is required')
        .min(0, 'Alcohol Percentage must be at least 0')
        .max(100, 'Alcohol Percentage can be at most 100'),
    age: Yup.number().required('Age is required'),
    price: Yup.number().required('Price is required'),
});

export default function AlcoholForm() {
    const addCreateAlcohol = useAlcoholCreate();

    const handleAddAlcoholSubmit = async (values) => {
        try {
            const response = await addCreateAlcohol.mutateAsync(values);
            router.navigate(`/alcohols`);
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
                initialValues={{ name: '', description: '', image: '', type: '', alcohol_percentage: '', age: '', price: '' }}
                validationSchema={validationSchema}
                onSubmit={handleAddAlcoholSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className='ui form' autoComplete='off'>
                        <SemanticForm.Field>
                            <label>Name</label>
                            <MyTextInput name='name' placeholder='Product Name' />
                        </SemanticForm.Field>

                        <SemanticForm.Field>
                            <label>Description</label>
                            <MyTextInput name='description' placeholder='Product Description' />
                        </SemanticForm.Field>

                        <SemanticForm.Field>
                            <label>Image URL</label>
                            <MyTextInput name='image' placeholder='Image URL' />
                        </SemanticForm.Field>

                        <SemanticForm.Field>
                            <label>Type</label>
                            <Dropdown name='type' placeholder='Product Type' selection
                                options={typeOptions}
                                value={values.type}
                                onChange={(_, { value }) => setFieldValue('type', value)}
                            />
                        </SemanticForm.Field>

                        <SemanticForm.Field>
                            <label>Alcohol Percentage</label>
                            <MyTextInput name='alcohol_percentage' type='number' placeholder='Alcohol Percentage' />
                        </SemanticForm.Field>

                        <SemanticForm.Field>
                            <label>Age</label>
                            <MyTextInput name='age' type='number' placeholder='Age' />
                        </SemanticForm.Field>

                        <SemanticForm.Field>
                            <label>Price</label>
                            <MyTextInput name='price' type='number' placeholder='Price' />
                        </SemanticForm.Field>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button positive content='Create alcohol' type='submit' fluid />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
