let initialized = false;

export function initErrorLogging(): void {
  // TODO - Implement error logging
  if (!initialized) {
    // Bugsnag.start({
    //   apiKey: '...',
    //   enabledReleaseStages: ['production'],
    //   plugins: [new BugsnagPluginReact()],
    //   releaseStage: Constants.debugMode ? 'development' : 'production',
    // });
  }
  initialized = true;
}
