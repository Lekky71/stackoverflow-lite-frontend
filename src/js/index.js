const moveToQuestionPage = (questionId) => {
  saveCookie('question_id', questionId);
  window.location.href = './question.html';

};

window.addEventListener('load', (ev) => {
  const user = getSavedUser();
  if (!user) {
    window.location.href = './login.html';
  }

  if(window.location.href.search('index') !== -1) {
    getData('/questions', (err, res) => {
      if (res.status === 'success') {
        saveCookie('token', res.token);
        const questions = res.questions;
        const homeContainer = document.getElementById('questions-container');

        questions.forEach(question => {
          homeContainer.innerHTML += `<div class="question-row">
    <div class="col-2 info">
      <div class="brief-info" style="">
        <div class="counts"><span title="0 answers">${question.answer_count}</span></div>
        <div>Answers</div>
      </div>
    </div>
    <div class="col-8 summary" style="text-align: left">
      <h2><a onclick="moveToQuestionPage('${question.question_id}')" href="#" style="font-size: 18px;" class="question-anchor">${question.title}</a></h2>
      <div class="tags">
        <h4>${question.category}</h4>
      </div>
      <div></div>
    </div>
  </div>`;
        });
      }
    });

  }
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = document.getElementById('search-input').value;
    saveCookie('search_input', searchText);
    window.location.href = './search.html';
  });
});
