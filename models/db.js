var db = require('../dbconfig/db-config'),
	Mongo = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;

	module.exports = new Mongo(db.db, new Server(db.host, db.port), {safe: true});