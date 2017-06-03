import { Component } from "@angular/core";
import { NavController, NavParams, Nav, LoadingController } from "ionic-angular";
import { Toast } from 'ionic-native';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Users } from "../../../providers/users";
import { MenuPage } from "../../menu/menu";
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    loader;
    account: { username: string, password: string } = { username: "dd@gmail.com", password: "1234" };
    constructor(private navCtrl: NavController, loadingCtrl: LoadingController, private user: Users) {
        this.loader = loadingCtrl.create({ content: "Please wait...", });
    }
    doLogin() {
        this.loader.present();
        this.user.login(this.account).then(res => this.loginDone(res)).catch(err => this.loginFailed(err));
    }
    doFbLogin() {
        this.loader.present();
        this.user.fbLogin().then(res => this.loginDone(res)).catch(err => this.loginFailed(err));
    }
    loginDone(response: boolean) {
        this.loader.dismiss();
        //Toast.show("Login Successfully", "short", "bottom");
        this.navCtrl.setRoot(MenuPage);
    }
    loginFailed(response: boolean) {
        this.loader.dismiss();
        //Toast.show("Invalid Login Data", "short", "bottom")
    }
}