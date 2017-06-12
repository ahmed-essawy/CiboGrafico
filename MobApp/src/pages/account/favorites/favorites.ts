import { Component } from '@angular/core';
import { Sql } from "../../../providers/sql";
import { Users } from "../../../providers/users";
@Component({
    selector: 'page-favorites',
    templateUrl: 'favorites.html'
})
export class FavoritesPage {
    favorites: any;
    ordersCount: any = {};
    constructor(user: Users) {
        Sql.selectOptions("_id").then(resp => {
            user.read(resp.response).then(res => {
                this.favorites = res.response.favorites;
                console.log(this.favorites);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
}