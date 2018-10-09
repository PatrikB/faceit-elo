const userController    = require('./../controllers/user.ctrl.js'),
      multipart         = require('connect-multiparty'),
      multipartWare     = multipart();

module.exports = (router) => {
    
    router.route('/user').get(userController.getAll);
    router.route('/user/:id').get(userController.getUser);
    
}