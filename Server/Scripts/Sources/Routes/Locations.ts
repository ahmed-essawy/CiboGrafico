import { Branch, Manager, Address, BranchAddress } from "../Classes";
{
    const locations = require("express").Router(), db = require("../Mongodb");
    locations
        .get("/Countries", (req: any, res: any) => db.Locations.ReadCountries(response => res.json(response)))
        .get("/Cities/:country", (req: any, res: any) => db.Locations.ReadCityByCountry(req.params.country,response => res.json(response)))
        .get("/Cities", (req: any, res: any) => db.Locations.ReadCities(response => res.json(response)))
        .get("/Areas/:city", (req: any, res: any) => db.Locations.ReadAreasByCity(req.params.city,response => res.json(response)))
        .get("/Areas", (req: any, res: any) => db.Locations.ReadAreas(response => res.json(response)))
        .get("/Streets/:area", (req: any, res: any) => db.Locations.ReadStreetByArea(req.params.area, response => res.json(response)))
        .get("/Streets", (req: any, res: any) => db.Locations.ReadStreets(response => res.json(response)));
    module.exports = locations;
}