import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { Sql } from "../../providers/sql";
import { Users } from "../../providers/users";
import { MenuPage } from "../menu/menu";
import { LoginTabs } from "../loginTabs/loginTabs";
import { Utilities } from "../../providers/utilities";

import { FavoritesPage } from './favorites/favorites';
import { OrdersPage } from './orders/orders';

@Component({
    selector: 'page-account',
    templateUrl: 'account.html'
})
export class AccountPage {
    account: { _id: string, firstName: string, lastName: string, image: string, email: string, username: string, address: { street: string, city: string, country: string }, phones: any } = { _id: "", firstName: "", lastName: "", image: "", email: "", username: "", address: { street: "", city: "", country: "" }, phones: Array<string>() };
    button: string = "Edit";
    visible: boolean = true;
    tabs = "favorites";
    constructor(private navCtrl: NavController, private user: Users) {
        Utilities.showLoader();
        Users.isLogged().then(isLogged => {
            if (isLogged) {
                this.loadData()
                    .then(res => Utilities.hideLoader())
                    .catch(err => { navCtrl.pop(); Utilities.hideLoader(); Utilities.showToast("Failed to retrieve data.") });
            } else { navCtrl.setPages([MenuPage, LoginTabs]); Utilities.hideLoader(); }
        });
    }

    buttonToggle() {
        if (this.visible) {
            this.button = "Submit";
            this.visible = false;
        }
        else {
            Utilities.showLoader();
            this.user.updateUser(this.account).then(res => {
                if (res.success) {
                    this.account.phones = JSON.parse(this.account.phones);
                    this.loadData().then(res => {
                        this.button = "Edit";
                        this.visible = true;
                        Utilities.hideLoader();
                        Utilities.showToast("Update Info Successfully.");
                    }).catch(err => {
                        this.navCtrl.pop();
                        Utilities.hideLoader();
                        Utilities.showToast("Failed to retrieve data.");
                    });
                }
            }).catch(err => {
                this.loadData().then(res => {
                    this.button = "Edit";
                    this.visible = true;
                    Utilities.hideLoader();
                    Utilities.showToast("Update Info Failed.");
                });
            }).catch(err => {
                this.navCtrl.pop();
                Utilities.hideLoader();
                Utilities.showToast("Failed to retrieve data.");
            });
        }
    }
    doSignOut() {
        Sql.truncateOptions().then(resp => {
            Utilities.eventsCtrl.publish("User:Logout");
            this.navCtrl.pop();
            Utilities.showToast("Sign Out Successfully.");
        }).catch(err => Utilities.showToast("Sign Out Failed."));
    }
    doFbLogin() {
        Utilities.showLoader();
        this.user.fbLogin().then(res => this.success(res)).catch(err => this.failed(err));
    }
    success(response: any) {
        Utilities.hideLoader();
        Utilities.showToast("Facebook connected Successfully.");
    }
    failed(response: any) {
        Utilities.hideLoader();
        Utilities.showToast("Facebook connected Failed.");
    }
    async loadData() {
        await Sql.selectOptions("_id").then(res => this.account._id = res.response).catch(err => console.log(err));
        await Sql.selectOptions("firstName").then(res => this.account.firstName = res.response).catch(err => console.log(err));
        await Sql.selectOptions("lastName").then(res => this.account.lastName = res.response).catch(err => console.log(err));
        await Sql.selectOptions("image").then(res => this.account.image = res.response).catch(err => console.log(err));
        await Sql.selectOptions("email").then(res => this.account.email = res.response).catch(err => console.log(err));
        await Sql.selectOptions("username").then(res => this.account.username = res.response).catch(err => console.log(err));
        await Sql.selectOptions("address").then(res => this.account.address = JSON.parse(res.response)).catch(err => console.log(err));
        await Sql.selectOptions("phones").then(res => this.account.phones = JSON.parse(res.response)).catch(err => console.log(err));
    }
}