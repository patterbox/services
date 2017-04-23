const TablesModel = require('../TablesModel/TablesModel');

class UserModel extends TablesModel {
  constructor() {
    super();
  }

  saveUser(self, req, res, next) {
    const UserModel = self._user_model,
      previousMW = req.__previous__,
      {
        username,
        password,
        salt,
        firstName,
        lastName,
        email,
        resolve
      } = previousMW;

    self.getSync()
      .then(() =>{
        UserModel.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
            password: password,
            salt: salt
        }).then((user) =>{
          resolve(user['$options']);
        }).catch(console.log);
    });

  }
}

module.exports = UserModel;
