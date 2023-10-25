import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import { Button, Header, Label, Form as SemanticForm, Icon } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import './RegisterForm.css';
import { Link } from "react-router-dom";
import { UserRegisterFormValues } from "../../app/models/user";
import { useRegisterMutation } from "../../hooks/api/accounts/userRegisterMutation";
import { router } from "../../app/router/Routes";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});

export default function LoginForm() {
    const registerMutation = useRegisterMutation();

    const handleRegisterSubmit = async (values: UserRegisterFormValues) => {
        try {
            registerMutation.mutate(values);
            router.navigate('/alcohols');
        } catch (error) {
            console.log(error);
            // Handle login error
        }
    }

    return (
        <div className="registration-container">
            <Header as="h1" color="teal" textAlign="center">
                <Icon name='glass martini' className="icon-login" />
            </Header>
            <Header as="h2" color="teal" textAlign="center">
                Create an account on alcohol world
            </Header>
            <Formik
                initialValues={{ name: '', email: '', password: '', passwordConfirm: '', error: null }}
                validationSchema={validationSchema}
                // onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error: 'Invalid email or password' }))}
                onSubmit={handleRegisterSubmit}
            >
                <Form className='ui form' autoComplete='off'>
                    <SemanticForm.Field>
                        <label>Name</label>
                        <MyTextInput name='name' placeholder='Name' />
                    </SemanticForm.Field>
                    <SemanticForm.Field>
                        <label>Email</label>
                        <MyTextInput name='email' placeholder='Email' />
                    </SemanticForm.Field>
                    <SemanticForm.Field>
                        <label>Password</label>
                    </SemanticForm.Field>
                    <SemanticForm.Field>
                        <MyTextInput name='password' placeholder="Password" type='password' />
                    </SemanticForm.Field>
                    <SemanticForm.Field>
                        <label>Password Confirmation</label>
                    </SemanticForm.Field>
                    <SemanticForm.Field>
                        <MyTextInput name='passwordConfirm' placeholder="Confirm Password" type='password' />
                    </SemanticForm.Field>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button positive content='Register' type='submit' fluid />
                    </div>
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: 10 }} basic color="red" />}
                    />
                </Form>
            </Formik>
            <div className="create-account-text">
                <p>Already have an account? <Link to={`/login`} key={'sign_in_button'} className="create-account-link">Sign in</Link></p>
            </div>
        </div>)
}
