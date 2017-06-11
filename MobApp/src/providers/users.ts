import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { Api } from "./api";
import { Sql } from "./sql";
import { Utilities } from "./utilities";
import { PromiseResp } from "./classes";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
@Injectable()
export class Users {
    static isOnline: boolean;
    constructor(private network: Network, private api: Api, private fb: Facebook) {
        Users.isOnline = network.type !== "none";
        network.onConnect().subscribe(a => Users.isOnline = a.type == "online");
        network.onDisconnect().subscribe(a => Users.isOnline = a.type == "online");
    }
    static isLogged(): Promise<boolean> { return new Promise(resolve => { Sql.isExistsOptions("_id").then(resp => resolve(resp.response)); }); }
    login(params: { username: string, password: string }): Promise<PromiseResp> { return new Promise((resolve, reject) => { this.api.post("Login", params).then((resp: PromiseResp) => { this.saveLoginState(resp.response).then(r => resolve(r)).catch(e => reject(e)); }).catch(e => reject(new PromiseResp(e.success, "Log In Failed"))); }); }
    signup(params: {
        firstName: string, lastName: string, username: string, email: string, password: string;
    }): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.post("Users", params).then((resp: PromiseResp) => {
                const data: any = resp.response;
                if (data["upserted"].length > 0) resolve(new PromiseResp(true, "Sign Up Successfully"));
                else reject(new PromiseResp(false, "Sign Up Failed"));
            }).catch(e => reject(new PromiseResp(e.success, "Sign Up Failed")));
        });
    }
    readAll(): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Users", null).then((data: PromiseResp) => {
                if (Array.isArray(data.response)) resolve(new PromiseResp(true, new Array()));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
    read(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Users", params).then((data: PromiseResp) => {
                if (data.response) resolve(new PromiseResp(true, data.response));
                else reject(new PromiseResp(false, ""));
            });
        });
    }
    fbLogin(): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.fb.login(["email"]).then((resp: FacebookLoginResponse) => {
                if (resp.status === "connected") {
                    this.fbSaveStatus(resp.authResponse).then(resp => {
                        if (resp.success) resolve(new PromiseResp(true, "Log In Successfully"));
                        else reject(new PromiseResp(false, "Log In Failed"));
                    }).catch(e => reject(new PromiseResp(false, "Log In Failed")));
                } else reject(new PromiseResp(false, "Log In Failed"));
            }).catch(e => reject(e));
        });
    }
    fbIsConnected(): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.fb.getLoginStatus().then((resp: FacebookLoginResponse) => {
                if (resp.status === "connected") {
                    this.fbSaveStatus(resp.authResponse).then(resp => {
                        if (resp.success) resolve(new PromiseResp(true, "Log In Successfully"));
                        else reject(new PromiseResp(false, "Log In Failed"));
                    }).catch(e => reject(new PromiseResp(false, "Log In Failed")));
                } else reject(new PromiseResp(false, "Log In Failed"));
            }).catch(e => reject(e));
        });
    }
    fbSaveStatus(response: any): Promise<PromiseResp> {
        const fbAuthData = {
            "id": response.userID, "AccessToken": response.accessToken, "ExpiresIn": response
                .expiresIn, "Image": `https://graph.facebook.com/${response.userID}/picture?width=1000&height=1000`
        };
        for (let key in fbAuthData) if (fbAuthData.hasOwnProperty(key)) Sql.insertOrUpdateOptions({ key: `fb${key}`, value: fbAuthData[key] });
        return new Promise((resolve, reject) => {
            this.fb.api(`me?fields=id,first_name,last_name,email&accesstoken=${response.accessToken}`, [])
                .then(resp => {
                    for (let key in fbAuthData) if (fbAuthData.hasOwnProperty(key)) resp[key] = fbAuthData[key];
                    Sql.selectOptions("_id").then(id => {
                        resp["isRegistered"] = id.success;
                        resp["_id"] = id.response;
                        sendData();
                    }).catch(err => {
                        resp["isRegistered"] = err.success;
                        sendData();
                    });
                    const sendData = () => {
                        if (resp.id && resp.email) this.api.post("Login/fbLogin", resp).then((resp: PromiseResp) => { this.saveLoginState(resp.response).then(r => resolve(r)).catch(e => reject(e)); }).catch(e => reject(new PromiseResp(false, "Failed retrieve data from Facebook!")));
                        else reject(new PromiseResp(false, "Failed retrieve data from Facebook!"));
                    };
                });
        });
    }
    updateUser(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.put("Users", params).then((resp: PromiseResp) => {
                if (resp.success) this.saveLoginState(resp.response).then(r => resolve(r)).catch(e => reject(e));
                else reject(new PromiseResp(false, ""));
            }).catch(e => reject(e));
        });
    }
    saveLoginState(data: { _id: string, email: string, username: string, token: string, firstName: string, lastName: string, image: string, address: any, phones: any }): Promise<PromiseResp> {
        data.address = JSON.stringify(data.address);
        data.phones = JSON.stringify(data.phones);
        data["name"] = data.firstName + " " + data.lastName;
        return new Promise((resolve, reject) => {
            if (data._id) {
                for (let key in data) if (data.hasOwnProperty(key) && typeof data[key] === "string") Sql.insertOrUpdateOptions({ key: key, value: data[key] });
                Utilities.eventsCtrl.publish("User:Login");
                resolve(new PromiseResp(true, "Log In Successfully"));
            } else reject(new PromiseResp(false, "Log In Failed"));
        });
    }
}