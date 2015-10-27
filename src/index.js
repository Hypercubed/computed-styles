
const isDefined = (a) => typeof a !== 'undefined';
const isObject = (a) => { return a !== null && typeof a === 'object'; };

// from https://github.com/npm-dom/is-dom/blob/master/index.js
function isNode(val){
  if (!isObject(val)) return false;
  if (isDefined(window) && isObject(window.Node)) return val instanceof window.Node;
  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
}

const useComputedStyles =  isDefined(window) && isDefined(window.getComputedStyle);

/**
* Returns a collection of CSS property-value pairs
* @param  {Element} node A DOM element to copy styles from
* @param  {Object} [target] An optional object to copy styles to
* @param {(Object|Boolean)} [default=true] A collection of CSS property-value pairs, false: copy none, true: copy all
* @return {object} collection of CSS property-value pairs
* @api public
*/
function computedStyles(node, target = {}, styleList = true) {
  if (!isNode(node)) {
    throw new Error('parameter 1 is not of type \'Element\'');
  }

  if (styleList === false) return target;

  if (useComputedStyles) {
    var computed = node.ownerDocument.defaultView.getComputedStyle(node,null);
    var keysArray = (styleList === true) ? computed : Object.keys(styleList);
  } else {
    var computed = isDefined(node.currentStyle) ? node.currentStyle : node.style;
    var keysArray = (styleList === true) ? Object.keys(computed) : Object.keys(styleList);
  }

  for(let i = 0, l = keysArray.length; i < l; i++){
    let key = keysArray[i];

    let def = styleList === true || styleList[key];
    if (def === false || !isDefined(def)) continue;  // copy never

    let value = useComputedStyles ? computed.getPropertyValue(key) : computed[key];
    if (typeof value !== 'string' || value === '') continue; // invalid value

    if (def === true || value !== def ) {  // styleList === true || styleList[key] === true || styleList[key] !== value
      target[key] = value;
    }
  }

  return target;
}

export default computedStyles;
