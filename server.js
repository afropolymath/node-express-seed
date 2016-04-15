var express = require('express'),
  bodyParser = require('body-parser');

var routes = require('./api/routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router = express.Router();

routes.init(router);

app.use('/api', router);

app.listen(3000, function() {
  console.log("Listening to requests on port 3000");
});
