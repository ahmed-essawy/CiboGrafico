import { Component } from "@angular/core";
import { NavController, NavParams, Nav } from "ionic-angular";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Users } from "../../providers/users";
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    account: { username: string, password: string } = { username: "dd@gmail.com", password: "1234" };
    constructor(private navCtrl: NavController, private user: Users) {}
    doLogin() { this.user.login(this.account, (data: any) => console.log(data)); }
    doFbLogin() { this.user.fbLogin((data: any) => console.log(data)); }
}