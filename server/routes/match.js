const matchController    = require('./../controllers/match.ctrl.js'),
      multipart         = require('connect-multiparty'),
      multipartWare     = multipart();

module.exports = (router) => {
    
    router.route('/match/:id').get(matchController.getMatch);
    router.route('/matches/:id').get(matchController.getMatches);
    
}