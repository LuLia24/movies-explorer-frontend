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
      return fetch(`${this._baseUrl}`, {
        headers: this._headers,
      }).then(this._checkAnswer);
    }
   
   
  }
  
  const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      authorization: '',
      'Content-Type': 'application/json',
    },
  });
  
  export default moviesApi;