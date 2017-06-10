import { Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { reservationPage } from "../reservation/reservation"
import { TraditionalMenuPage } from "../traditionalMenu/traditionalMenu"
import { LoginTabs } from "../loginTabs/loginTabs";
import { Users } from "../../providers/users";
import { Sql } from "../../providers/sql";
import { Utilities } from "../../providers/utilities";
import { offerDetailsPage } from "../offerDetails/offerDetails";
@Component({
    selector: 'page-RestaurantProfile',
    templateUrl: 'RestaurantProfile.html'
})
export class RestaurantProfilePage {
    restaurant: any;
    isLogged: boolean;
    userId: any;
    comment: any;
    readonly: boolean;
    addedReviewBefore: boolean=false;
    date:any=new Date().toISOString();
    constructor(private navCtrl: NavController, private params: NavParams, private rest: Restaurants) {
        this.rest.read(params.get("Id")).then((resp1: PromiseResp) => {
            this.restaurant = resp1.response;
            Sql.selectOptions("_id").then(resp2=> {
                this.userId = resp2.response;
                this.addedReviewBefore = resp1.response.rates.find(rate => rate._id === resp2.response) ? true : false;
            }).catch(error2 => console.log(error2));
        }).catch(error1 => console.log(error1));
        Users.isLogged().then(isLogged => this.isLogged = isLogged);
        this.readonly = false; 
    }
    reserve(restId) {
        if (this.isLogged) this.navCtrl.push(reservationPage, { Id: restId });
        //else Utilities.loginAlert();
    }
    menu(restId) {
        this.navCtrl.push(TraditionalMenuPage, { Id: restId });
    }
    submit(data) {
        let obj = { "_id": this.userId, "comment": data.value.comment};
        this.rest.addReview({ "restaurant": this.params.get("Id"), "review": obj}).then((resp: PromiseResp) => {
                if (resp.success) {
                    Sql.selectOptions("firstName").then(resp1 => {
                            Sql.selectOptions("image").then(resp2 => {
                                const name = resp1.response;
                                const userImg = resp2.response;
                                this.restaurant.reviews.push({
                                    "_id": obj._id,
                                    "comment": obj.comment,
                                    "name": name,
                                    "userImg": userImg,
                                    "date": new Date().toISOString()
                                });
                            }).catch(err => console.log(err));
                        }).catch(err => console.log(err));      
                }
            }).catch(err => console.log(err));
        this.comment = "";
    }
    offerDetails(offer) {
        this.navCtrl.push(offerDetailsPage, { data: offer });
    }
    starClicked(value) {
        let object = { "_id": this.userId, "rate": value };
        this.rest.addRate({ "restaurant": this.params.get("Id"), "rate": object })
            .then((resp: PromiseResp) => {
                console.log(resp);
                this.readonly = true;
            }).catch(err => console.log(err));
    }
}
