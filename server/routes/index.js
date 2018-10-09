const user  = require('./user'),
      match = require('./match');

module.exports = (router) => {
    
    user(router);
    match(router);
    
}