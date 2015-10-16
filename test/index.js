import test from 'tape';
import computedStyles from '../src/';

document.body.innerHTML += `
    <style>
      div {
        font-family: sans-serif;
      }
    </style>
    <div id="node" style="color: rgb(255, 0, 0);"></div>`;

test('computedStyles', (t) => {
  t.plan(3);

  const node = document.querySelector('#node');
  const styles = computedStyles(node);

  t.equal(styles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(styles['font-family'], 'sans-serif', 'css');

  t.throws(function() {
    computedStyles(document.querySelector('#unknown'));
  }, null, 'Throws if unexpected type');

});
