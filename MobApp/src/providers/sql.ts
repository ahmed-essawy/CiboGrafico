import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
@Injectable()
export class Sql {
    private static db: SQLiteObject;
    constructor(sql: SQLite) {
        sql.create({ name: "CiboGrafico", location: "default" }).then(db => {
            Sql.db = db;
            db.executeSql("CREATE TABLE IF NOT EXISTS User (Key UNIQUE, Value TEXT)", {});
        });
    }
    static select(table: string, key: string, callback) {
        Sql.db.executeSql("SELECT FROM " + table + " WHERE Key=?", [key]).then(resp => console.log(resp))
    }
    static insert(table: string, data: { key: string, value: string }, callback) {
        Sql.db.executeSql("INSERT INTO " + table + " VALUES (?,?)", [data]).then(resp => callback(resp))
    }
    static update(table: string, key: string, callback) {
        Sql.db.executeSql("UPDATE " + table + " SET  WHERE Key=?", [key]).then(resp => console.log(resp))
    }
    static drop(table: string) {
        Sql.db.executeSql("DROP TABLE " + table, {}).then(resp => console.log(resp))
    }
    static query(query: string) {
        Sql.db.executeSql(query, {});
    }
}