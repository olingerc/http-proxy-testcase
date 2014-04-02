Test case to check debug http-proxy 1.0.3

Install node dependencies to node_modules
Install bower dependencies to client/js/lib

Start first server with: (listens on 5000), looks for socket on same port
node server

Start socket server with (listens on 5500)
node socket

Http-proxy sends socket requests from 5000 to 5500