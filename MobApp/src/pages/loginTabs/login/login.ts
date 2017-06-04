import { Component } from "@angular/core";
import { NavController, NavParams, Nav, LoadingController, Loading } from "ionic-angular";
import { Toast } from 'ionic-native';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Users } from "../../../providers/users";
import { MenuPage } from "../../menu/menu";
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    loader: Loading;
    account: { username: string, password: string } = { username: "dd@gmail.com", password: "1234" };
    constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private user: Users) { }
    doLogin() {
        this.showLoader();
        this.user.login(this.account).then(res => this.success(res)).catch(err => this.failed(err));
    }
    doFbLogin() {
        this.showLoader();
        this.user.fbLogin().then(res => this.success(res)).catch(err => this.failed(err));
    }
    success(response) {
        console.log(response);
        this.hideLoader();
        //Toast.show("Login Successfully", "short", "bottom");
        console.log(this.navCtrl);
        console.log(this.navCtrl.getPrevious());
        this.navCtrl.getPrevious();
    }
    failed(response) {
        console.log(response);
        this.hideLoader();
        Toast.show("Invalid Login Data", "short", "bottom")
    }
    showLoader() {
        this.loader = this.loadingCtrl.create({ content: "Please wait...", });
        this.loader.present();
    }
    hideLoader() { this.loader.dismiss(); }
}