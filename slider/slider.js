class Slider {
  constructor(selector) {
    // get slider and items
    this.slider = document.querySelector(selector);
    this.items = Array.from(this.slider.children);

    // set slider classes
    this.slider.classList.add('slider');
    this.items.forEach((item, i) => {
      item.classList.add('slider__item');
    });
  }
}
