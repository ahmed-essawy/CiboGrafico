import { Component } from "@angular/core";
import { AlertController, NavController } from "ionic-angular";
import { GoogleMap, GoogleMaps, LatLng, GoogleMapsEvent, Marker, CameraPosition, MarkerOptions } from "@ionic-native/google-maps";
import { Utilities } from "../../providers/utilities";
import { Users } from "../../providers/users";
import { Offers } from "../../providers/offers";
import { LoginTabs } from "../loginTabs/loginTabs";
import { RestaurantsListPage } from "../RestaurantsList/RestaurantsList";
import { OffersPage } from "../offers/offers";
import { offerDetailsPage } from "../offerDetails/offerDetails";
import { AccountPage } from "../account/account";
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage {
    isLogged: boolean;
    offers: any;
    constructor(private navCtrl: NavController, offer: Offers, private googleMaps: GoogleMaps) {
        offer.readAll().then(resp => this.offers = resp.response).catch(err => this.offers = false);
        Users.isLogged().then(isLogged => this.isLogged = isLogged);
        Utilities.eventsCtrl.subscribe("User:Login", res => this.isLogged = true);
        Utilities.eventsCtrl.subscribe("User:Logout", res => this.isLogged = false);
    }
    ngAfterViewInit() {
        // new GoogleMap("map").getMyLocation().then(l => this.loadMap(l.latLng)).catch(err => console.log(`Error: ${err}`));
    }
    loadMap(pos: LatLng) {
        let map: GoogleMap = this.googleMaps.create(document.getElementById('map'));
        map.one(GoogleMapsEvent.MAP_READY).then(() => {
            console.log('Map is ready!');
            map.moveCamera(position).then(() => map.addMarker(markerOptions).then((marker: Marker) => marker.showInfoWindow()));
        });
        let position: CameraPosition = {
            target: pos,
            zoom: 15,
            tilt: 30
        };
        let markerOptions: MarkerOptions = {
            position: pos,
        };
    }
    loginModal() { this.navCtrl.push(LoginTabs); }
    openPage(page: string) {
        switch (page) {
            case "restaurants":
                this.navCtrl.push(RestaurantsListPage);
                break;
            case "offers":
                this.navCtrl.push(OffersPage);
                break;
            case "login":
                if (this.isLogged) this.navCtrl.push(AccountPage);
                else this.navCtrl.push(LoginTabs);
                break;
        }
    }
    offerDetails(offer: any) { this.navCtrl.push(offerDetailsPage, { Id: offer._id }); }
}