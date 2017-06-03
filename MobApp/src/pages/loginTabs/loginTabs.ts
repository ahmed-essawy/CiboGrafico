import { Component } from "@angular/core";
import { NavController, NavParams, Nav } from "ionic-angular";
import { LoginPage } from "./login/login";
import { SignupPage } from "./signup/signup";
@Component({
    selector: "page-loginTabs",
    templateUrl: "loginTabs.html"
})
export class LoginTabs {
    signin = LoginPage;
    signup = SignupPage;
    constructor() { }
}