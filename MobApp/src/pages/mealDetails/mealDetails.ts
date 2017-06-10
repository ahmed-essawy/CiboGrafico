import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
/*
  Generated class for the mealDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-mealDetails',
    templateUrl: 'mealDetails.html'
})
export class mealDetailsPage {
    Meal: any;
    constructor(public navParams: NavParams, public viewCtrl: ViewController) { this.Meal = navParams.get('Meal'); }
    Close() { this.viewCtrl.dismiss(); }
}