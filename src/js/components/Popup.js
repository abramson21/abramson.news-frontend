import { ESCAPE_CODE } from '../constans/constans';
// eslint-disable-next-line import/no-cycle
import Validator from './Validator';

export default class Popup {
  constructor(selector) {
    this._container = document.body.querySelector('.page');
    this._template = document.querySelector(selector).content.querySelector('.popup');
    this._element = this._template.cloneNode(true);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setContent() {
    this._container.appendChild(this._element);
    document.addEventListener('keyup', this._handleEscClose);
  }

  clearContent() {
    this._element.remove();
    document.removeEventListener('keyup', this._handleEscClose);
  }

  open() {
    this.setContent();
    this._element.classList.add('popup_is-opened');
    this._setEventListeners();
    const validator = new Validator(this._element.id);
  }

  close() {
    this._element.classList.remove('popup_is-opened');
    this.clearContent();
  }

  _setEventListeners() {
    this._element.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_is-opened')) {
        this.close();
      }
    });
  }

  render() {
    this._container.removeChild(document.querySelector('.popup'));
  }

  _handleEscClose(e) {
    if (e.keyCode === ESCAPE_CODE) {
      this.close();
    }
  }
}
