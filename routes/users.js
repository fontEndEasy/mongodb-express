var express = require('express');
var router = express.Router();

/** 
  * @param required Object{ req }
  * @param required Object{ res }
  * @param required Object{ next }
  * @comment String 'GET users listing.' 
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
