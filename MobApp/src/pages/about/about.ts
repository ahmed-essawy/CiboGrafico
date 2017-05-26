import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HTTP } from "@ionic-native/http";
@Component({
    selector: "page-about",
    templateUrl: "about.html"
})
export class AboutPage {
    constructor(private http: HTTP) {
        this.http.get("http://192.168.1.104:8888/Restaurants", {}, {})
            .then(data => {
                console.log("data");
                console.log(data);
            })
            .catch(error => {
                console.log("error");
                console.log(error);
            });
    }
}