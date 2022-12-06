import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  this.render();
  }

  render() {
      this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>
      `)
    let modalClose = this.elem.querySelector('.modal__close');
    modalClose.onclick = () => {
        this.close();
        document.removeEventListener('keydown', keydownEv);
      }
      let keydownEv = (e) => {
        if (e.key === 'Escape') {
          this.close()
          document.removeEventListener('keydown', keydownEv);
        }
    }
    document.addEventListener('keydown', keydownEv);
  }

  open() {
    let body = document.body;
    body.classList.add('is-modal-open');
    body.append(this.elem);

  }

  setTitle(modaltitle) {
    let h3ModalTitle = this.elem.querySelector('.modal__title');
    h3ModalTitle.innerHTML = modaltitle;
  }

  setBody(node) {
    let divModalBody = this.elem.querySelector('.modal__body');
    divModalBody.innerHTML ='';
    divModalBody.append(node);
  }

  close() {
    let body = document.body;
    let modal = document.querySelector('.modal');
    if (modal) {
    body.classList.remove('is-modal-open');
    modal.remove();
    }
  }
}
