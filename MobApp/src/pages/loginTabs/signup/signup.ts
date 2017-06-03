import { Component } from "@angular/core";
import { NavController, NavParams, Nav, LoadingController } from "ionic-angular";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Users } from "../../../providers/users";
@Component({
    selector: "page-signup",
    templateUrl: "signup.html"
})
export class SignupPage {
    loader;
    account: { firstName: string, lastName: string, username: string, email: string, password: string };
    constructor(private navCtrl: NavController, loadingCtrl: LoadingController, private user: Users) {
        this.loader = loadingCtrl.create({ content: "Please wait...", });

    }
    doFbLogin() {
        typeof (this.loader)
        this.loader.present();
        this.user.fbLogin().then(this.loginResponse);
    }
    loginResponse(response) {
        console.log(response);
        this.loader.dismiss();
        this.navCtrl.pop();
    }
}