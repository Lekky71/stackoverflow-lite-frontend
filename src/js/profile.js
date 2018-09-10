window.addEventListener('load', (ev) => {
  getData('/questions/my-questions', (err, res) => {
    if(!err) {
      if(res.status === 'success'){
        saveCookie('token', res.token);
        const user = getSavedUser();

        let popQues = res.questions;
        let rcntQues = res.questions;

        const popQuestionContainer = document.getElementById('popular-questions-container');
        const recentQuestionContainer = document.getElementById('recent-questions-container');

        const username = document.getElementById('username');
        const fullName = document.getElementById('fullname');
        const email = document.getElementById('email');

        const qstCount = document.getElementById('questions-count');
        const ansCount = document.getElementById('answers-count');

        username.innerHTML = user.username;

        popQues = res.questions.sort((a, b) => b.answer_count - a.answer_count);

        popQues.forEach(question => {
          popQuestionContainer.innerHTML += `<div class="question-row">
    <div class="col-2 info">
      <div class="brief-info" style="">
        <div class="counts"><span title="0 answers">${question.answer_count}</span></div>
        <div class="up-line-ans">Answers</div>
        <div class="str-line-ans">${question.answer_count} Answers</div>
        </div>
    </div>
    <div class="col-8 summary" style="text-align: left">
      <h2><a onclick="moveToQuestionPage('${question.question_id}')" href="#" style="font-size: 18px;" class="question-anchor">${question.title}</a></h2>
      <div class="tags">
        ${question.category}
      </div>
      <br/>
        <div style="height: 1px; background-color: slategrey;"></div>
    </div>
    
  </div>`;
        });

        rcntQues = res.questions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        rcntQues.forEach(question => {
          recentQuestionContainer.innerHTML += `<div class="question-row">
    <div class="col-2 info">
      <div class="brief-info" style="">
        <div class="counts"><span title="0 answers">${question.answer_count}</span></div>
        <div class="up-line-ans">Answers</div>
        <div class="str-line-ans">${question.answer_count} Answers</div>
      </div>
    </div>
    <div class="col-8 summary" style="text-align: left">
      <h2><a onclick="moveToQuestionPage('${question.question_id}')" href="#" style="font-size: 18px;" class="question-anchor">${question.title}</a></h2>
      <div class="tags">
        ${question.category}
      </div>
      <br/>
        <div style="height: 1px; background-color: slategrey;"></div>
    </div>
    
  </div>`;
        });
      }
    }
  })
});
