
const isDefined = (a) => typeof a !== 'undefined';

// from https://github.com/npm-dom/is-dom/blob/master/index.js
function isNode(val){
  if (!val || typeof val !== 'object') return false;
  if (window && 'object' == typeof window.Node) return val instanceof window.Node;
  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
}

// Convert computed styles to something we can iterate over
// adapted from http://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element/6416527#6416527
function convertComputedStyles(computed) {
  const styles = {};
  for(let i = 0, l = computed.length; i < l; i++){
    var prop = computed[i];
    styles[prop] = computed.getPropertyValue(prop);
  }
  return styles;
}

/**
* Returns a collection of CSS property-value pairs
* @param  {element} node A DOM element
* @return {object} collection of CSS property-value pairs
* @api public
*/
function computedStyles(node) {
  if (!isNode(node)) {
    throw new Error('parameter 1 is not of type \'Element\'');
  }
  // adapted from https://github.com/angular/angular.js/issues/2866#issuecomment-31012434
  if (isDefined(node.currentStyle)) {  //for old IE
    return node.currentStyle;
  } else if (isDefined(window.getComputedStyle)){  //for modern browsers
    return convertComputedStyles(node.ownerDocument.defaultView.getComputedStyle(node,null));
  }
  return node.style;
}

export default computedStyles;
