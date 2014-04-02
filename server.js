'use strict';

var express =       require('express')
    , http =        require('http')
    , path =        require('path')
    , httpProxy =   require('http-proxy');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Initialize system variables
var config = require('./config');

/**
 * Configure app
 */

var app = module.exports = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/client/js/core');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));

/**
 * Catch if user wants to go to websocket
 */
var proxy = httpProxy.createProxy({target:'http://localhost:5500/socket.io/'});
app.use(function (req, res, next) {
  if (req.url.indexOf('/socket.io/')>-1) {
    proxy.web(req, res, function(err) {
      console.error('http-proxy-websocket message:' + err);
      res.send(err, 500);
    });
     //
  } else {
      next();
  }
});

/**
 * DEFINE ROUTES
 */

var routes = require('./server/routes/angularRoutes');
//Setup routes
require('./server/routes/setupRouting.js')(app, routes);


/**
 * Configure Server
 */
app.set('port', process.env.PORT || config.port);
var server = http.createServer(app);

/**
 * Watch for websocket upgrades
 */
server.on('upgrade',function(req,socket, head){
   proxy.ws(req, socket, head, function(err) {
      console.log('upgrade', err);
      socket.write('disconnect');
   });
});

/**
 * Start server
 */
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});