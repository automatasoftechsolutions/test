const quizBody = document.getElementById('quizBody');
const scoreLabel = document.getElementById('scoreLabel');
const ansLabel = document.getElementById('ansLabel');
const choices = document.getElementsByClassName('form-check-input');
const submitBtn = document.getElementById('submitBtn');


var n ;
var score ;
var actualAnswer;
var selectedChoices = [];
var correct = [];
var incorrect = [];
var unattempted = [];


loadFirstQuestion();

function loadFirstQuestion(){
  n = 0;
  score = 0;
  loadQuestion();
}

function next(){
  if(n<qsList.length-1){
    n = n+1;
    loadQuestion();
    ansLabel.innerHTML = '';
    submitBtn.disabled = false;
  } 
}


function loadQuestion(){
  selectedChoices = [];
  // scoreLabel.innerHTML = `<b>Score: </b>${score}`;
  nextBtn.disabled = true;
  quizBody.innerHTML = 
    `
    <div id="question"><b>Qs${n+1}/${qsList.length}. ${qsList[n].qs}</b></div>
    <div class="form-check my-3">
    <input class="form-check-input" type="checkbox" value="1" id="1">
    <label class="form-check-label" for="1">
    ${qsList[n].a}
    </label>
  </div>
  <div class="form-check my-3">
    <input class="form-check-input" type="checkbox" value="2" id="2">
    <label class="form-check-label" for="2">
    ${qsList[n].b}
    </label>
  </div>
  <div class="form-check my-3">
    <input class="form-check-input" type="checkbox" value="3" id="3">
    <label class="form-check-label" for="3">
    ${qsList[n].c}
    </label>
  </div>
  <div class="form-check my-3">
    <input class="form-check-input" type="checkbox" value="4" id="4">
    <label class="form-check-label" for="4">
    ${qsList[n].d}
    </label>
  </div>
  `
}





function submit(){
  actualAnswer = qsList[n].ans;  
  selectedChoices = [];
  

  for(i=0;i<choices.length;i++){
    if (choices[i].checked){
      selectedChoices.push(choices[i].value)
      console.log(choices[i].value);
    }
  }
  var receivedAnswer = selectedChoices.join('');
  
  if(receivedAnswer == ''){
    ansLabel.style.background ='rgb(0, 213, 255, 0.5)';
    unattempted.push(n+1);
    score = score;
  } else if (receivedAnswer == actualAnswer){
    // ansLabel.style.background = 'rgba(60, 179, 113, 0.5)';
    ansLabel.style.background = 'lightgreen';
    correct.push(n+1);
    score = score + 4;
  } else{
    ansLabel.style.background = 'rgba(255, 0, 0, 0.5)';
    incorrect.push(n+1);
    score = score - 1;
  }
  scoreLabel.innerHTML = `<b>Score: </b>${score}`;
  ansLabel.innerHTML = 
  `
  <div class="custom-row py-1 px-4 justify-content-between">
  <div class="m-2">Your Response: ${receivedAnswer}</div>
  <div class="m-2">Actual Answer: ${actualAnswer}</div>
  </div>
  `
  for(i=0;i<choices.length;i++){
    choices[i].disabled = true;
  }
  submitBtn.disabled = true;
  nextBtn.disabled = false;

  if(n == qsList.length-1) {

    let userID = Date().toString();
    const buttons = document.getElementById('buttons');
    buttons.innerHTML = 
    `
    <form action="/showResult" method="post" class="w-100 bg-custom text-white d-flex justify-content-center">
    <button type= 'submit' class="p-2 w-100 resultBtn"  name = "showResult" value='["${correct}","${incorrect}","${unattempted}",${score},${qsList.length},"${userID}"]' ">Final Submission</button>
    </form>
    <button class="w-100 text-white p-2 d-flex justify-content-center id= "showResult" onclick="showResult()">Result</button>
    `
  }
}


function addResultContaner(){
  let userID = Date().toString();
  var scorePercentage = score*25/qsList.length;

  document.getElementById('quizContainer').remove();
  document.body. innerHTML = 
  `
  <div class="result-container container shadow-lg p-5">
  <p class="text-center"><b>Result Analysis</b></p>
  <canvas class="p-2" id="myChart"></canvas>
  <div class="w-100 d-flex justify-content-center">
    <p><b> Score: ${score} out of ${qsList.length*4} [ ${scorePercentage}% ]</b></p>
  </div>

  <p>Correct : ${correct.length} [ ${correct} ]</p>   
  <p>Incorrect : ${incorrect.length} [ ${incorrect} ]</p>   
  <p>Unattempted: ${unattempted.length} [ ${unattempted} ]</p>
  <p>Total Qsuestions: ${qsList.length}</p>

  <form action="/home" method="post" class="w-100 bg-custom text-white p-1 d-flex justify-content-center">
  <button type= 'submit' class="p-2 w-100">Home</button>
  </form>
  </div>

  `;
}


// document.getElementById('showResult').addEventListener('click', showResult);

function showResult(){
  

  addResultContaner();
  let theChart = document.getElementById('myChart').getContext('2d');
  // Global Options
  Chart.defaults.font.size = 16;
  let myChart = new Chart(theChart, {
    //type: 'doughnut',
    //type: 'radar',
    //type: 'line',
    //type: 'polarArea',
    type: 'pie',
    // type: 'bar',
    
    data: {
      labels: ['correct', 'incorrect', 'unattempted'],
      datasets: [{
        label: 'Score in %',
        data: [correct.length,incorrect.length,unattempted.length],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
        hoverBorderWidth: 5,
      }]
    },
    options: {
      
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // document.getElementById('showResult').submit();
};


