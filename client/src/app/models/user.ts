export interface User {
    _id: string
    name: string
    email: string
    role: string
    token: string
}

export interface UserFormValues {
    email: string
    password: string
}

export interface UserRegisterFormValues {
    name: string
    email: string
    password: string
    passwordConfirm: string
}

export interface UserForgetPasswordFormValues {
    email: string
}

export interface UserResetPasswordFormValues {
    password: string
    passwordConfirm: string
}
