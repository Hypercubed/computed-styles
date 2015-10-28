
const isDefined = (a) => typeof a !== 'undefined';
const isUndefined = (a) => typeof a === 'undefined';
const isObject = (a) => { return a !== null && typeof a === 'object'; };

// from https://github.com/npm-dom/is-dom/blob/master/index.js
function isNode(val){
  if (!isObject(val)) return false;
  if (isDefined(window) && isObject(window.Node)) return val instanceof window.Node;
  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
}

const useComputedStyles =  isDefined(window) && isDefined(window.getComputedStyle);

// Gets computed styles for an element
// from https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
function getComputedStyles(node) {
  if (useComputedStyles) {
    var view = node.ownerDocument.defaultView;
    if ( !view.opener ) view = window;
    return view.getComputedStyle(node,null);
  } else {
    return node.currentStyle || node.style;
  }
}

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

  var computed = getComputedStyles(node);

  if (styleList === true) {
    var keysArray = useComputedStyles ? computed : Object.keys(computed);
  } else {
    var keysArray = Object.keys(styleList);
  }

  for(let i = 0, l = keysArray.length; i < l; i++){
    let key = keysArray[i];

    let def = styleList === true || styleList[key];
    if (def === false || isUndefined(def)) continue;  // copy never

    let value = /* computed.getPropertyValue(key) || */ computed[key];  // using getPropertyValue causes error in IE11
    if (typeof value !== 'string' || value === '') continue; // invalid value

    if (def === true || value !== def ) {  // styleList === true || styleList[key] === true || styleList[key] !== value
      target[key] = value;
    }
  }

  return target;
}

export default computedStyles;
