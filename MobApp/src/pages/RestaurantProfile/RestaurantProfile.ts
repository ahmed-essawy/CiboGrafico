import { Component, Input} from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { reservationPage } from "../reservation/reservation"
import { TraditionalMenuPage } from "../traditionalMenu/traditionalMenu"
import { LoginTabs } from "../loginTabs/loginTabs";
import { Users } from "../../providers/users";
import { Sql } from "../../providers/sql";
import { Utilities } from "../../providers/utilities";
import { offerDetailsPage } from "../offerDetails/offerDetails";
@Component({
    selector: "page-RestaurantProfile",
    templateUrl: "RestaurantProfile.html"
})
export class RestaurantProfilePage {
    restaurant: any;
    isLogged: boolean;
    userId: any;
    comment: any;
    readonly: boolean;
    addedReviewBefore=false;
    date: any=new Date().toISOString();
    constructor(private navCtrl: NavController, private params: NavParams, private rest: Restaurants) {
        this.rest.read(params.get("Id")).then((resp1: PromiseResp) => {
            this.restaurant = resp1.response;
            Sql.selectOptions("_id").then(resp2 => {
                this.userId = resp2.response;
                this.addedReviewBefore = resp1.response.rates.find(rate => rate._id === resp2.response) ? true : false;
            }).catch(error2 => console.log(error2));
        }).catch(error1 => console.log(error1));
        Users.isLogged().then(isLogged => this.isLogged = isLogged);
        this.readonly = false;
        Utilities.eventsCtrl.subscribe("User:Login", res => { this.isLogged = true });
        Utilities.eventsCtrl.subscribe("User:Logout", res => { this.isLogged = false });
    }
    reserve(restId: any) {
        if (this.isLogged) this.navCtrl.push(reservationPage, { Id: restId });
        else Utilities.loginAlert();
    }
    menu(restId: any) { this.navCtrl.push(TraditionalMenuPage, { Id: restId }); }
    submit(data: any) {
        const obj = { "_id": this.userId, "comment": data.value.comment };
        this.rest.addReview({ "restaurant": this.params.get("Id"), "review": obj }).then((resp: PromiseResp) => {
            if (resp.success) {
                Sql.selectOptions("firstName").then(resp1 => {
                    Sql.selectOptions("image").then(resp2 => {
                        const name = resp1.response;
                        const userImg = resp2.response;
                        this.restaurant.reviews.push({ "_id": obj._id, "comment": obj.comment, "name": name, "userImg": userImg, "date": new Date().toISOString()
                        });
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
        this.comment = "";
    }
    offerDetails(offer: any) {
        console.log(offer._id)
        this.navCtrl.push(offerDetailsPage, { Id: offer._id });
    }
    starClicked(value: any) { this.rest.addRate({ "restaurant": this.params.get("Id"), "rate": { "_id": this.userId, "rate": value } }).then((resp: PromiseResp) => this.readonly = true).catch(err => console.log(err)); }
}