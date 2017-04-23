const bcrypt = require('bcrypt');
const ApplicationController = require('../ApplicationController/ApplicationController');

class SignUpController extends ApplicationController {
  constructor() {
    super();
  }

  __reset__() {
    this.__setSalt = null;
    this.__setUsername = null;
    this.__setPassword = null;
    this.__setFirstName = null;
    this.__setLastName = null;
    this.__setEmail = null;
  }

  set __setSalt(salt) {
    this._salt = salt;
    return null;
  };

  set __setUsername(username) {
    this._username = username;
    return null;
  };

  set __setPassword(password) {
    this._password = password;
    return null;
  };

  set __setFirstName(firstName) {
    this._first_name = firstName;
    return null;
  }

  set __setLastName(lastName) {
    this._last_name = lastName;
    return null;
  }

  set __setEmail(email) {
    this._email = email;
    return null;
  }

  get getSalt() {
    return this._salt;
  }

  get getUsername() {
    return this._username;
  }

  get getPassword() {
    return this._password;
  }

  get getFirstName() {
    return this._first_name;
  }

  get getLastName() {
    return this._last_name;
  }

  get getEmail() {
    return this._email;
  }

  __hash(value, salt, setter) {
    return new Promise((resolve, reject) =>{
      bcrypt.hash(value, salt, function(err, hash) {
        if (err) { throw err; }
        resolve(hash)
      });
    }).then((hash) =>{
      this[setter] = hash;
    })
  }

  _setUsername(username) {
    this.__setUsername = username;
    return this;
  }

  _setPassword(password) {
    this.__setPassword = password;
    return this;
  }

  _setSalt() {
    const saltRounds = 10;

    return new Promise((resolve, reject) =>{
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) { throw err; }
        resolve(salt)
      });
    }).then((salt) =>{
      this.__setSalt = salt;
      return;
    });
  }

  _hashUsername() {
    return this.__hash(this.getUsername, this.getSalt, '__setUsername');
  }

  _hashPassword() {
    return this.__hash(this.getPassword, this.getSalt, '__setPassword');
  }

  createUser(self, req, res, next) {
    const { username, password, first_name, last_name, email } = req.body;
    req.__previous__ = {};
    req.__previous__.username = username;
    req.__previous__.first_name = first_name;
    req.__previous__.last_name = last_name;
    req.__previous__.email =  email;

    self._setSalt()
      .then(() =>{
        return self._setUsername(username)
          ._hashUsername();
      })
      .then((data) =>{
        return self._setPassword(password)
          ._hashPassword();
      })
      .then(() =>{
        return new Promise((resolve, reject) =>{
          req.__previous__.resolve = resolve;
          req.__previous__.salt = self.getSalt;
          req.__previous__.password = self.getPassword;
          req.__previous__.context = 'SignupController#createUser';

          next();
        });
      })
      .then((options) =>{
        res.send(options)
      }).catch(console.log);
  }
}

module.exports = SignUpController;
