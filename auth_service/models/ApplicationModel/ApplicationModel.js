const Schema = require('./Schema');
const Sequelize = require('sequelize');

class ApplicationModel extends Schema {
  constructor() {
    super();
    
    this.__init__()
      ._setDB_()
      ._authenticate_();
  }

  __init__() {
    this.__setHost = process.env.DB_HOST;
    this.__setDialect = 'mysql';
    this.__setLogging = true;
    this.__setPool = {
      max: 5,
      min: 0,
      idle: 10000
    };

    return this;
  }

  _setDB_() {
    this.__setDB = new Sequelize(this.__getDBDB, this.__getDBName, this.__getDBPass, {
      host: this.__getHost,
      dialect: this.__getDialect,
      logging: this.__getLogging,
      pool: this.__getPool
    });

    return this;
  }

  _authenticate_() {
    const db = this.getDB;
    this.__setDBPromise = db.authenticate();
    return this;
  }

  set __setHost(host) {
    this._host = host;
    return null;
  }

  set __setDialect(dialect) {
    this._dialect = dialect;
    return null;
  }

  set __setLogging(logging) {
    this._logging = logging;
    return null; 
  }

  set __setPool(pool) {
    this._pool = pool;
    return null;
  }

  set __setDB(db) {
    this._db = db;
    return null;
  }

  set __setDBPromise(promise) {
    this._DBPromise = promise;
    return null;
  }

  get __getHost() {
    return this._host;
  }

  get __getDialect() {
    return this._dialect;
  }

  get __getLogging() {
    return this._logging;
  }

  get __getPool() {
    return this._pool;
  }

  get __getDBDB() {
    return process.env.DB_DB;
  }

  get __getDBName() {
    return process.env.DB_NAME;
  }

  get __getDBPass() {
    return process.env.DB_PASS;
  }

  get getDB() {
    return this._db;
  }

  getDBPromise() {
    return this._DBPromise;
  }
}

module.exports = ApplicationModel;
