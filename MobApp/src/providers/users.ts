import { Injectable } from "@angular/core";
import { Network } from '@ionic-native/network';
import { Api } from "./api";
import { Sql } from "../providers/sql";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
@Injectable()
export class Users {
    isOnline: boolean;
    isLogged: boolean;
    constructor(private network: Network, private api: Api, private fb: Facebook) {
        this.isOnline = network.type !== "none";
        network.onConnect().subscribe(a => this.isOnline = a.type == "online")
        network.onDisconnect().subscribe(a => this.isOnline = a.type == "online")
        Sql.isExistsOptions("_id", resp => this.isLogged = resp);
    }
    login(params: { username: string, password: string }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.api.post("Login", params).then((data: any) => {
                if (data.token) {
                    for (var key in data) if (data.hasOwnProperty(key)) Sql.insertOrUpdateOptions({ key: key, value: data[key] }, () => { });
                    this.isLogged = true;
                    resolve(true);
                }
                else reject(false);
            });
        })
    }
    readAll(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.api.get("Users", null).then((data: any) => {
                if (Array.isArray(data)) resolve(new Array());
                else reject(new Array());
            });
        });
    }
    read(params: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.api.get("Users", params).then((data: any) => {
                if (Array.isArray(data)) resolve(data);
                else reject(new Array());
            });
        });
    }
    fbLogin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.fb.login(["email"]).then((resp: FacebookLoginResponse) => {
                if (resp.status === "connected") {
                    this.fbSaveStatus(resp.authResponse);
                    resolve(true);
                }
                else reject(false);
            }).catch(e => { reject(false) });
        });
    }
    fbIsConnected(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.fb.getLoginStatus().then((resp: FacebookLoginResponse) => {
                if (resp.status === "connected") {
                    this.fbSaveStatus(resp.authResponse);
                    resolve(true);
                }
                else reject(false);
            }).catch(e => { reject(false) });
        });
    }
    fbSaveStatus(response) {
        this.isLogged = true;
        let fbAuthData = { "id": response.userID, "AccessToken": response.accessToken, "ExpiresIn": response.expiresIn, "Image": "https://graph.facebook.com/" + response.userID + "/picture?width=1000&height=1000" }
        for (var key in fbAuthData) if (fbAuthData.hasOwnProperty(key)) Sql.insertOrUpdateOptions({ key: "fb" + key, value: fbAuthData[key] }, () => { });
        this.fb.api("me?fields=id,first_name,last_name,email&accesstoken=" + response.accessToken, []).then(resp => {
            for (var key in resp) if (resp.hasOwnProperty(key)) Sql.insertOrUpdateOptions({ key: "fb" + key, value: resp[key] }, () => { });
        });
    }
}