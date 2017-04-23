const LoginController = require('./LoginController/LoginController');
const SignUpController = require('./SignUpController/SignUpController');
const UserModel = require('../models/UserModel/UserModel');

module.exports = (app) =>{

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  /** Login **/
  app.post('/api/authenticate/user', new LoginController().authenticate.bind(app, LoginController));

  /** SignUp **/
  app.post('/api/create/user', 
    new SignUpController().createUser.bind(app, new SignUpController()),
    new UserModel().saveUser.bind(app, new UserModel())
  );

};
