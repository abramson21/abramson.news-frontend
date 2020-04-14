export default class MainApi {
  constructor(options) {
    this.url = options.url;
    this.token = options.token;
  }

  signinUser(emailValue, passwordValue) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });
  }

  signupUser(emailValue, passwordValue, nameValue) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        name: nameValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  createArticle(data) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      body: JSON.stringify({
        keyword: data.keyword,
        title: data.title,
        text: data.text,
        date: data.date,
        source: data.source,
        link: data.link,
        image: data.image,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject();
      });
  }

  getArticles() {
    return fetch(`${this.url}/articles`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject();
      });
  }

  deleteArticle(articeID) {
    return fetch(`${this.url}/articles/${articeID}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject();
      });
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject();
      });
  }
}
