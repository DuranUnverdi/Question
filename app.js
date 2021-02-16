function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};
Quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionIndex;
};
Quiz.prototype.guess = function (answer) {
  var questions = this.getQuestion();
  if (questions.checkAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

var q1 = new Question(
  "what's the best programming",
  ["C#", "Javascript", "Python", "asp.net"],
  "Javascript"
);
var q2 = new Question(
  "what's the most popular language ?",
  ["C#", "visual basic", "node js", "Javascript"],
  "Javascript"
);
var q3 = new Question(
  "what's the best modern language ?",
  ["C#", "visual basic", "node js", "Javascript"],
  "Javascript"
);
var q4 = new Question(
  "what is the fastest programming language?",
  ["C#", "visual basic", "node js", "Javascript"],
  "Javascript"
);
var q5 = new Question(
  "what is the most useful programming language",
  ["C#", "visual basic", "node js", "Javascript"],
  "C#"
);
var questions = [q1, q2, q3, q4, q5];
var quiz = new Quiz(questions);

loadQuestion();
function loadQuestion() {
  if (quiz.isFinish()) {
    showScore();
  } else {
    var question = quiz.getQuestion();
    var choices = question.choices;
    document.querySelector("#question").textContent = question.text;
    for (var i = 0; i < choices.length; i++) {
      var element = document.querySelector("#choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}
function guess(id, guess) {
  var btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(guess);
    loadQuestion();
  };
}
function showScore() {
  var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
  document.querySelector(".card-body").innerHTML = html;
}
function showProgress() {
  var totalQuestion = quiz.questions.length;
  var questionNumber = quiz.questionIndex + 1;
  document.querySelector("#progress").innerHTML =
    " Question " + questionNumber + " of " + totalQuestion;
}
