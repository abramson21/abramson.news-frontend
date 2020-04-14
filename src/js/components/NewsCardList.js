/* eslint-disable no-new */
import NewsApi from '../api/NewsApi';
import NewsCard from './NewsCard';

export default class NewsCardList {
  constructor() {
    this._newsArray = [];
    this._value = '';
    this._form = document.forms.search;
    this._input = this._form.elements.searchinput;
    this._button = this._form.elements.button;
    this._resultContainer = document.querySelector('.articles__results-container');
    this._templateNotFound = document.querySelector('#results-not-found');
    this._templateSearchIsLoading = document.querySelector('#results-is-loading');
    this._templateFound = document.querySelector('#results-found');
    this._setHandlers();
  }

  _setHandlers() {
    this._form.addEventListener('submit', (e) => {
      this._value = this._input.value;
      this.renderResults(e);
    });
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('articles__next-button')) {
        this.moreCards();
      }
    });
  }

  renderResults(event) {
    event.preventDefault();
    if (document.querySelector('.articles__results')) {
      this._resultContainer.removeChild(document.querySelector('.articles__results'));
    }
    this._resultContainer.append(this._templateSearchIsLoading.content.cloneNode(true));
    new NewsApi().render(this._value)
      .then((data) => {
        this._resultContainer.removeChild(document.querySelector('.articles__results'));
        if (data.totalResults === 0) {
          this._resultContainer.append(this._templateNotFound.content.cloneNode(true));
          return;
        }
        this._resultContainer.append(this._templateFound.content.cloneNode(true));
        const resultsCard = document.querySelector('.articles-container');
        this._newsArray = data.articles;
        const threeArticles = this._newsArray.slice(0, 3);
        if (threeArticles.length === 0) {
          document.querySelector('.articles__next-button').setAttribute('style', 'display: none');
        }
        this._newsArray = this._newsArray.slice(3);
        threeArticles.forEach((item) => {
          const articlesElement = new NewsCard().create({
            source: item.source.name,
            title: item.title,
            date: item.publishedAt.slice(0, -10),
            text: item.description,
            image: item.urlToImage,
            link: item.url,
            keyword: this._value,
          });
          resultsCard.appendChild(articlesElement);
        });
      })
      .catch((err) => console.log(err));
  }

  moreCards() {
    const resultsCard = document.querySelector('.articles-container');
    const threeArticles = this._newsArray.slice(0, 3);
    this._newsArray = this._newsArray.slice(3);
    if (this._newsArray.length <= 3) {
      document.querySelector('.articles__next-button').setAttribute('style', 'display: none');
      document.querySelector('.articles-container').setAttribute('style', 'margin-bottom: 86px');
    }
    threeArticles.forEach((item) => {
      const articlesElement = new NewsCard().create({
        source: item.source.name,
        title: item.title,
        date: item.publishedAt.slice(0, -10),
        text: item.description,
        image: item.urlToImage,
        link: item.url,
        keyword: this._value,
      });
      resultsCard.appendChild(articlesElement);
    });
  }
}
