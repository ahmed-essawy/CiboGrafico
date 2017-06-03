import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
@Injectable()
export class Sql {
    private static db: SQLiteObject;
    constructor(sql: SQLite) {
        sql.create({ name: "CiboGrafico", location: "default" }).then(db => {
            Sql.db = db;
            db.executeSql("CREATE TABLE IF NOT EXISTS Options (Key UNIQUE, Value TEXT)", {});
        });
    }
    static selectOptions(key: string, callback) {
        Sql.query("SELECT Value FROM Options WHERE Key=?", [key], resp => {
            if (resp.rows.length > 0) callback(resp.rows.item(0).Value)
            else callback("")
        })
    }
    static insertOptions(data: { key: string, value: string }, callback) {
        Sql.isExistsOptions(data.key, isExists => {
            if (!isExists) Sql.query("INSERT INTO Options VALUES (?,?)", [data.key, data.value], resp => callback(resp.rowsAffected > 0));
        })
    }
    static updateOptions(data: { key: string, value: string }, callback) {
        Sql.isExistsOptions(data.key, isExists => {
            if (isExists) Sql.query("UPDATE Options SET Value=? WHERE Key=?", [data.value, data.key], resp => callback(resp.rowsAffected > 0));
        });
    }
    static insertOrUpdateOptions(data: { key: string, value: string }, callback) {
        Sql.isExistsOptions(data.key, isExists => {
            if (isExists) Sql.updateOptions(data, callback);
            else if (!isExists) Sql.insertOptions(data, callback);
        })
    }
    static deleteOptions(key: string, callback) {
        Sql.isExistsOptions(key, isExists => {
            if (isExists) Sql.query("DELETE FROM Options WHERE Key=?", [key], resp => callback(resp.rowsAffected > 0));
            else callback(false);
        });
    }
    static isExistsOptions(key: string, callback) {
        Sql.query("SELECT Value FROM Options WHERE Key=?", [key], resp => callback(resp.rows.length > 0))
    }
    static query(query: string, data: any, callback) {
        Sql.db.executeSql(query, data).then(callback);
    }
    static drop(table: string) {
        Sql.query("DROP TABLE " + table, {}, () => { });
    }
}