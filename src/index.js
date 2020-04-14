/* eslint-disable no-new */
import './style.css';
import EventListener from './js/components/EventListener';
import Popup from './js/components/Popup';
import Validator from './js/components/Validator';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';

new EventListener()._setEventListener();
new Header().render();
new Validator('search');

new NewsCardList();
