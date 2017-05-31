import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams, RequestOptionsArgs, ResponseContentType, Headers } from "@angular/http";
@Injectable()
export class Api {
    url = "http://192.168.1.104:8888";
    options: RequestOptions;
    constructor(private http: Http) {
        this.options = new RequestOptions({
            headers: new Headers({ "Content-type": "application/json" }),
            responseType: ResponseContentType.Json
        });
    }
    get(endpoint: string, params: any, callback: any) {
        if (params) {
            const p = new URLSearchParams();
            params.forEach((item: any) => p.set(item, params[item]));
            this.options.search = !this.options.search && p || this.options.search;
        }
        this.http.get(this.url + "/" + endpoint, this.options).subscribe(data => this.response(data, callback));
    }
    post(endpoint: string, body: any, callback: any) {
        this.http.post(this.url + "/" + endpoint, body, this.options).subscribe(data => this.response(data, callback));
    }
    put(endpoint: string, body: any, callback: any) {
        this.http.put(this.url + "/" + endpoint, body, this.options).subscribe(data => this.response(data, callback));
    }
    delete(endpoint: string, callback: any) {
        this.http.delete(this.url + "/" + endpoint, this.options).subscribe(data => this.response(data, callback));
    }
    response(data: any, callback: any) {
        const resp = typeof data["_body"] === "string" ? JSON.parse(data["_body"]) : data["_body"];
        if (data.status === 200 && resp.success === true) return callback(resp.data);
        return callback(false);
    }
}