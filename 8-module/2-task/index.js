import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`)
    this.render()
  }

  render() {
    this.gridInner = this.elem.querySelector('.products-grid__inner');
this.gridInner.innerHTML = this.products.map((item) => {
  return (`
  <div class="card">
  <div class="card__top">
      <img src="/assets/images/products/${item.image}" class="card__image" alt="product">
      <span class="card__price">€${item.price.toFixed(2)}</span>
  </div>
  <div class="card__body">
      <div class="card__title">${item.name}</div>
      <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
  </div>
  </div>
  `)
}).join('');}

updateFilter(filters) {

  Object.assign(this.filters, filters);
  this.selected = [];

for (let item of this.products) {
  if (this.filters.noNuts && item.nuts) {
    continue;
  }

  if (this.filters.vegeterianOnly && !item.vegeterian) {
    continue
  }

  if (this.filters.maxSpiciness != undefined && item.spiciness > this.filters.maxSpiciness) {
    continue
  }

  if (this.filters.category && item.category != this.filters.category) {
    continue
  }
  this.selected.push(`
  <div class="card">
  <div class="card__top">
      <img src="/assets/images/products/${item.image}" class="card__image" alt="product">
      <span class="card__price">€${item.price.toFixed(2)} </span>
  </div>
  <div class="card__body">
      <div class="card__title">${item.name}</div>
      <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
  </div>
  </div>
  `);
}
this.gridInner.innerHTML = this.selected.join('');
}
}
