var express = require('express');
var router = express.Router();

/** 
  * @param Object{ req }
  * @param Object{ res }
  * @param Object{ callback: next }
  * @comment String 'GET users listing.' 
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
