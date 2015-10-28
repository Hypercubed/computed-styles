import test from 'tape';
import computedStyles from '../src/';

const html = `
    <style>
      #node1Parent {
        font-family: sans-serif;
      }

      #node1 {
        margin-left: 10px;
      }

      #node2 {
        font-family: serif;
        margin-left: 20px;
      }

      #parent {
        margin-left: 10px;
        font-family: georgia;
      }
    </style>
    <div id="parent">
      <div id="node1Parent">
        <div id="node1" style="color: rgb(255, 0, 0);"></div>
      </div>
      <div id="node2Parent">
        <div id="node2" style="color: rgb(0, 0, 255);"></div>
      </div>
    </div>`;

const t = document.createElement('div');

var source, target;
function beforeEach() {
  t.innerHTML = html;
  document.body.appendChild(t);

  source = document.querySelector('#node1');
  target = document.querySelector('#node2');
}

function afterEach() {
  document.body.removeChild(t);
}

test('copy styles', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, target.style, true);

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '10px', 'css');
  t.equal(target.style['font-family'], 'sans-serif', 'css - inherited');

  afterEach();

});

test('copy styles to inline', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, source.style, true);

  t.equal(source.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(source.style['margin-left'], '10px', 'css');
  t.equal(source.style['font-family'], 'sans-serif', 'css - inherited');

  afterEach();

});

test('not copy if arguments[3] === false', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, target.style, false);

  t.equal(target.style.color, 'rgb(0, 0, 255)', 'inline');
  t.equal(target.style['margin-left'], '', 'css');
  t.equal(target.style['font-family'], '', 'css - inherited');

  afterEach();

});

test('copy white listed styles', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, target.style, { 'color': true, 'font-family': true, 'margin-left': true });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '10px', 'css - not inherited');
  t.equal(target.style['font-family'], 'sans-serif', 'css - inherited');

  afterEach();

});

test('copy only white listed styles', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, target.style, { 'color': true, 'margin-left': true });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['font-family'], '', 'css - inherited');
  t.equal(target.style['margin-left'], '10px', 'css - not inherited');

  afterEach();

});

test('copy only white listed styles, skip false', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, target.style, { 'color': true, 'font-family': false, 'margin-left': true  });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '10px', 'css - not inherited');
  t.equal(target.style['font-family'], '', 'css - inherited');

  afterEach();

});

test('copy only white listed styles, skip undefined', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, target.style, { 'color': true, 'font-family': undefined, 'margin-left': undefined  });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '', 'css - not inherited');
  t.equal(target.style['font-family'], '', 'css - inherited');

  afterEach();

});

test('copy white listed styles, excluding defaults', (t) => {
  t.plan(3);

  beforeEach();
  computedStyles(source, target.style, { 'color': 'rgb(0,0,0)', 'font-family': 'serif', 'margin-left': '0px' });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '10px', 'css - not inherited');
  t.equal(target.style['font-family'], 'sans-serif', 'css - inherited');

  afterEach();

});
