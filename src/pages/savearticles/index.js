/* eslint-disable no-return-assign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './style.css';
import Header from '../../js/components/Header';
import SaveArticles from '../../js/components/SaveArtciles';
import MainApi from '../../js/api/MainApi';

const saveArticles = new SaveArticles();

const connect = new MainApi({
  url: 'https://abramson.gq',
  token: localStorage.getItem('token'),
});

new Header().render();

saveArticles.render();
