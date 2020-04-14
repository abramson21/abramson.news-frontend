export default class NewsApi {
  constructor() {
    this._apiKey = 'a9d340576ae040c1a42073c033800530';
    this._url = 'http://newsapi.org';
  }

  render(value) {
    const date = new Date();
    const weekAgoDate = new Date();
    weekAgoDate.setDate(date.getDate() - 7);
    const toDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const fromDate = `${weekAgoDate.getFullYear()}-${weekAgoDate.getMonth() + 1}-${weekAgoDate.getDate()}`;
    const url = `${this._url}/v2/everything?q=${value}&language=ru&apiKey=${this._apiKey}&from=${fromDate}&to=${toDate}&pageSize=100`;
    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      });
  }
}
