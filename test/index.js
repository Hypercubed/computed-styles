import test from 'tape';
import computedStyles from '../src/';

const html = `
    <style>
      div {
        font-family: sans-serif;
      }
    </style>
    <div id="node" style="color: rgb(255, 0, 0);"></div>`;

var node;

const t = document.createElement("div");
document.body.appendChild(t);

function resetDOM() {
  t.innerHTML = html;
  node = document.querySelector('#node');
}

test('computedStyles', (t) => {
  t.plan(2);

  resetDOM()
  const styles = computedStyles(node);

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], 'sans-serif', 'css');

});

test('throws if unexpected type', (t) => {
  t.plan(1);

  resetDOM()

  t.throws(function() {
    computedStyles(document.querySelector('#unknown'));
  }, null, 'Throws if unexpected type');

});
