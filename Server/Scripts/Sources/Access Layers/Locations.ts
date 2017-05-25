import { Branch, Restaurant, Authentication, BranchAddress } from "../Classes";
import { objectId, Id, AccountType } from "../Types";
import { Collection, Functions } from "../Mongodb";
module.exports = {
    ReadCountries(callback: any) {
        require("./Branches").ReadAll(resp => {
            if (resp.success) {
                const arr: any[] = [];
                resp.data.forEach(a => { if (arr.indexOf(a.address.country) === -1) arr.push(a.address.country); });
                return callback({ success: true, data: arr });
            } else return callback({ success: false });
        });
    },
    ReadCityByCountry(country: string, callback: any) {
        require("./Branches").ReadAll(resp => {
            if (resp.success) {
                const arr: any[] = [];
                resp.data.forEach(a => {
                    if (a.address.country === country && arr.indexOf(a.address.city) ===
                        -1) arr.push(a.address.city);
                });
                return callback({ success: true, data: arr });
            } else return callback({ success: false });
        });
    },
    ReadCities(callback: any) {
        require("./Branches").ReadAll(resp => {
            if (resp.success) {
                const arr: any[] = [];
                resp.data.forEach(a => { if (arr.indexOf(a.address.city) === -1) arr.push(a.address.city); });
                return callback({ success: true, data: arr });
            } else return callback({ success: false });
        });
    },
    ReadAreaByCity(city: string, callback: any) {
        require("./Branches").ReadAll(resp => {
            if (resp.success) {
                const arr: any[] = [];
                resp.data.forEach(a => {
                    if (a.address.city === city && arr.indexOf(a.address.area) === -1) arr.push(a.address.area);
                });
                return callback({ success: true, data: arr });
            } else return callback({ success: false });
        });
    },
    ReadAreas(callback: any) {
        require("./Branches").ReadAll(resp => {
            if (resp.success) {
                const arr: any[] = [];
                resp.data.forEach(a => { if (arr.indexOf(a.address.area) === -1) arr.push(a.address.area); });
                return callback({ success: true, data: arr });
            } else return callback({ success: false });
        });
    },
    ReadStreetByArea(area: string, callback: any) {
        require("./Branches").ReadAll(resp => {
            if (resp.success) {
                const arr: any[] = [];
                resp.data.forEach(a => {
                    if (a.address.area === area && arr.indexOf(a.address.street) === -1) arr.push(a.address.street);
                });
                return callback({ success: true, data: arr });
            } else return callback({ success: false });
        });
    },
    ReadStreets(callback: any) {
        require("./Branches").ReadAll(resp => {
            if (resp.success) {
                const arr: any[] = [];
                resp.data.forEach(a => { if (arr.indexOf(a.address.street) === -1) arr.push(a.address.street); });
                return callback({ success: true, data: arr });
            } else return callback({ success: false });
        });
    }
};