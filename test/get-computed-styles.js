import test from 'tape';
import computedStyles from '../src/';

const html = `
    <style>
      #node {
        font-family: sans-serif;
        margin-left: 10px;
      }
    </style>
    <div id="node" style="color: rgb(255, 0, 0);"></div>`;

var node;

const t = document.createElement('div');
document.body.appendChild(t);

function resetDOM() {
  t.innerHTML = html;
  node = document.querySelector('#node');
}

test('returns computedStyles', (t) => {
  t.plan(2);

  resetDOM();
  const styles = computedStyles(node);

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], 'sans-serif', 'css');

});

test('copies computedStyles to target object', (t) => {
  t.plan(3);

  resetDOM();
  const styles = {};
  computedStyles(node, styles);

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], 'sans-serif', 'css');
  t.equal(styles['margin-left'], '10px', 'css');

});

test('copies computedStyles to target object, using whitelist', (t) => {
  t.plan(3);

  resetDOM();
  const styles = {};
  computedStyles(node, styles, { 'color': true, 'font-family': false, 'margin-left': '10px' });

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], undefined, 'css');
  t.equal(styles['margin-left'], undefined, 'css');

});

test('throws if unexpected type', (t) => {
  t.plan(1);

  resetDOM();

  t.throws(function() {
    computedStyles(document.querySelector('#unknown'));
  }, null, 'Throws if unexpected type');

});
