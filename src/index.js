var supportedOperators = ['equal to', 'greater than', 'greater than or equal to', 'less than',
  'less than or equal to', 'not equal to', 'is empty', 'is not empty'
];

// { $in: [null, ''] }
function isIsEmptyQuery(query) {
  const keys = Object.keys(query); 
  if (keys.length !== 1) {
    return false;
  }
  const inValues = query.$in;
  return Array.isArray(inValues) && inValues.length === 2 && 
    inValues.indexOf(null) >= 0 && inValues.indexOf('') >= 0;
}

// { $exists: true, $nin: [null, ''] }
function isIsNotEmptyQuery(query) {
  const keys = Object.keys(query);  
  if (keys.length !== 2 || !query.$exists) {
    return false;
  }
  const ninValues = query.$nin;
  return Array.isArray(ninValues) && ninValues.length === 2 && 
    ninValues.indexOf(null) >= 0 && ninValues.indexOf('') >= 0;
}

/**
 * Returns a Mongo query that can be used a value for a field, given an operator and a value.
 * See readme for supported values.
 */
function create(operator, value) {
  if (supportedOperators.indexOf(operator) < 0) throw new Error(`Unknown operator ${operator}`);

  if (operator === 'equal to') {
    return { $eq: value };
  } else if (operator === 'greater than') {
    return { $gt: value };
  } else if (operator === 'greater than or equal to') {
    return { $gte: value };
  } else if (operator === 'less than') {
    return { $lt: value };
  } else if (operator === 'less than or equal to') {
    return { $lte: value };
  } else if (operator === 'not equal to') {
    return { $ne: value };
  } else if (operator === 'is empty') {
    return { $in: [null, ''] };
  } else if (operator === 'is not empty') {
    return { $exists: true, $nin: [null, ''] };
  }
}

/**
 * Reverses create() - returns an object with `operator` and `value` keys. Returns null if unrecognized query.
 */
function parse(query) {
  if ('$eq' in query) {
    return { operator: 'equal to', value: query.$eq };
  } else if ('$gt' in query) {
    return { operator: 'greater than', value: query.$gt };
  } else if ('$gte' in query) {
    return { operator: 'greater than or equal to', value: query.$gte };
  } else if ('$lt' in query) {
    return { operator: 'less than', value: query.$lt };
  } else if ('$lte' in query) {
    return { operator: 'less than or equal to', value: query.$lte };
  } else if ('$ne' in query) {
    return { operator: 'not equal to', value: query.$ne };
  } else if (isIsEmptyQuery(query)) {
    return { operator: 'is empty' };
  } else if (isIsNotEmptyQuery(query)) { 
    return { operator: 'is not empty' };
  } else {
    return null;
  }
}

module.exports = { create, parse, supportedOperators };