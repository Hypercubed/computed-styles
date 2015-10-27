global.document = require('jsdom').jsdom();
global.window = global.document.parentWindow;
global.isJSDOM = true;

require('./');
