module.exports = {
  init: function(router) {
    require('../controllers/books')(router);
  }
}
