#!/usr/bin/env node

import initPeriodicChecks from 'src/server/root/periodic_checks/initPeriodicChecks';
import runValidatorsOnStartup from 'src/server/root/runValidatorsOnStartup';
import * as webRequestListener from 'src/server/root/webRequestListener';

function runserver(): void {
  Error.stackTraceLimit = Infinity;
  runValidatorsOnStartup();
  webRequestListener.init();
  setInterval(initPeriodicChecks, 30 * 1000);
}

runserver();
