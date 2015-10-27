# computed-style

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][download-badge]][npm-url]

> Get the computed styles of a DOM element in a cross browser consistent manner

## Install

```sh
npm install computed-styles
```

## Usage

### Get computed styles

```js
import computedStyles from 'computed-styles';

computedStyles(document.querySelector('#node')) // returns computed styles as an object
```

### Convert computed styles to inline styles

```js
import computedStyles from 'computed-styles';

var node = document.querySelector('#node');
computedStyles(node, node.styles);
```

### Copy computed styles to another element

```js
import computedStyles from 'computed-styles';

var source = document.querySelector('#source');
var target = document.querySelector('#target');
computedStyles(source, target.styles);
```

See [API](API.md)

## License

MIT © [J. Harshbarger](http://github.com/Hypercubed)

[npm-url]: https://npmjs.org/package/computed-styles
[npm-image]: https://img.shields.io/npm/v/computed-styles.svg?style=flat-square

[travis-url]: https://travis-ci.org/Hypercubed/computed-styles
[travis-image]: https://img.shields.io/travis/Hypercubed/computed-styles.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/computed-styles.svg?style=flat-square
