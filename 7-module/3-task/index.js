import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {

  this.steps = steps;
  this.value = value
  this.elem = createElement(`
  <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      ${'<span></span>'.repeat(this.steps)}
    </div>
  </div>
`);
    let container = document.querySelector('.container');
    container.append(this.elem);
    this.addEventLisener();
  }

  addEventLisener() {
    let slider = document.querySelector('.slider');
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = document.querySelector('.slider__value');
    let sliderSteps = this.elem.querySelector('.slider__steps');
    sliderSteps.firstElementChild.classList.add('slider__step-active');
    slider.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active')
      let leftPercents = valuePercents;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      sliderValue.innerHTML = value;
      sliderSteps.childNodes[value + 1].classList.add('slider__step-active')
      sliderValue.innerHTML = value
      this.value = value;
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }))
    });

  }
}
