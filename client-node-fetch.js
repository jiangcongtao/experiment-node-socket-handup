const fetch = require('node-fetch');

const AbortController = require("abort-controller");
const controller = new AbortController();
const timeout = setTimeout(() => {
	controller.abort();
}, 6000);

/** Simulate triggering ETIMEOUT error using blackhole server (if AbortController option is not enabled, otherwise, it will throw AbortError)
 
> time node client-node-fetch.js 
(node:50575) UnhandledPromiseRejectionWarning: FetchError: request to https://blackhole.webpagetest.org/ failed, reason: connect ETIMEDOUT 3.219.212.117:443
    at ClientRequest.<anonymous> (/Users/njiang3/dev-js/experiment-node-socket-handup/node_modules/node-fetch/lib/index.js:1461:11)
    at ClientRequest.emit (events.js:311:20)
    at TLSSocket.socketErrorListener (_http_client.js:426:9)
    at TLSSocket.emit (events.js:311:20)
    at emitErrorNT (internal/streams/destroy.js:92:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:60:3)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
(node:50575) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:50575) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. 
*/

fetch('https://blackhole.webpagetest.org/', {signal: controller.signal})
    .then(res => res.text())
    .then(body => console.log(body));


/**
 If enabled AbortController, the following error be thrown
 > time node client-node-fetch.js 
(node:58997) UnhandledPromiseRejectionWarning: AbortError: The user aborted a request.
    at abort (/Users/njiang3/dev-js/experiment-node-socket-handup/node_modules/node-fetch/lib/index.js:1418:16)
    at AbortSignal.abortAndFinalize (/Users/njiang3/dev-js/experiment-node-socket-handup/node_modules/node-fetch/lib/index.js:1433:4)
    at AbortSignal.dispatchEvent (/Users/njiang3/dev-js/experiment-node-socket-handup/node_modules/event-target-shim/dist/event-target-shim.js:818:35)
    at abortSignal (/Users/njiang3/dev-js/experiment-node-socket-handup/node_modules/abort-controller/dist/abort-controller.js:52:12)
    at AbortController.abort (/Users/njiang3/dev-js/experiment-node-socket-handup/node_modules/abort-controller/dist/abort-controller.js:91:9)
    at Timeout._onTimeout (/Users/njiang3/dev-js/experiment-node-socket-handup/client-node-fetch.js:6:13)
    at listOnTimeout (internal/timers.js:549:17)
    at processTimers (internal/timers.js:492:7)
(node:58997) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:58997) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

real    0m3.083s
user    0m0.068s
sys     0m0.028s
  
 */