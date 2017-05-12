## mongo-comparison-ops-description

This library will create a Mongo-style regex from a "description" (a tuple of an operator and a value). This is useful for building UIs on top of Mongo or [Sift](https://www.npmjs.com/package/sift) `$regex` operators.

Also see https://github.com/mixmaxhq/mongo-regex-description for the text counterpart to the library.

Example:

```js
var comparisonDescription = require('mongo-comparison-ops-description');

var regex = regExpDescription.create({
	operator: 'equal to',
	value: 1
});
// { $not: { $regex: '^my value$', $options: 'i' } }


var description = regExpDescription.parse({
	$not: {
		$regex: '^my value$',
		$options: 'i'
	}
});
// { operator: 'is not', value: 'my value' }

```

### Supported Operators

* `equal to`
* `greater than`
* `greater than or equal to`
* `less than`
* `less than or equal to`
* `not equal to`


## Changelog

* 1.2.0 Can be used in the browser (use `npm build` and consume the file `dist/browser/index.js`)
* 1.1.1 Reordered `supportedOperators` to put more commonly used `contains` first.
* 1.1.0 Added `require('mongo-regex-description').supportedOperators` array as a convenience.
* 1.0.1 `parse()` returns null if it can't parse the query.
* 1.0.0 Initial release