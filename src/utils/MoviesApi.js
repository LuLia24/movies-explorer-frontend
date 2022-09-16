class MoviesApi {
    constructor(options) {
      this._headers = options.headers;
      this._baseUrl = options.baseUrl;
    }
  
    _checkAnswer(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    setAuthorization() {
      if (localStorage.getItem('token')){
        const token = localStorage.getItem('token')
        this._headers.authorization = `Bearer ${token}`
      }
    }
  
    getInitialCards() {
      // this.setAuthorization()
      return fetch(`${this._baseUrl}`, {
        headers: this._headers,
      }).then(this._checkAnswer);
    }
  
    // getUser() {
    //   return fetch(`${this._baseUrl}/users/me`, {
    //     headers: this._headers,
    //   }).then(this._checkAnswer);
    // }
  
    // setUser(name, about) {
    //   return fetch(`${this._baseUrl}/users/me`, {
    //     method: 'PATCH',
    //     headers: this._headers,
    //     body: JSON.stringify({
    //       name: name,
    //       about: about,
    //     }),
    //   }).then(this._checkAnswer);
    // }
  
    // setCard(name, link) {
    //   return fetch(`${this._baseUrl}/cards`, {
    //     method: 'POST',
    //     headers: this._headers,
    //     body: JSON.stringify({
    //       name: name,
    //       link: link,
    //     }),
    //   }).then(this._checkAnswer);
    // }
  
    // deleteCard(cardId) {
    //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
    //     method: 'DELETE',
    //     headers: this._headers,
    //   }).then(this._checkAnswer);
    // }
  
    // setLike(cardId) {
    //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    //     method: 'PUT',
    //     headers: this._headers,
    //   }).then(this._checkAnswer);
    // }
  
    // deleteLike(cardId) {
    //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    //     method: 'DELETE',
    //     headers: this._headers,
    //   }).then(this._checkAnswer);
    // }
  
    // setAvatar(avatar) {
    //   return fetch(`${this._baseUrl}/users/me/avatar`, {
    //     method: 'PATCH',
    //     headers: this._headers,
    //     body: JSON.stringify({
    //       avatar: avatar,
    //     }),
    //   }).then(this._checkAnswer);
    // }
  
   
  }
  
  const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      authorization: '',
      'Content-Type': 'application/json',
    },
  });
  
  export default moviesApi;