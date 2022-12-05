import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(
      `<div class="slider">
<div class="slider__thumb" style="left: 75%">
  <span class="slider__value">${this.value}</span>
</div>
<div class="slider__progress" style="width: 75%"></div>
<div class="slider__steps">
</div>
</div>`
    );
    this.sliderSteps();
    this.addEventListeners();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.thumb.ondragstart = () => false;
    this.dragEvents();
  }

  sliderSteps = () => {
    let wrapSliderSteps = this.elem.querySelector(".slider__steps");
    for (var i = 1; i <= this.steps; i++) {
      wrapSliderSteps.innerHTML += "<span></span>";
    }
    let spans = wrapSliderSteps.querySelectorAll("span");
    spans[this.value].classList.add("slider__step-active");
  };

  changePosition = (el) => {
    let segments = this.steps - 1;
    let left = el.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    this.value = value;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = document.querySelector('.slider__value');
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    sliderValue.textContent = value;

    let eventCustom = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(eventCustom);

    let span = this.elem.querySelectorAll(".slider__steps span");
    for (let item of span) {
      item.classList.remove("slider__step-active");
    }
    span[value].classList.add("slider__step-active");
  };

  addEventListeners() {
    this.elem.addEventListener("click", this.changePosition);
  }

  dragEvents() {
    this.thumb.addEventListener("pointerdown", this.pointerdown);
    this.thumb.addEventListener("pointerup", this.pointerup);
  }

  pointerdown = () => {
    this.thumb.addEventListener("pointermove", this.pointermove);
    this.elem.classList.add("slider_dragging");
  };

  pointerup = () => {
    this.thumb.removeEventListener("pointermove", this.pointermove);
    this.elem.classList.remove("slider_dragging");

    let eventCustom = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(eventCustom);
  };

  pointermove = (event) => {
    let segments = this.steps - 1;
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    this.value = value;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    this.elem.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
    this.elem.querySelector(
      ".slider__progress"
    ).style.width = `${leftPercents}%`;
    this.elem.querySelector(".slider__value").textContent = value;
  };
}
