import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Users } from "../../../providers/users";
import { Utilities } from "../../../providers/utilities";
@Component({
    selector: "page-signup",
    templateUrl: "signup.html"
})
export class SignupPage {
    account: { firstName: string, lastName: string, username: string, email: string, password: string, pasCheck: string } = { firstName: "", lastName: "", username: "", email: "", password: "", pasCheck: "" };
    // account: { firstName: string, lastName: string, username: string, email: string, password: string, pasCheck: string } = { firstName: "Ahmed", lastName: "El-Essawy", username: "aa", email: "aa@gmail.com", password: "1234", pasCheck: "1234" };
    constructor(private navCtrl: NavController, private user: Users) { }
    doSignUp() {
        Utilities.showLoader();
        if (this.account.password === this.account.pasCheck) {
            this.user.signup(this.account).then(res => {
                if (res.success) this.user.login(this.account).then(res => this.success(res)).catch(err => this.failed(err));
                else this.failed(res);
            }).catch(err => this.failed(err));
        } else this.failed(null);
    }
    doFbLogin() {
        Utilities.showLoader();
        this.user.fbLogin().then(res => this.success(res)).catch(err => this.failed(err));
    }
    success(response) {
        this.account.firstName = "";
        this.account.lastName = "";
        this.account.username = "";
        this.account.email = "";
        this.account.password = "";
        this.account.pasCheck = "";
        Utilities.hideLoader();
        Utilities.showToast("Sign Up Successfully.");
    }
    failed(response) {
        this.account.password = "";
        this.account.pasCheck = "";
        Utilities.hideLoader();
        Utilities.showToast("Sign Up Failed.");
    }
}