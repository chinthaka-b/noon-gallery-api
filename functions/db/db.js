const assert = require("assert");
const serviceAccount = require('../ServiceAccountKey.json');

let _db;

/**
 * initialize db connection
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    const admin = require('firebase-admin');

  	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount)
	});

  	_db = admin.firestore();
    console.log("DB initialized");
    return callback(null, _db);
}


/**
 * get db connection if init
 * @return {[type]} [description]
 */
function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

module.exports = {
    getDb,
    initDb
};