import { Component } from "@angular/core";
import { AlertController, ModalController, NavController } from "ionic-angular";
import { GoogleMap, LatLng } from "@ionic-native/google-maps";
import { LoginTabs } from "../loginTabs/loginTabs";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Users } from "../../providers/users";
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    isLogged: boolean;
    constructor(private navCtrl: NavController, private user: Users, private alertCtrl: AlertController, private modalCtrl: ModalController) {
        this.isLogged = this.user.isLogged;
        new GoogleMap("map").getMyLocation().then(l => this.latLngUsage(l.latLng)).catch(err => console.log(`Error: ${err}`));
    }
    latLngUsage(pos: LatLng) {
        this.alertCtrl.create({
            title: "Position detected!", subTitle: `Your Position is ${pos}`,
            buttons: ["OK"]
        }).present();
    }
    loginModal() { this.navCtrl.push(LoginTabs); }
}