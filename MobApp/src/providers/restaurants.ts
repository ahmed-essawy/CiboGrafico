import { Injectable } from "@angular/core";
import { Api } from "./api";
@Injectable()
export class Restaurants {
    constructor( private api: Api) {
    }
    readAll(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurants", null).then((data: any) => {
                if (Array.isArray(data)) resolve(data);
                else reject(new Array());
            });
        });
    }
    read(params: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.api.get("Restaurants", params).then((data: any) => {
                console.log(data)
                if (data) resolve(data);
                else reject(false);
            });
        });
    }
   
    
}