/* eslint-disable no-new */
import MainApi from '../api/MainApi';
// eslint-disable-next-line import/no-cycle
import Popup from './Popup';
import { EMAIL_REGEXP, NAME_REGEXP } from '../constans/constans';
import {
  SERVER_BAD_REQUEST_ERROR,
  SERVER_INTERNAL_ERROR,
  SERVER_NOT_AUTHORIZED_ERROR,
  SERVER_NOT_FOUND_ERROR,
  INPUT_IS_EMPTY_ERROR,
  INPUT_NOT_NAME_ERROR,
  INPUT_NOT_EMAIL_ERROR,
  INPUT_SMALL_NAME_ERROR,
  INPUT_SMALL_PASS_ERROR,
} from '../constans/error-constans';
import Header from './Header';

const connection = new MainApi({
  url: 'https://abramson.gq',
  token: localStorage.getItem('token'),
});


export default class Validator {
  constructor(form) {
    this._form = document.forms[form];
    this._button = this._form.elements.button;
    this._inputs = Array.from(this._form).filter((item) => item.nodeName === 'INPUT');
    this._setEventListener(this._inputs, this._form);
    this._disableButton();
  }

  setServerError(res) {
    if (res.status === 500) {
      throw new Error(SERVER_INTERNAL_ERROR);
    } else if (res.status === 401) {
      throw new Error(SERVER_NOT_AUTHORIZED_ERROR);
    } else if (res.status === 404) {
      throw new Error(SERVER_NOT_FOUND_ERROR);
    } else if (res.status === 400) {
      throw new Error(SERVER_BAD_REQUEST_ERROR);
    } else if (res.message === 'Такой почтовый ящик уже существует') {
      throw new Error(res.message);
    }
  }

  _setEventListener(inputs, form) {
    inputs.forEach((item) => item.addEventListener('keyup', (event) => {
      this._handleValidate(event);
      this._checkForm(inputs);
    }));
    form.addEventListener('submit', (event) => {
      this._submitForm(event, form, inputs);
    });
  }

  _handleValidate(event) {
    this.resetError(event.target);
  }

  _validate(element) {
    const errorMessages = {
      isempty: INPUT_IS_EMPTY_ERROR,
      notmail: INPUT_NOT_EMAIL_ERROR,
      littlepass: INPUT_SMALL_PASS_ERROR,
      notname: INPUT_NOT_NAME_ERROR,
      littlename: INPUT_SMALL_NAME_ERROR,
    };
    const errorElement = document.querySelector(`.error__${element.name}`);
    if (!element.checkValidity()) {
      errorElement.textContent = errorMessages.isempty;
      this.activateError(element);
      return false;
    }
    if (element.name == 'password') {
      if (element.value.length < 8) {
        errorElement.textContent = errorMessages.littlepass;
        this.activateError(element);
        return false;
      }
    }
    if (element.name == 'email') {
      const emailRegExp = EMAIL_REGEXP;
      if (!emailRegExp.test(element.value)) {
        errorElement.textContent = errorMessages.notmail;
        this.activateError(element);
        return false;
      }
    }
    if (element.name == 'name') {
      const nameRegExp = NAME_REGEXP;
      if (!nameRegExp.test(element.value)) {
        errorElement.textContent = errorMessages.notname;
        this.activateError(element);
        return false;
      }
      if (element.value.length < 2 || element.value.length > 30) {
        errorElement.textContent = errorMessages.littlename;
        this.activateError(element);
        return false;
      }
    }
    this.resetError(element);
    return true;
  }

  activateError(element) {
    element.parentNode.classList.add('form__input-container_invalid');
    this._disableButton();
  }

  resetError(element) {
    element.parentNode.classList.remove('form__input-container_invalid');
    // eslint-disable-next-line no-param-reassign
    element.textContent = '';
  }

  _enableButton() {
    this._button.classList.add('form__save-button');
    this._button.removeAttribute('disabled');
  }

  _disableButton() {
    this._button.classList.remove('form__save-button');
    this._button.setAttribute('disabled', true);
  }

  _checkForm(inputs) {
    let isValidForm = true;
    inputs.forEach((elem) => {
      if (!this._validate(elem)) {
        isValidForm = false;
      }
    });
    if (isValidForm) {
      this._enableButton();
      return true;
    }
    this._disableButton();
    return false;
  }

  _submitForm(event, form, inputs) {
    event.preventDefault();
    this._checkForm(inputs);
    const formName = form.dataset.form;
    console.log(formName);
    const serverErrorSpan = form.querySelector('.error__server-error');
    if (formName === 'login') {
      connection.signinUser(inputs[0].value, inputs[1].value)
        .then((res) => (res.ok ? res.json() : this.setServerError(res)))
        .then((res) => {
          localStorage.setItem('token', res.jwt);
          console.log(res);
          new Popup('#signin-tpl').render();
          new Header().clearContent();
          new Header().render();
        })
        .catch((error) => {
          if (error.message == 'Failed to fetch') {
            serverErrorSpan.textContent = SERVER_INTERNAL_ERROR;
            return;
          }
          console.log('ошибка');

          serverErrorSpan.textContent = error.message;
        });
    } else if (formName === 'signup') {
      connection.signupUser(inputs[0].value, inputs[1].value, inputs[2].value)
        .then((res) => (res.ok ? res.json() : this.setServerError(res)))
        .then(() => {
          new Popup('#signin-tpl').render();
          new Popup('#thanks-tpl').open();
        })
        .catch((error) => {
          if (error.message == 'Failed to fetch') {
            serverErrorSpan.textContent = SERVER_INTERNAL_ERROR;
            return;
          }
          serverErrorSpan.textContent = error.message;
        });
    }
  }
}
