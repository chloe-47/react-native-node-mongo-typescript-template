#!/usr/bin/env node

Error.stackTraceLimit = Infinity;

import debugModule from 'debug';
import http from 'http';
import httpProxy from 'http-proxy';
import environmentIsUsingHotReloading from 'src/server/env/environmentIsUsingHotReloading';
import { createExpressApp } from 'src/server/root/createExpressApp';
import { envGet } from 'src/shared/env';

const PORT = envGet('PORT', { defaultValue: '3333' });

export function init(): void {
  const debug = debugModule('server');
  const port = normalizePort(PORT);

  const express_app = createExpressApp();
  express_app.set('port', port);

  const server = http.createServer(express_app);

  if (environmentIsUsingHotReloading()) {
    debug(
      'Hot reloading is on. Make sure you have `yarn dev:client` running in another shell if you want to use the web client',
    );
    const nodeProxy = new httpProxy({
      target: 'ws://localhost:19006',
      ws: true,
    });
    server.on('upgrade', (request, socket, head) => {
      nodeProxy.ws(request, socket, head);
    });
  }

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function normalizePort(val: string): number | string | false {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  function onError(error_: Error): void {
    const error = error_ as unknown as Error & {
      syscall: undefined | string;
      code: undefined | string;
    };
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
      default:
        throw error;
    }
  }

  function onListening(): void {
    const addr = server.address();
    const bind =
      typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    debug('Listening on ' + bind);
  }
}
