import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { MenuPage } from "../menu/menu";
import { LoginTabs } from "../loginTabs/loginTabs";
import { Users } from "../../providers/users";
@Component({
    selector: "page-account",
    templateUrl: "account.html"
})
export class AccountPage {
    constructor(private navCtrl: NavController, private user: Users) {
        console.log(this.user.isLogged)
        if (!this.user.isLogged) { navCtrl.setRoot(MenuPage); navCtrl.push(LoginTabs) }
    }
}