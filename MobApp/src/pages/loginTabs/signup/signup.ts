import { Component } from "@angular/core";
import { NavController, NavParams, Nav, LoadingController } from "ionic-angular";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Users } from "../../../providers/users";
@Component({
    selector: "page-signup",
    templateUrl: "signup.html"
})
export class SignupPage {
    loader: any;
    account: { firstName: string, lastName: string, username: string, email: string, password: string, pasCheck: string
    };
    constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private user: Users) {
        this.account = { firstName: "Ahmed", lastName: "Mohamed", username: "ahmed", email: "dd@gmail.com",
            password: "1234", pasCheck: "1234" };
    }
    doSignUp() {
        this.showLoader();
        if (this.account.password === this.account.pasCheck) {
            this.user.signup(this.account).then(res => {
                if (res.success)
                    this.user.login(this.account).then(res => this.success(res)).catch(err => this.failed(err));
                else this.failed(res);
            }).catch(err => this.failed(err));
        } else this.failed(null);
    }
    doFbLogin() {
        this.showLoader();
        this.user.fbLogin().then(res => this.success(res)).catch(err => this.failed(err));
    }
    success(response: any) {
        this.account.firstName = "";
        this.account.lastName = "";
        this.account.username = "";
        this.account.email = "";
        this.account.password = "";
        this.account.pasCheck = "";
        this.hideLoader();
    }
    failed(response: any) {
        this.account.password = "";
        this.account.pasCheck = "";
        this.hideLoader();
    }
    showLoader() {
        this.loader = this.loadingCtrl.create({ content: "Please wait...", });
        this.loader.present();
    }
    hideLoader() { this.loader.dismiss(); }
}