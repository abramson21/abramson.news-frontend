import Popup from './Popup';

export default class EventListener {
  _setEventListener() {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__login-button')) {
        new Popup('#signin-tpl').open();
      }
      if (e.target.classList.contains('popup__signup-button')) {
        new Popup('#signup-tpl').render();
        new Popup('#signup-tpl').open();
      }
      if (e.target.classList.contains('popup__signin-button')) {
        new Popup('#signup-tpl').render();
        new Popup('#signin-tpl').open();
      }
    });
  }
}
