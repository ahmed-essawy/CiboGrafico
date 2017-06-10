import { Component } from "@angular/core";
import { Restaurants, PromiseResp } from "../../providers/restaurants";
import { Sql} from "../../providers/sql";
import { NavController, NavParams } from "ionic-angular";
import { Utilities } from "../../providers/utilities";
@Component({
    selector: "page-reservation",
    templateUrl: "reservation.html"
})
export class reservationPage {
    branches: any;
    userId: any;
    owner: any;
    date: any;
    guests: any;
    maxGuests: any;
    time: any;
    branch: any;
    rest: any;
    mindate: any = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString();
    maxdate: any = new Date(new Date().getTime() + 11 * 24 * 60 * 60 * 1000).toISOString();
    constructor(private navCtrl: NavController, private navParams: NavParams,private restaurant: Restaurants) {
        this.restaurant.readBranches(navParams.get("Id")).then((resp: PromiseResp) => {
            this.branches = resp.response;
            this.branch = this.branches[0]._id;
            this.maxGuests = this.branches[0].maximumGuests;
        }).catch(err => console.log(err));
        this.restaurant.read(navParams.get("Id")).then((resp: PromiseResp) => this.rest = resp.response).catch(err => console.log(err));
        Sql.selectOptions("_id").then(resp => console.log(this.userId = resp.response)).catch(err => console.log(err));
        Sql.selectOptions("name").then(resp => this.owner = resp.response).catch(err => console.log(err));
        this.date = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString();
        this.time = "12:00";
        this.guests = 2;
    }
    reserve(data: any) {
        Utilities.showLoader();
        data.value.owner = this.userId;
        this.restaurant.addReservation({ "restaurant": this.navParams.get("Id"), "reservation": data.value }).then((resp: PromiseResp) => {
                Utilities.hideLoader();
                Utilities.showToast("You Reserved Successfully.", () => this.navCtrl.pop());
            }).catch(err => {
                Utilities.hideLoader();
                Utilities.showToast("Your Reservation failed.");
            });
    }
    onSelectChange() { this.restaurant.readBranch(this.branch).then((resp: PromiseResp) => this.maxGuests = resp.response.maximumGuests).catch(err => console.log(err)); }
}