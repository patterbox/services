const ApplicationController = require('../ApplicationController/ApplicationController');

class LoginController extends ApplicationController {
  constructor() {
    super();
  }
  
  authenticate(req, res, next) {
    res.send({code: 'im from the other service login'});
  } 
}

module.exports = LoginController;
