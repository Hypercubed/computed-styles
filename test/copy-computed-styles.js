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

var source, target;

const t = document.createElement("div");
document.body.appendChild(t);

function resetHTML() {
  t.innerHTML = html;
  source = document.querySelector('#node1');
  target = document.querySelector('#node2');
}

test('copy styles', (t) => {
  t.plan(3);

  resetHTML();
  computedStyles(source, target.style, true);

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '10px', 'css');
  t.equal(target.style['font-family'], 'sans-serif', 'css - inherited');

});

test('copy styles to inline', (t) => {
  t.plan(3);

  resetHTML();
  computedStyles(source, source.style, true);

  t.equal(source.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(source.style['margin-left'], '10px', 'css');
  t.equal(source.style['font-family'], 'sans-serif', 'css - inherited');

});

test('not copy if arguments[3] === false', (t) => {
  t.plan(3);

  resetHTML();
  computedStyles(source, target.style, false);

  t.equal(target.style.color, 'rgb(0, 0, 255)', 'inline');
  t.equal(target.style['margin-left'], '', 'css');
  t.equal(target.style['font-family'], '', 'css - inherited');

});

test('copy white listed styles', (t) => {
  t.plan(3);

  resetHTML();
  computedStyles(source, target.style, { 'color': true, 'font-family': true, 'margin-left': true });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '10px', 'css - not inherited');
  t.equal(target.style['font-family'], 'sans-serif', 'css - inherited');

});

test('copy only white listed styles', (t) => {
  t.plan(3);

  resetHTML();
  computedStyles(source, target.style, { 'color': true, 'margin-left': true });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['font-family'], '', 'css - inherited');
  t.equal(target.style['margin-left'], '10px', 'css - not inherited');

});

test('copy white listed styles, excluding defaults', (t) => {
  t.plan(3);

  resetHTML();
  computedStyles(source, target.style, { 'color': 'rgb(0,0,0)', 'font-family': 'serif', 'margin-left': '0px' });

  t.equal(target.style.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(target.style['margin-left'], '10px', 'css - not inherited');
  t.equal(target.style['font-family'], 'sans-serif', 'css - inherited');

});

test('throws if unexpected type', (t) => {
  t.plan(1);

  resetHTML();
  const source = document.querySelector('#unknown');
  const target = document.querySelector('#unknown2');

  t.throws(function() {
    computedStyles(source, target.style);
  }, null, 'Throws if unexpected type');

});
