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

/**
 * shuffle tiles
 * @param n: random count
 */
function shuffle(n = 100) {
  // get tile elements and empty pos
  const tiles = Array.from(document.querySelectorAll(`.puzzle .tile`));
  const box = document.querySelector(`.puzzle`);
  let [x0, y0] = getPos(box);

  for (let i = 0; i < n; i++) {
    // get movable tiles (position)
    const positions = [];
    function checkInside(x, y) {
      if (x >= 0 && y >= 0 && x < 3 && y < 3) {
        positions.push([x, y]);
      }
    }
    checkInside(x0 - 1, y0);
    checkInside(x0 + 1, y0);
    checkInside(x0, y0 - 1);
    checkInside(x0, y0 + 1);

    // random position
    const randomIndex = Math.floor(Math.random() * positions.length);
    const [x1, y1] = positions[randomIndex];

    // moving tile
    for (let i = 0; i < tiles.length; i++) {
      const [x, y] = getPos(tiles[i]);
      if (x === x1 && y == y1) {
        setPos(tiles[i], x0, y0, true);
        x0 = x;
        y0 = y;
        break;
      }
    }
  }

  // save empty position
  setPos(box, x0, y0);
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
