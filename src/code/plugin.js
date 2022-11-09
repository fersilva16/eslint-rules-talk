const boxFlexRule = require('./rules/boxFlexRule');
const fetchKeyRule = require('./rules/fetchKeyRule');
const withRelayBoundaryRule = require('./rules/withRelayBoundaryRule');

module.exports = {
  rules: {
    'box-flex': boxFlexRule,
    'fetch-key': fetchKeyRule,
    'with-relay-boundary': withRelayBoundaryRule,
  },
};
