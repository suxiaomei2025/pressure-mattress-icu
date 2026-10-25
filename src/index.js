'use strict';

module.exports = {
  TelemetryClient: require('./client').TelemetryClient,
  ConsentManager: require('./consent').ConsentManager,
  scrub: require('./scrubber'),
  anonymizer: require('./anonymizer'),
  events: require('./events'),
};
