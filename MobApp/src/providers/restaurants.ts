import { Injectable } from "@angular/core";
import { Api } from "./api";
import { PromiseResp } from "./classes";
export * from "./classes";
@Injectable()
export class Restaurants {
    constructor(private api: Api) {}
    readAll(): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurants", null).then((resp: PromiseResp) => {
                let data: any = resp.response;
                if (Array.isArray(data)) resolve(new PromiseResp(true, data));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
    read(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurants", params).then((resp: PromiseResp) => {
                let data: any = resp.response;
                if (data._id) resolve(new PromiseResp(true, data));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
    readBranches(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurant/Branches/ByRestauarnt", params).then((resp: PromiseResp) => {
                let data: any = resp.response;
                console.log(data);
                if (Array.isArray(data)) resolve(new PromiseResp(true, data));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }

}
    
