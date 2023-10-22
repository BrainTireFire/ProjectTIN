import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Button, Header, Form as SemanticForm } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import './LoginForm.css';
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../hooks/api/accounts/useLoginMutation";
import { UserFormValues } from "../../app/models/user";
import { router } from "../../app/router/Routes";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

export default function LoginForm() {
    const loginMutation = useLoginMutation();

    const handleLoginSubmit = async (values: UserFormValues) => {
        try {
            loginMutation.mutate(values);
            router.navigate('/alcohols');
            // if (loginMutation.isSuccess) {
            //     router.navigate('/alcohols');
            // }

        } catch (error) {
            console.log(error);
            // Handle login error
        }
    }

    return (
        <div className="login-container">
            <Header as="h2" color="teal" textAlign="center">
                Sign in to alcohol world
            </Header>
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                validationSchema={validationSchema}
                // onSubmit={(values, { setErrors }) =>
                //     userStore.login(values).catch(error => setErrors({ error: 'Invalid email or password' }))
                // }
                onSubmit={handleLoginSubmit}
            >
                <Form className='ui form' autoComplete='off'>
                    <SemanticForm.Field>
                        <label>Email</label>
                        <MyTextInput name='email' placeholder='Email' />
                    </SemanticForm.Field>
                    <SemanticForm.Group>
                        <SemanticForm.Field style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>Password</label>
                        </SemanticForm.Field>
                        <SemanticForm.Field>
                            <Link to={`/forgotPassword`} key={'forgot_password_button'} className="forgot-password-link" style={{ marginLeft: '179px' }}> Forgot password?</Link>
                        </SemanticForm.Field>
                    </SemanticForm.Group>
                    <SemanticForm.Field style={{ marginTop: '-14px' }}>
                        <MyTextInput name='password' placeholder="Password" type='password' />
                    </SemanticForm.Field>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button positive content='Login' type='submit' fluid />
                    </div>
                </Form>
            </Formik>
            <div className="create-account-text">
                <p>New to GitHub? <Link to={`/register`} key={'create_an_account_button'} className="create-account-link">Create an account</Link> </p>
            </div>
        </div>
    )
}
