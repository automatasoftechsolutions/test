function selectedQuestions4unitTest(){
  var selectedQuestions = 0;
  for(i=0;i<document.getElementsByName('qsContribution').length;i++){
    selectedQuestions = selectedQuestions + eval(document.getElementsByName('qsContribution')[i].value);
  }
  document.getElementById('selectedQs').innerText = "Selected Questions: " + selectedQuestions;
}


function selectedQuestions4unitTestchoice2(){
  var selectedQuestions = 0;
  for(i=0;i<document.getElementsByName('choice2').length;i++){
    selectedQuestions = selectedQuestions + eval(document.getElementsByName('choice2')[i].value);
  }
  document.getElementById('selectedQs').innerText = "Selected Questions: " + selectedQuestions;
}

function selectedQuestions4unitTestchoice3(){
  var selectedQuestions = 0;
  for(i=0;i<document.getElementsByName('choice3').length;i++){
    selectedQuestions = selectedQuestions + eval(document.getElementsByName('choice3')[i].value);
  }
  document.getElementById('selectedQs').innerText = "Selected Questions: " + selectedQuestions;
}

function selectedQuestions4chapterTest(){
  var selectedQuestions = 0;
  for(i=0;i<document.getElementsByName('qsContribution').length;i++){
    selectedQuestions = selectedQuestions + eval(document.getElementsByName('qsContribution')[i].value);
  }
  document.getElementById('selectedQs').innerText = "Selected Questions: " + selectedQuestions;
}

