import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Button, Header, Form as SemanticForm } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import './LoginForm.css';
import { UserForgetPasswordFormValues } from "../../app/models/user";
import { useForgetPasswordMutation } from "../../hooks/api/accounts/useForgetPasswordMutation";
import { router } from "../../app/router/Routes";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address')
});

export default function ForgetPasswordForm() {
    const forgetPasswordMutation = useForgetPasswordMutation();

    const handleForgetPasswordSubmit = async (values: UserForgetPasswordFormValues) => {
        try {
            forgetPasswordMutation.mutate(values);
            router.navigate('/forgotPasswordIns');
        } catch (error) {
            console.log(error);
            // Handle login error
        }
    }
    return (
        <div className="login-container">
            <Header as="h2" color="teal" textAlign="center">
                Forget password to the alcohol world?
            </Header>
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                validationSchema={validationSchema}
                // onSubmit={(values, { setErrors }) =>
                //     userStore.login(values).catch(error => setErrors({ error: 'Invalid email or password' }))
                // }
                onSubmit={handleForgetPasswordSubmit}
            >
                <Form className='ui form' autoComplete='off'>
                    <SemanticForm.Field>
                        <label>Email</label>
                        <MyTextInput name='email' placeholder='Email' />
                    </SemanticForm.Field>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button positive content='Submit' type='submit' fluid />
                    </div>
                </Form>
            </Formik>

        </div>
    )
}
