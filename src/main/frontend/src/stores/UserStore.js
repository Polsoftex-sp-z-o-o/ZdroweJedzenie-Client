import { extendObservable } from 'mobx';
import { runInAction} from "mobx"


class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            
            email: '',
            firstName: '',
            lastName: '',
            token: null

        })
    }

    refresh(){
        this.isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
        this.email = sessionStorage.getItem("email");
        this.firstName = sessionStorage.getItem("firstName");
        this.lastName = sessionStorage.getItem("lastName");
        this.token = sessionStorage.getItem("token");

        console.log("refresh user store")
    }

    save(){
        sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
        sessionStorage.setItem("email", this.email);
        sessionStorage.setItem("firstName", this.firstName);
        sessionStorage.setItem("lastName", this.lastName);
        sessionStorage.setItem("token", this.token);

        console.log("save user store")
    }

    clear(){
        runInAction(() => {
            UserStore.isLoggedIn = false;
            UserStore.email = '';
            UserStore.firstName = '';
            UserStore.lastName = '';
            UserStore.token = null;
        })

        sessionStorage.setItem("isLoggedIn", false);
        sessionStorage.setItem("email", '');
        sessionStorage.setItem("firstName", '');
        sessionStorage.setItem("lastName", '');
        sessionStorage.setItem("token", null);

        console.log("clear user store")
    }
}

export default new UserStore();
