import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Meals, PromiseResp } from "../../providers/meals";
@Component({
    selector: 'page-mealDetails',
    templateUrl: 'mealDetails.html'
})
export class mealDetailsPage {
    meal: any;
    constructor(navParams: NavParams, private viewCtrl: ViewController, meal: Meals) {
        this.meal = navParams.get('meal');
        meal.Read(navParams.get('meal')).then((resp: PromiseResp) => this.meal = resp.response).catch(err => console.log(err));
    }
    Close() { this.viewCtrl.dismiss(); }
}