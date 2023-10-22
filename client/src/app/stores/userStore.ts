import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserForgetPasswordFormValues, UserFormValues, UserRegisterFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    // login = async (creds: UserFormValues) => {
    //     try {
    //         const response = await agent.Account.login(creds);
    //         const user = response.data;
    //         window.localStorage.setItem('jwt', user.token);
    //         runInAction(() => this.user = user);
    //         router.navigate('/alcohols');
    //     } catch (error) {
    //         console.log('ERROR ', error.response.data)
    //         throw error;
    //     }
    // }

    register = async (creds: UserRegisterFormValues) => {
        try {
            const response = await agent.Account.register(creds);
            const user = response.data;
            window.localStorage.setItem('jwt', user.token);
            runInAction(() => this.user = user);
            router.navigate('/alcohols');
        } catch (error) {
            console.log('ERROR ', error.response.data)
            throw error;
        }
    }

    forgetPassword = async (creds: UserForgetPasswordFormValues) => {
        try {
            const response = await agent.Account.forgotPassword(creds);
            const user = response.data;
        } catch (error) {
            console.log('ERROR ', error.response.data)
            throw error;
        }
    }

    // logout = () => {
    //     store.commonStore.setToken(null);
    //     window.localStorage.removeItem('jwt');
    //     this.user = null;
    // }

    // getUser = async () => {
    //     try {
    //         const user = await agent.Account.current();
    //         runInAction(() => this.user = user);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

}