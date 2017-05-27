import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from
    "@ionic-native/google-maps";
@Component({
    selector: "page-location",
    templateUrl: "location.html"
})
export class LocationPage {
    constructor(private platform: Platform, private googleMaps: GoogleMaps) {
        platform.ready().then(() => {
            new GoogleMap("map").getMyLocation().then(l => this.latLngUsage(l.latLng)).catch(err => console.log(`Error: ${err}`));
        }).catch(err => console.log(`Error: ${err}`));
    }
    latLngUsage(pos: LatLng) { console.log(pos); }
}