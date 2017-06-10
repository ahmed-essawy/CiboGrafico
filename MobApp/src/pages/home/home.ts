import { Component } from "@angular/core";
import { AlertController, NavController } from "ionic-angular";
import { GoogleMap, LatLng } from "@ionic-native/google-maps";
import { Utilities } from "../../providers/utilities";
import { Users } from "../../providers/users";
import { LoginTabs } from "../loginTabs/loginTabs";
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    isLogged: boolean;
    constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
        Users.isLogged().then(isLogged => this.isLogged = isLogged);
        Utilities.eventsCtrl.subscribe("User:Login", res => this.isLogged = true);
        Utilities.eventsCtrl.subscribe("User:Logout", res => this.isLogged = false);
        new GoogleMap("map").getMyLocation().then(l => this.latLngUsage(l.latLng)).catch(err => console.log(`Error: ${err}`));
    }
    latLngUsage(pos: LatLng) {
        this.alertCtrl.create({
            title: "Position detected!",
            subTitle: `Your Position is ${pos}`,
            buttons: ["OK"]
        }).present();
    }
    loginModal() { this.navCtrl.push(LoginTabs); }
}