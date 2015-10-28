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

const t = document.createElement('div');

function beforeEach() {
  t.innerHTML = html;
  document.body.appendChild(t);
}

function afterEach() {
  document.body.removeChild(t);
}

test('returns computedStyles', (t) => {
  t.plan(2);

  beforeEach();
  const styles = computedStyles(document.querySelector('#node'));

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], 'sans-serif', 'css');

  afterEach();

});

test('copies computedStyles to target object', (t) => {
  t.plan(3);

  beforeEach();
  const styles = {};
  computedStyles(document.querySelector('#node'), styles);

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], 'sans-serif', 'css');
  t.equal(styles['margin-left'], '10px', 'css');

  afterEach();

});

test('copies computedStyles to target object, using whitelist', (t) => {
  t.plan(3);

  beforeEach();
  const styles = {};
  computedStyles(document.querySelector('#node'), styles, { 'color': true, 'font-family': false, 'margin-left': '10px' });

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], undefined, 'css');
  t.equal(styles['margin-left'], undefined, 'css');

  afterEach();

});

test('throws if unexpected type', (t) => {
  t.plan(1);

  t.throws(function() {
    computedStyles(document.querySelector('#unknown'));
  }, null, 'Throws if unexpected type');

});
