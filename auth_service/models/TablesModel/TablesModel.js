const ApplicationModel = require('../ApplicationModel/ApplicationModel');
const Sequelize = require('sequelize');

class TablesModel extends ApplicationModel {
  constructor() {
    super();

    this._init_()
      .then(() =>{
        this.__setSync = this._sync_();
      });
  }

  _init_() {
    const db = this.getDBPromise();
    return db.then(() =>{
      console.log('Connection Established');
      this._setUserTable();
      return db;
    });
  }

  _sync_() {
    return new Promise((resolve, reject) =>{
      this.getDB
        .sync({
          force: false,
        })
        .then(() =>{
          console.log('Tables created');
          resolve();
        });
    });
  }

  set __setSync(sync) {
    this._sync = sync;
    return null;
  }

  get getUserTable() {
    return this._user_model;
  }

  _setUserTable() {
    this._user_model = this.getDB
      .define('user', this._getUserSchema);
    return this;
  }

  getSync() {
    return this._sync;
  }

}

module.exports = TablesModel;
