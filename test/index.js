import test from 'tape';
import computedStyles from '../dist/';
import jsdom from 'jsdom';

const markup = `
  <!DOCTYPE html>
  <html>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <head>
      <style>
        div {
          font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;
        }
      </style>
    </head>
    <body id="abody">
      <div id="node" style="color: red;"></div>
    </body>
  </html>`;

const document = jsdom.jsdom(markup);
const window = global.window = document.parentWindow;
const node = document.querySelector('#node');

test('computedStyles', (t) => {
  t.plan(3);

  const styles = computedStyles(node);

  t.equal(styles.color, 'red', 'inline');
  t.equal(styles['font-family'], '\'Helvetica Neue\', Helvetica, Arial, sans-serif', 'css');

  t.throws(function() {
    computedStyles(document.querySelector('#unknown'));
  }, null, 'Throws if unexpected type');

});
