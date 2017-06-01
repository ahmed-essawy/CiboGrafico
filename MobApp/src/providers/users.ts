import { Injectable } from "@angular/core";
import { Network } from '@ionic-native/network';
import { Api } from "./api";
import { Sql } from "../providers/sql";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
@Injectable()
export class Users {
    isOnline: boolean;
    constructor(private network: Network, private api: Api, private fb: Facebook) {
        this.isOnline = network.type == "online";
    }
    login(params: { username: string, password: string }, callback: any): any {
        console.log(this.network.type);
        this.api.post("Login", params, (data: any) => {
            if (data.token) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Sql.insert("User", { key: key, value: data[key] }, () => { })
                    }
                }
                return callback(data);
            }
            return callback(false);
        });
    }
    readAll(callback: any): any {
        this.api.get("Users", null, (data: any) => {
            if (Array.isArray(data)) return callback(new Array());
            return callback(new Array());
        });
    }
    read(params: any, callback: any): any {
        this.api.get("Users", params, (data: any) => {
            if (Array.isArray(data)) return callback(data);
            return callback(new Array());
        });
    }
    fbLogin(callback: any): any {
        this.fb.login(["email"]).then((res: FacebookLoginResponse) => callback(res)).catch((e: any) => callback(e));
    }
}