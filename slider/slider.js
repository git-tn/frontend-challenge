class Slider {
  currentIndex = 0;

  constructor(selector) {
    // get slider and items
    this.slider = document.querySelector(selector);
    this.items = Array.from(this.slider.children);

    // set slider classes
    this.slider.classList.add('slider');
    this.items.forEach((item, i) => {
      item.classList.add('slider__item');
    });

    // resize observer
    const observer = new ResizeObserver(() => this.updateSlider);
    observer.observe(this.slider);

    this.updateSlider();
  }

  /**
   * update all slider items
   */
  updateSlider() {
    this.items.forEach((page, i) => {
      const x = (i - this.currentIndex) * this.slider.clientWidth;
      page.style.transform = `translateX(${x}px)`;
    });
  }
}
