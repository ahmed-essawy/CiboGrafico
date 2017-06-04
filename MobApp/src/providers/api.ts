import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams, RequestOptionsArgs, ResponseContentType, Headers } from "@angular/http";
import { Network } from '@ionic-native/network';
import { PromiseResp } from "./classes";
@Injectable()
export class Api {
    url = "http://169.254.80.80:8888";
    options: RequestOptions;
    isOnline: boolean;
    constructor(private http: Http, network: Network) {
        this.options = new RequestOptions({
            headers: new Headers({ "Content-type": "application/json" }),
            responseType: ResponseContentType.Json
        });
        this.isOnline = network.type !== "none";
        network.onConnect().subscribe(a => this.isOnline = a.type == "online")
        network.onDisconnect().subscribe(a => this.isOnline = a.type == "online")
    }
    get(endpoint: string, params: any): Promise<PromiseResp> {
        if (params) {
            //const p = new URLSearchParams();
            //params.forEach((item: any) => p.set(item, params[item]));
            //this.options.search = !this.options.search && p || this.options.search;
            return this.response(this.http.get(this.url + "/" + endpoint+"/"+params, this.options))
        } else {
            return this.response(this.http.get(this.url + "/" + endpoint, this.options))
        }
        
    }
    post(endpoint: string, body: any): Promise<PromiseResp> {
        return this.response(this.http.post(this.url + "/" + endpoint, body, this.options));
    }
    put(endpoint: string, body: any): Promise<PromiseResp> {
        return this.response(this.http.put(this.url + "/" + endpoint, body, this.options));
    }
    delete(endpoint: string): Promise<PromiseResp> {
        return this.response(this.http.delete(this.url + "/" + endpoint, this.options));
    }
    response(command: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            if (!this.isOnline) reject(new PromiseResp(false, "Mobile not connected to network"));
            command.subscribe(data => {
                const resp = typeof data["_body"] === "string" ? JSON.parse(data["_body"]) : data["_body"];
                if (data.status === 200) {
                    if (resp.success === true) resolve(new PromiseResp(resp.success, resp.data));
                    else if (resp.success === false) reject(new PromiseResp(resp.success, resp.msg));
                    else reject(new PromiseResp(resp.success, "Data doesn't exist"));
                }
                else reject(new PromiseResp(false, data));
            });
        })
    }
}