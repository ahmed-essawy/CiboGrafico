import { Component } from "@angular/core";
import { Users } from "../../../providers/users";
import { Utilities } from "../../../providers/utilities";
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    account: { username: string, password: string } = { username: "", password: "" };
    //account: { username: string, password: string } = { username: "ahm.elessawy@gmail.com", password: "1234" };
    constructor(private user: Users) {}
    doLogin() {
        Utilities.showLoader();
        this.user.login(this.account).then(res => this.success(res)).catch(err => this.failed(err));
    }
    doFbLogin() {
        Utilities.showLoader();
        this.user.fbLogin().then(res => this.success(res)).catch(err => this.failed(err));
    }
    success(response: any) {
        Utilities.hideLoader();
        Utilities.showToast("Login Successfully.");
    }
    failed(response: any) {
        Utilities.hideLoader();
        Utilities.showToast("Login Failed.");
    }
}