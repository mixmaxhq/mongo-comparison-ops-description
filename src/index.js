var supportedOperators = ['equal to', 'greater than', 'greater than or equal to', 'less than',
  'less than or equal to', 'not equal to'
];

/**
 * Returns a Mongo query that can be used a value for a field, given an operator and a value.
 * See readme for supported values.
 */
function create(operator, value) {
  if (supportedOperators.indexOf(operator) < 0) throw new Error(`Unknown operator ${operator}`);

  if (operator === 'equal to') {
    return { $eq: value };
  } else if (operator === 'greater than') {
    return { $gt: 1 };
  } else if (operator === 'greater than or equal to') {
    return { $gte: 1 };
  } else if (operator === 'less than') {
    return { $lt: 1 };
  } else if (operator === 'less than or equal to') {
    return { $lte: 1 };
  } else if (operator === 'not equal to') {
    return { $ne: 1 };
  }
}

/**
 * Reverses create() - returns an object with `operator` and `value` keys. Returns null if unrecognized query.
 */
function parse(query) {
  if (query.$eq) {
    return { operator: 'equal to', value: query.$eq };
  } else if (query.$gt) {
    return { operator: 'greater than', value: query.$gt };
  } else if (query.$gte) {
    return { operator: 'greater than or equal to', value: query.$gte };
  } else if (query.$lt) {
    return { operator: 'less than', value: query.$lt };
  } else if (query.$lte) {
    return { operator: 'less than or equal to', value: query.$lte };
  } else if (query.$ne) {
    return { operator: 'not equal to', value: query.$ne };
  } else {
    return null;
  }
}

module.exports = { create, parse, supportedOperators };