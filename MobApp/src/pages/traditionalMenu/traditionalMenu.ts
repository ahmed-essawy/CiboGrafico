import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from "@ionic-native/http";
@Component({
        selector: 'page-traditionalMenu',
        templateUrl: 'traditionalMenu.html'
    })
export class TraditionalMenuPage {
    categories: any;
    constructor(navParams: NavParams, private http: HTTP) {
        this.http.get("http://localhost:8888/restaurants/" + navParams.get('id'), {}, {})
            .then(data => {
                console.log(data);
                //this.categories = JSON.parse(data.data)
            })
            .catch(err => console.log(`Error: ${err}`));
    }
}