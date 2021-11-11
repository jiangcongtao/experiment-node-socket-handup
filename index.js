/**
 * A server program to simulate different kinds of error.
 * 
 * Error to simulate
 * 1. Error: socket hang up (ECONNRESET)
 * 2. Error: read ECONNRESET
 */

const http = require ('http');
const port = 3020;

const server = http
  .createServer ((request, response) => {
    console.log ('request url:', request.url);
    if (request.url === '/timeout') {
      setTimeout (function () {
        // Simulate the following error to the requesting client
        /*
      Error: socket hang up
          at connResetException (internal/errors.js:604:14)
          at Socket.socketOnEnd (_http_client.js:460:23)
          at Socket.emit (events.js:323:22)
          at endReadableNT (_stream_readable.js:1204:12)
          at processTicksAndRejections (internal/process/task_queues.js:84:21) {
        code: 'ECONNRESET'
      }
      */
        // destroy server->client socket channel. Or use CTRL-C to kill server process.
        response.socket.destroy ();
        console.log ('Server shutdown the underlying socket.');
      }, 1000 * 60 * 3); // trigger the error in 3 minutes
    }
  })
  .listen (port);

server.on ('connection', function (socket) {
  console.log ('Received a connection: ');
  /** requesting client will receive the following error immediately upon receiving request
   Error: read ECONNRESET
      at TCP.onStreamRead (internal/stream_base_commons.js:205:27) {
    errno: 'ECONNRESET',
    code: 'ECONNRESET',
    syscall: 'read'
  }
   */
  // socket.destroy();
});

console.log ('Server listening on port ', port);
