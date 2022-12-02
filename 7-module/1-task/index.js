import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.currentSlideNumber = 0;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);

    let menu = this.categories.map(item => createElement(`
    <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`));

    this.sub('inner').append(...menu);
    this.update();
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  update() {
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    arrowRight.onclick = () => {ribbonInner.scrollBy(350, 0)};
    arrowLeft.onclick = () => {ribbonInner.scrollBy(-350, 0)};
    let scrollLeft = ribbonInner.scrollLeft;
    if (scrollLeft == 0) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    }

    console.log(scrollLeft);
  }

  addEventListeners() {
    this.elem.onclick = ({ target }) => {
      let button = target.closest('.ribbon__item');
      if (button) {
        let category = target.closest('[data-id]').dataset.id;

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: category,
          bubbles: true
        }));
      }
    };
    let parent = this.elem.querySelector('.ribbon__inner');
    let menuItem = parent.querySelectorAll('.ribbon__item');
    parent.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('ribbon__item')) {
        for (let i = 0; i < menuItem.length; i++) {
          menuItem[i].classList.remove('ribbon__item_active');
        }
        target.classList.add('ribbon__item_active');
      }
    });
  }
}
