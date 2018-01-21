pid=$(forever list | grep server.js | awk '{print $7}')
forever stop $pid
