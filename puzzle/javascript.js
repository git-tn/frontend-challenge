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

/**
 * @param el: html element
 * @returns [x, y]: position x, y
 */
function getPos(el) {
  const [x, y] = el.getAttribute('data-pos').split(',');
  return [parseInt(x), parseInt(y)];
}

window.onload = function () {
  // save empty pos
  const box = document.querySelector(`.puzzle`);
  setPos(box, 2, 2);

  // get tile elements
  const tiles = Array.from(document.querySelectorAll(`.puzzle .tile`));

  // initialize tiles
  tiles.forEach((tile, i) => {
    const x = Math.floor(i % 3);
    const y = Math.floor(i / 3);
    setPos(tile, x, y, true);

    // add click event
    tile.addEventListener('click', () => {
      const [tileX, tileY] = getPos(tile);
      const [emptyX, emptyY] = getPos(box);

      // check movement possibility
      if (Math.abs(tileX - emptyX) + Math.abs(tileY - emptyY) === 1) {
        setPos(tile, emptyX, emptyY, true);
        setPos(box, tileX, tileY);
      }
    });
  });
};
