import './style.css';
import Header from '../../js/components/Header';
import SaveArticles from '../../js/components/SaveArtciles';
import MainApi from '../../js/api/MainApi';

const saveArticles = new SaveArticles();

const connect = new MainApi({
  url: 'https://api.pridanov.site',
  token: localStorage.getItem('token'),
});

new Header().render();

saveArticles.render();
