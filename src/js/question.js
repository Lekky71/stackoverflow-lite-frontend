window.addEventListener('load', (ev) => {
  const fetchQuestion = (questionId) => {
    getData(`/questions/${questionId}`, (err, res) => {
      if (res.status === 'success') {
        window.location.href = './login.html';
      }
    });
  };

});
