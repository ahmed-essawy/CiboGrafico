import { Component } from "@angular/core";
import { LoginPage } from "./login/login";
import { SignupPage } from "./signup/signup";
import { NavController } from "ionic-angular";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: "page-loginTabs",
    templateUrl: "loginTabs.html"
})
export class LoginTabs {
    signin = LoginPage;
    signup = SignupPage;
    constructor(navCtrl: NavController) {
        Utilities.eventsCtrl.subscribe("User:Login", res => {
            navCtrl.pop();
            Utilities.eventsCtrl.unsubscribe("User:Login");
        });
    }
}