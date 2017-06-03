import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from "@ionic-native/http";
import { RestaurantProfilePage} from "../RestaurantProfile/RestaurantProfile";

@Component({
    selector: 'page-RestaurantsList',
    templateUrl: 'RestaurantsList.html'
})
export class RestaurantsListPage {
   public restaurants:any;

   constructor(private http: HTTP, public navCtrl: NavController) {
       this.http.get("http://169.254.80.80:8888/Restaurants", {}, {})
            .then(data => {
                this.restaurants = JSON.parse(data.data).data;
                console.log(this.restaurants);
            })
            .catch(error => {
                console.log("error");
                console.log(error);
            });
    }
    details(restId) {
        this.navCtrl.push(RestaurantProfilePage, {Id: restId});
    }

}
