import { Component } from "@angular/core";
import { AlertController } from "ionic-angular";
import { GoogleMap, LatLng } from "@ionic-native/google-maps";
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    constructor(private alertCtrl: AlertController) {
        new GoogleMap("map").getMyLocation().then(l => this.latLngUsage(l.latLng)).catch(err => console
            .log(`Error: ${err}`));
    }
    latLngUsage(pos: LatLng) {
        this.alertCtrl.create({
            title: "Position detected!", subTitle: `Your Position is ${pos}`,
            buttons: ["OK"]
        }).present();
    }
    onLink(url: string) { window.open(url); }
}