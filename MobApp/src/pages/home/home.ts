import { Component } from "@angular/core";
import { AlertController, NavController } from "ionic-angular";
import { GoogleMap, GoogleMaps, LatLng, GoogleMapsEvent, Marker, CameraPosition, MarkerOptions } from "@ionic-native/google-maps";
import { Utilities } from "../../providers/utilities";
import { Users } from "../../providers/users";
import { LoginTabs } from "../loginTabs/loginTabs";
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    isLogged: boolean;
    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private googleMaps: GoogleMaps) {
        Users.isLogged().then(isLogged => this.isLogged = isLogged);
        Utilities.eventsCtrl.subscribe("User:Login", res => this.isLogged = true);
        Utilities.eventsCtrl.subscribe("User:Logout", res => this.isLogged = false);
    }
    ngAfterViewInit() {
        //new GoogleMap("map").getMyLocation().then(l => this.loadMap(l.latLng)).catch(err => console.log(`Error: ${err}`));
    }
    loadMap(pos: LatLng) {
        let element: HTMLElement = document.getElementById('map');
        let map: GoogleMap = this.googleMaps.create(element);
        // listen to MAP_READY event
        // You must wait for this event to fire before adding something to the map or modifying it in anyway
        map.one(GoogleMapsEvent.MAP_READY).then(() => {
            console.log('Map is ready!');
            map.moveCamera(position).then(() => {
                console.log(position)
                map.addMarker(markerOptions).then((marker: Marker) => {
                    marker.showInfoWindow();
                });
            })

            // Now you can add elements to the map like the marker
        });

        // create CameraPosition
        let position: CameraPosition = {
            target: pos,
            zoom: 15,
            tilt: 30
        };

        // create new marker
        let markerOptions: MarkerOptions = {
            position: pos,
        };
        map.addMarker(markerOptions)
            .then((marker: Marker) => {
                marker.showInfoWindow();
            });

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