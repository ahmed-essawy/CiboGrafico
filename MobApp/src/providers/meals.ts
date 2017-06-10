import { Injectable } from "@angular/core";
import { Api } from "./api";
import { PromiseResp } from "./classes";
export * from "./classes";
@Injectable()
export class Meals {
    constructor(private api: Api) { }
    Read(params: any): Promise<PromiseResp> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurant/Meals", params).then((resp: PromiseResp) => {
                let data: any = resp.response;
                if (data._id) resolve(new PromiseResp(true, data));
                else reject(new PromiseResp(false, new Array()));
            }).catch(e => reject(e));
        });
    }
}