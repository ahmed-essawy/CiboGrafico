import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { Sql } from "../../providers/sql";
import { Users } from "../../providers/users";
import { MenuPage } from "../menu/menu";
import { LoginTabs } from "../loginTabs/loginTabs";
import { Utilities } from "../../providers/utilities";

import { FavoritesPage } from './favorites/favorites';
import { OrdersPage } from './orders/orders';
import { Orders } from "../../providers/orders";

@Component({
    selector: 'page-account',
    templateUrl: 'account.html'
})
export class AccountPage {
    tab1Root: any = FavoritesPage;
    tab2Root: any = OrdersPage;
    account: { _id: string, firstName: string, lastName: string, image: string, email: string, username: string, address: { street: string, city: string, country: string }, phones: string[] } = { _id: "", firstName: "", lastName: "", image: "", email: "", username: "", address: { street: "", city: "", country: "" }, phones: Array<string>() };
    button: string = "Edit";
    visible: boolean = true;
    segment;
    constructor(private navCtrl: NavController, private user: Users) {
        Users.isLogged().then(isLogged => {
            if (!isLogged) { navCtrl.setRoot(MenuPage); navCtrl.push(LoginTabs) }
        });
        Sql.selectOptions("_id").then(res => this.account._id = res.response).catch(err => console.log(err));
        Sql.selectOptions("firstName").then(res => this.account.firstName = res.response).catch(err => console.log(err));
        Sql.selectOptions("lastName").then(res => this.account.lastName = res.response).catch(err => console.log(err));
        Sql.selectOptions("image").then(res => this.account.image = res.response).catch(err => console.log(err));
        Sql.selectOptions("email").then(res => this.account.email = res.response).catch(err => console.log(err));
        Sql.selectOptions("username").then(res => this.account.username = res.response).catch(err => console.log(err));
        Sql.selectOptions("address").then(res => this.account.address = JSON.parse(res.response)).catch(err => console.log(err));
        Sql.selectOptions("phones").then(res => this.account.username = res.response).catch(err => console.log(err));
        this.segment = "favorites";
    }

    buttonToggle() {
        if (this.visible) {
            this.button = "Submit";
            this.visible = false;
        }
        else {
            this.user.updateUser(this.account).then(res => {
                console.log(res)
                this.button = "Edit";
                this.visible = true;
            }).catch(err => console.log(err));
        }
    }
    doSignOut() {
        Sql.truncateOptions().then(resp => {
            Utilities.eventsCtrl.publish("User:Logout");
            this.navCtrl.pop();
        }).catch(err => console.log(err));
    }
    doFbLogin() {
        this.user.fbLogin().then(res => this.success(res)).catch(err => this.failed(err));
    }
    success(response) {
        console.log(response);
    }
    failed(response) {
        console.log(response);
    }
}