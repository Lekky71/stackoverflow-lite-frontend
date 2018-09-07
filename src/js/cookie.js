const saveCookie = (name, value) => {
  const cook = `${name}=${value};path=/`
  document.cookie = cook;
};
const rootUrl = 'http://127.0.0.1:3000/api/v1';


const getCookie = (cname) => {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const getSavedUser = () => {
  const userString = getCookie('user');
  if(userString.length > 5) return JSON.parse(userString);
  return null;
};

const postData = (url, data, callback) => {
  return fetch(rootUrl + url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'x-access-token': getCookie('token')
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(response => {
      response.json()
        .then( res => {
          if(callback) callback(null, res)
        })
        .catch(error => {
          if (callback) callback(error, null)
        });
    })
};

const getData = (url, callback) => {
  return fetch(rootUrl + url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Accept': 'application/json',
      'x-access-token': getCookie('token')
    },
  })
    .then(response => {
      response.json()
        .then( res => {
          if(callback) callback(null, res)
        })
        .catch(error => {
          if (callback) callback(error, null)
        });
    })
};