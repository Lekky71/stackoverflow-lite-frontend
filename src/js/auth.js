window.addEventListener('load', (ev) => {
  console.log('Page has been loaded');
  const loginForm = document.getElementById('login-form');
  const rootUrl = 'http:/127.0.0.1:3000/api/v1';

  let postData = (url, data, callback) => {
    return fetch(rootUrl + url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(response => {
        response.json()
          .then( res => {
            console.log(JSON.stringify(res));
            if(callback) callback(null, res)
          })
          .catch(error => {
            if (callback) callback(error, null)
          });
      })
  };

  loginForm.addEventListener('submit', (event) => {
    console.log('Seeing submit click');
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    postData('/auth/login', {username, password}, (err, res) => {
      if(!err) {
        console.log(res);
      }
    })

  });
});

