# computed-style

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> Get the computed styles of a DOM element in a cross browser consistent manner

## Install

```sh
npm install computed-styles
```

## Usage

```js
import computedStyles from 'computed-styles';

computedStyles(document.querySelector('#node')) // returns computed styles as an object
```

## License

MIT © [J. Harshbarger](http://github.com/Hypercubed)

[npm-url]: https://npmjs.org/package/computed-styles
[npm-image]: https://img.shields.io/npm/v/computed-style.svg?style=flat-square

[travis-url]: https://travis-ci.org/Hypercubed/computed-styles
[travis-image]: https://img.shields.io/travis/Hypercubed/computed-style.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/Hypercubed/computed-styles
[coveralls-image]: https://img.shields.io/coveralls/Hypercubed/computed-style.svg?style=flat-square

[depstat-url]: https://david-dm.org/Hypercubed/computed-styles
[depstat-image]: https://david-dm.org/Hypercubed/computed-style.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/computed-style.svg?style=flat-square
