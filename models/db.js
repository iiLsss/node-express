var settings = require('../settings');
// console.log(settings)
var Db = require("mongodb").Db;
var Connection = require("mongodb").Connection;
var Server = require("mongodb").Server;
// console.log(Db)
// console.log(Connection)
// console.log(Server)

module.exports = new Db(settings.db, new Server(settings.host, settings.port), { safe: true });