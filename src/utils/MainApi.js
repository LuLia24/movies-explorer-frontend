export const BASE_URL = 'https://api.movies.nomorepartiesxyz.ru';

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => {
      try {
        if (res.ok) {
          return res.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      try {
        if (res.ok) {
          return res.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    });
};

export const veryficationToken = (token) => {
  return fetch(`${BASE_URL}/users/me/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      try {
        if (res.ok) {
          return res.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    });
};

export const updateUser = (email,  name) => {
    let jwt
    if (localStorage.getItem('token')){
       
         jwt = localStorage.getItem('token')
    }

    return fetch(`${BASE_URL}/users/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({ email, name }),
    })
      .then((res) => {
        
       
          if (res.ok) {
      
            return res.json();
          } else {
            return Promise.reject(`Ошибка, статус: ${res.status}`)
          }
       
      })

  };