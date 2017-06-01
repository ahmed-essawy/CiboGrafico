import { Component } from "@angular/core";
import { AlertController, ModalController, NavController } from "ionic-angular";
import { GoogleMap, LatLng } from "@ionic-native/google-maps";
import { LoginPage } from "../login/login";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private modalCtrl: ModalController,
                private fb: Facebook) {
        new GoogleMap("map").getMyLocation().then(l => this.latLngUsage(l.latLng)).catch(err => console
            .log(`Error: ${err}`));
    }
    latLngUsage(pos: LatLng) {
        this.alertCtrl.create({
            title: "Position detected!", subTitle: `Your Position is ${pos}`,
            buttons: ["OK"]
        }).present();
    }
    fbConnect() {
        this.fb.login(["public_profile", "user_friends", "email"]).then((res: FacebookLoginResponse) => {
            console.log("Logged into Facebook!", res);
            this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
        }).catch(e => console.log("Error logging into Facebook", e));
    }
    loginModal() { this.navCtrl.push(LoginPage); }
    onLink(url: string) { window.open(url); }
}