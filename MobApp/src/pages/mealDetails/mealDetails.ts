import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Meals, PromiseResp } from "../../providers/meals";
@Component({
    selector: 'page-mealDetails',
    templateUrl: 'mealDetails.html'
})
export class mealDetailsPage {
    meal: any;
    constructor(private navParams: NavParams, private viewCtrl: ViewController, meal: Meals) {
        meal.Read(navParams.get('mealId')).then((resp: PromiseResp) => this.meal = resp.response).catch(err => console.log(err));
    }
    Close() { this.viewCtrl.dismiss(); }
}