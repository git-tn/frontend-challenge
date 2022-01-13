class Slider {
  currentIndex = 0;
  moveX = 0;

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

    // mouse events
    this.slider.addEventListener('mousedown', (event) => {
      this.startDrag(event);
    });
    this.slider.addEventListener('mousemove', (event) => {
      this.dragging(event);
    });
    this.slider.addEventListener('mouseout', () => {
      this.endDrag(false);
    });
    this.slider.addEventListener('mouseup', () => {
      this.endDrag(true);
    });

    this.updateSlider();
  }

  startDrag(touch) {
    if (!this.touch0) {
      this.touch0 = touch;
    }
  }

  dragging(touch) {
    if (this.touch0) {
      this.moveX = touch.clientX - this.touch0.clientX;
      this.updateSlider();
    }
  }

  endDrag(isTouchUp) {
    if (this.touch0) {
      this.touch0 = null;

      const dx = isTouchUp ? this.slider.clientWidth / 2 : 0;

      if (this.moveX < -dx && this.currentIndex < this.items.length - 1) {
        this.currentIndex++;
      } else if (this.moveX > dx && this.currentIndex > 0) {
        this.currentIndex--;
      }

      this.moveX = 0;
      this.updateSlider();
    }
  }

  /**
   * update all slider items
   */
  updateSlider() {
    this.items.forEach((page, i) => {
      const x = (i - this.currentIndex) * this.slider.clientWidth + this.moveX;
      page.style.transform = `translateX(${x}px)`;
    });
  }
}
