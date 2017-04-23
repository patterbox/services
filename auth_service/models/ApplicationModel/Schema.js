const Sequelize = require('sequelize');

class Schema {
  constructor() {
    this._setUserSchema = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      salt: Sequelize.STRING
    };
  }

  set _setUserSchema(UserSchema) {
    this._user_schema = UserSchema;
    return null; 
  }

  get _getUserSchema() {
    return this._user_schema;
  }
}

module.exports = Schema;
