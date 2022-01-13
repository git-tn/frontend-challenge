/**
 * @param el: html element
 * @param x: position x
 * @param y: position y
 * @param isTile: if true, el is tile
 */
function setPos(el, x, y, isTile) {
  el.setAttribute('data-pos', `${x},${y}`);
  if (isTile) {
    el.style.top = `${10 + 68 * y}px`;
    el.style.left = `${10 + 68 * x}px`;
  }
}

window.onload = function () {
  // get tile elements
  const tiles = Array.from(document.querySelectorAll(`.puzzle .tile`));

  // initialize tiles
  tiles.forEach((tile, i) => {
    const x = Math.floor(i % 3);
    const y = Math.floor(i / 3);
    setPos(tile, x, y, true);
  });

  // save empty pos
  const box = document.querySelector(`.puzzle`);
  setPos(box, 2, 2);
};
