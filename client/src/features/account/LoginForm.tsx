import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Button, Header, Form as SemanticForm, Message, Icon } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import './LoginForm.css';
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../hooks/api/accounts/useLoginMutation";
import { UserFormValues } from "../../app/models/user";
import { router } from "../../app/router/Routes";
import ErrorPage from "../errors/ErrorPage";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/api/users/useCurrentUser";

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
    const [errorLogin, setErrorLogin] = useState(false);

    const handleLoginSubmit = async (values: UserFormValues) => {
        try {
            const response = await loginMutation.mutateAsync(values);

            if (response) {
                router.navigate('/alcohols');
            }

            setErrorLogin(false);

        } catch (error) {
            console.error('Error in handleLoginSubmit:', error);
            setErrorLogin(true);
        }
    }

    return (
        <div className="login-container">
            <Header as="h1" color="teal" textAlign="center">
                <Icon name='glass martini' className="icon-login" />
            </Header>
            <Header as="h2" color="teal" textAlign="center">
                Sign in to alcohol world
            </Header>
            {errorLogin ? (
                <Message negative>
                    <Message.Header>Unauthorized</Message.Header>
                    <p>Incorrect email or password</p>
                </Message>
            ) : null}
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                validationSchema={validationSchema}
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
