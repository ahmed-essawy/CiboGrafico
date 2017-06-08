import { Component } from "@angular/core";
import { NavController, NavParams, Nav, Loading } from "ionic-angular";
import { Toast } from 'ionic-native';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Users } from "../../../providers/users";
import { Utilities } from "../../../providers/utilities";
import { MenuPage } from "../../menu/menu";
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    account: { username: string, password: string } = { username: "aa@gmail.com", password: "1234" };
    constructor(public navCtrl: NavController, private user: Users) { }
    doLogin() {
        Utilities.showLoader();
        this.user.login(this.account).then(res => this.success(res)).catch(err => this.failed(err));
    }
    doFbLogin() {
        Utilities.showLoader();
        this.user.fbLogin().then(res => this.success(res)).catch(err => this.failed(err));
    }
    success(response) {
        Utilities.hideLoader();
        Utilities.showToast("Login Successfully.", () => this.navCtrl.pop());
    }
    failed(response) {
        Utilities.hideLoader();
        Utilities.showToast("Login Failed.");
    }
}