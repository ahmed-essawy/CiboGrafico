import { Component } from '@angular/core';
import { Injectable } from "@angular/core";
import { NavController } from 'ionic-angular';
import { Sql } from "../../../providers/sql";
import { Users } from "../../../providers/users";
@Injectable()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
 export class FavoritesPage {
   userr:any
_id:string="5934efa68d607507b404c36f"
  constructor(private user:Users, public navCtrl: NavController) {
    console.log("tmam")
 this.user.read(this._id).then(res=>{
  this.userr=res.response
   console.log(this.userr)
  console.log(res.response)}).catch(err => console.log(err))


}





}