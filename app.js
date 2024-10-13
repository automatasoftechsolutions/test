require('./public/js/data.js')
require('./public/js/syllabus.js')
require('./public/js/demoQuestionBankHindiEng.js')
require('./public/js/demoQuestionBank2.js')
// require('./public/js/demoQuestionBank.js')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const { disabled } = require('express/lib/application');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// homePage
app.get('/', function(req, res){
  res.render('stream', {PAGETITLE: 'QBMS'});
  // res.render('quizMaster', {PAGETITLE: 'QUIZ-MASTER'});
  //res.render('quizType', {PAGETITLE: 'QUIZ-MASTER'});
  //res.render('quizType', {PAGETITLE: 'QUIZ-MASTER'});
});

app.post('/home', function(req, res){
  res.render('stream', {PAGETITLE: 'QBMS-PAPERS'});
  // res.render('quizMaster', {PAGETITLE: 'QUIZ-MASTER'});
  // res.render('quizType', {PAGETITLE: 'QUIZ-MASTER'});
});


sourceQuestions();

app.post('/stream', function(req, res){
  console.log('QBMS');``
  let stream = req.body.STREAM;
  console.log(stream);
  
  if(stream === 'iitjee'){
    res.render('iitjee', {PAGETITLE: 'IIT-JEE'});
  } else if(stream === 'neet'){
    res.render('neet', {PAGETITLE: 'NEET'});
  } else if(stream === 'foundation'){
    res.render('foundation', {PAGETITLE: 'FOUNDATION'});
  } else {
    res.render('miscellaneous', {PAGETITLE: 'MISCELLANEOUS'} );
  }
});  

app.post('/neet_subject', function(req, res){
  console.log('Selected Subject:');``
  let neet_subject = req.body.SUBJECT;
  console.log(neet_subject);
  
  if(neet_subject === 'physics'){
    res.render('neet_physics', {PAGETITLE: 'PHYSICS'});
  } else if(neet_subject === 'chemistry'){
    res.render('neet_chemistry', {PAGETITLE: 'CHEMISTRY'});
  } else if(neet_subject === 'biology'){
    res.render('neet_biology', {PAGETITLE: 'BIOLOGY'});
  } else {
    res.render('neet_fullsyllabus', {PAGETITLE: 'FULL SYLLABUS'} );
  }
});  

app.post('/result', function(req, res){
    res.render('result', {PAGETITLE: 'AVAILABLE PAPERS'});
});  

app.post('/quizType', function(req, res){
  console.log(questionTypes[0]);``
  let quizType = req.body.QUIZTYPE;
  console.log(quizType);
  if(quizType === 'topicTest'){
    res.render('topicTest', {PAGETITLE: 'Topic Wise Test'});
  } else if(quizType === 'chapterTest'){
    res.render('chapterTest', {PAGETITLE: 'Chapter Wise Test'});
  } else if(quizType === 'unitTest'){
    res.render('unitTest', {PAGETITLE: 'UNIT Test'});
  } else {
    xi = [xiMCQ.length,xidiagramBased.length,xiMTC.length,xiStatements.length,xiAssertionReason.length,xiPYP.length,xiNCERTplus.length];
    xii = [xiiMCQ.length,xiidiagramBased.length,xiiMTC.length,xiiStatements.length,xiiAssertionReason.length,xiiPYP.length,xiiNCERTplus.length];
    neet = [neetMCQ.length,neetdiagramBased.length,neetMTC.length,neetStatements.length,neetAssertionReason.length,neetPYP.length,neetNCERTplus.length];
    res.render('fullSyllabusPaper', {PAGETITLE: 'FULL SYLLABUS Test', XI: xi, XII: xii, NEET: neet} );
  }
});  

// selectChapters4topicTest
// get required chapter numbers
app.post('/selectChapters4topicTest', function(req, res){
  var requiredchapternumbers = [];
  var requiredChapters = req.body.CHAPTERNUMBER;
  console.log(requiredChapters,'**********');

  if(typeof requiredChapters != "object"){
    requiredchapternumbers.push(parseInt(requiredChapters));
  } else  {
    for(let i=0; i<requiredChapters.length;i++){
      requiredchapternumbers.push(parseInt(requiredChapters[i]));
    }
  }

  // Add required chapter Names
  requiredchapternames = [];

  for(i=0; i<requiredchapternumbers.length;i++){
    requiredchapternames.push(chapternames[requiredchapternumbers[i]-1])
  }
  console.log(requiredchapternames);

  chapter4topics = eval(`c${requiredChapters}topics`);

  TOTALMCQ = eval(`c${requiredChapters}t1MCQ.length`);
  TOTALST = eval(`c${requiredChapters}t1Statements.length`);
  TOTALMTC = eval(`c${requiredChapters}t1MTC.length`);
  TOTALDB = eval(`c${requiredChapters}t1diagramBased.length`);
  TOTALASSERTIONREASON = eval(`c${requiredChapters}t1AssertionReason.length`);
  TOTALPYP = eval(`c${requiredChapters}t1PYP.length`);
  TOTALNCERTPLUS = eval(`c${requiredChapters}t1NCERTplus.length`);



  console.log(chapter4topics);  
  // console.log(TOTALMCQS);  
  let finalchapternumbers = `[${requiredchapternumbers}]`;


  console.log('final chapter numbers: ', finalchapternumbers);

  chapterArray  = eval(finalchapternumbers);

  totalTopics = eval(`c${chapterArray[0]}topics.length`);

  topicMCQs = [];
  for(i=0;i<totalTopics;i++){
    topicmcqlength = `c${chapterArray[0]}t${[i+1]}MCQ.length`
    topicMCQs.push(eval(topicmcqlength));
  }
  topicST = [];
  for(i=0;i<totalTopics;i++){
    topicSTlength = `c${chapterArray[0]}t${[i+1]}Statements.length`
    topicST.push(eval(topicSTlength));
  }
  topicMTC = [];
  for(i=0;i<totalTopics;i++){
    topicMTClength = `c${chapterArray[0]}t${[i+1]}MTC.length`
    topicMTC.push(eval(topicMTClength));
  }
  topicDB = [];
  for(i=0;i<totalTopics;i++){
    topicDBlength = `c${chapterArray[0]}t${[i+1]}diagramBased.length`
    topicDB.push(eval(topicDBlength));
  }
  topicAR = [];
  for(i=0;i<totalTopics;i++){
    topicARlength = `c${chapterArray[0]}t${[i+1]}AssertionReason.length`
    topicAR.push(eval(topicARlength));
  }
  topicPYP = [];
  for(i=0;i<totalTopics;i++){
    topicPYPlength = `c${chapterArray[0]}t${[i+1]}PYP.length`
    topicPYP.push(eval(topicPYPlength));
  }
  topicNP = [];
  for(i=0;i<totalTopics;i++){
    topicNPlength = `c${chapterArray[0]}t${[i+1]}NCERTplus.length`
    topicNP.push(eval(topicNPlength));
  }











  // Render the Topic Wise Test Page
  res.render('customTopicTest', {
    PAGETITLE: 'CUSTOM TOPIC TEST', 
    FINALCHAPTERNUMBERS: finalchapternumbers,
    TOPICMCQS: topicMCQs,
    TOPICST: topicST,
    TOPICMTC: topicMTC,
    TOPICDB: topicDB,
    TOPICAR: topicAR,
    TOPICPYP: topicPYP,
    TOPICNP: topicNP
  });
});

// Custom topic test formation
app.post('/customTopicTest', function(req, res){
  requiredchapternumbers = eval(req.body.FINALCHAPTERS)
    var newList = [];
    
    // for(i=0;i<requiredchapternumbers.length;i++){
      // for(i=0;i<4;i++){
      for(i=0;i<chapter4topics.length;i++){
        let qsContribution = req.body.qsContribution.map(Number);
        console.log(qsContribution);
        // console.log(requiredchapternumbers);

        mcqList= eval("c" + requiredchapternumbers[0] + "t" + [i+1] +"MCQ");
        dbList= eval("c" + requiredchapternumbers[0] + "t" + [i+1] + "diagramBased");
        mtcList= eval("c" + requiredchapternumbers[0] + "t" + [i+1] + "MTC");
        stList= eval("c" + requiredchapternumbers[0] + "t" + [i+1] + "Statements");
        arList= eval("c" + requiredchapternumbers[0] + "t" + [i+1] + "AssertionReason");
        pypList= eval("c" + requiredchapternumbers[0] + "t" + [i+1] + "PYP");
        NCERTplusList= eval("c" + requiredchapternumbers[0] + "t" + [i+1] + "NCERTplus");
        
        totalMCQs = mcqList.length;
        totalDBs = dbList.length;
        totalMTCs = mtcList.length;
        totalSTs = stList.length;
        totalARs = arList.length;
        totalPYPs = pypList.length;
        totalNCERTplus = NCERTplusList.length;
    
        var n = i*7;
    
        requiredMCQs = qsContribution[n+0];
        requiredSTs = qsContribution[n+1];
        requiredMTCs = qsContribution[n+2];
        requiredDBs = qsContribution[n+3];
        requiredARs = qsContribution[n+4];
        requiredPYPs = qsContribution[n+5];
        requiredNCERTplus = qsContribution[n+6];

        // console.log('---------');
        // console.log(qsContribution[n+0]);
        // console.log(qsContribution[n+1]);
        // console.log(qsContribution[n+2]);
        // console.log(qsContribution[n+3]);
        // console.log(qsContribution[n+4]);
        // console.log(qsContribution[n+5]);
        // console.log(qsContribution[n+6]);
        // console.log('---------');
        
        qsArray = createQsList()
        console.log(qsArray);

        for(k=0;k<qsArray.length;k++){
          newList.push(qsArray[k]);
        }
      }
    res.render('paper', {qsList: newList, PAPERMEDIUM: req.body.paperMedium});
}); 

// chapter wise Test
app.post('/selectChapters', function(req, res){
  var requiredchapternumbers = [];
  var requiredChapters = req.body.CHAPTERNUMBER;
  console.log(requiredChapters);

  if(typeof requiredChapters != "object"){
  requiredchapternumbers.push(parseInt(requiredChapters));
  } else  {
    for(let i=0; i<requiredChapters.length;i++){
      requiredchapternumbers.push(parseInt(requiredChapters[i]));
    }
  }

  requiredchapternames = [];
  for(i=0; i<requiredchapternumbers.length;i++){
    requiredchapternames.push(chapternames[requiredchapternumbers[i]-1])
  }
  console.log(requiredchapternames);

    // send info to custom unit page
    let finalchapternumbers = `[${requiredchapternumbers}]`;

    console.log('final chapter numbers: ', finalchapternumbers);
  
    chapterArray  = eval(finalchapternumbers);
  
    chapterMCQs = [];
    for(i=0;i<chapterArray.length;i++){
      chaptermcqlength = `c${chapterArray[i]}MCQ.length`
      chapterMCQs.push(eval(chaptermcqlength));
    }
    chapterST = [];
    for(i=0;i<chapterArray.length;i++){
      chapterSTlength = `c${chapterArray[i]}Statements.length`
      chapterST.push(eval(chapterSTlength));
    }
    chapterMTC = [];
    for(i=0;i<chapterArray.length;i++){
      chapterMTClength = `c${chapterArray[i]}MTC.length`
      chapterMTC.push(eval(chapterMTClength));
    }
    chapterDB = [];
    for(i=0;i<chapterArray.length;i++){
      chapterDBlength = `c${chapterArray[i]}diagramBased.length`
      chapterDB.push(eval(chapterDBlength));
    }
    chapterAR = [];
    for(i=0;i<chapterArray.length;i++){
      chapterARlength = `c${chapterArray[i]}AssertionReason.length`
      chapterAR.push(eval(chapterARlength));
    }
    chapterPYP = [];
    for(i=0;i<chapterArray.length;i++){
      chapterPYPlength = `c${chapterArray[i]}PYP.length`
      chapterPYP.push(eval(chapterPYPlength));
    }
    chapterNP = [];
    for(i=0;i<chapterArray.length;i++){
      chapterNPlength = `c${chapterArray[i]}NCERTplus.length`
      chapterNP.push(eval(chapterNPlength));
    }

  res.render('customChapterTest', {PAGETITLE: 'CUSTOM CHAPTER TEST',
   FINALCHAPTERNUMBERS: finalchapternumbers, 
   CHAPTERMCQS: chapterMCQs,
   CHAPTERST: chapterST,
   CHAPTERMTC: chapterMTC,
   CHAPTERDB: chapterDB,
   CHAPTERAR: chapterAR,
   CHAPTERPYP: chapterPYP,
   CHAPTERNP: chapterNP,
  });

});
  
// Custom chapter Test formation
app.post('/customChapterTest', function(req, res){

  let requiredchapternumbers = eval(req.body.FINALCHAPTERS)

  var chapterTestType = req.body.CHOICENUMBER;
  
  if (chapterTestType==='1'){

    var newList = [];
    
    for(i=0;i<requiredchapternumbers.length;i++){
      let qsContribution = req.body.qsContribution.map(Number);
      // console.log(qsContribution);
      // console.log(requiredchapternumbers);
      mcqList= eval("c"+requiredchapternumbers[i] + "MCQ");
      dbList= eval("c"+requiredchapternumbers[i] + "diagramBased");
      mtcList= eval("c"+requiredchapternumbers[i] + "MTC");
      stList= eval("c"+requiredchapternumbers[i] + "Statements");
      arList= eval("c"+requiredchapternumbers[i] + "AssertionReason");
      pypList= eval("c"+requiredchapternumbers[i] + "PYP");
      NCERTplusList= eval("c"+requiredchapternumbers[i] + "NCERTplus");
      
      totalMCQs = mcqList.length;
      totalDBs = dbList.length;
      totalMTCs = mtcList.length;
      totalSTs = stList.length;
      totalARs = arList.length;
      totalPYPs = pypList.length;
      totalNCERTplus = NCERTplusList.length;
  
      var n = i*7;
  
      requiredMCQs = qsContribution[n+0];
      requiredSTs = qsContribution[n+1];
      requiredMTCs = qsContribution[n+2];
      requiredDBs = qsContribution[n+3];
      requiredARs = qsContribution[n+4];
      requiredPYPs = qsContribution[n+5];
      requiredNCERTplus = qsContribution[n+6];

      // console.log('---------');
      // console.log(qsContribution[n+0]);
      // console.log(qsContribution[n+1]);
      // console.log(qsContribution[n+2]);
      // console.log(qsContribution[n+3]);
      // console.log(qsContribution[n+4]);
      // console.log(qsContribution[n+5]);
      // console.log(qsContribution[n+6]);
      // console.log('---------');
      
      qsArray = createQsList()

      for(j=0;j<qsArray.length;j++){
        newList.push(qsArray[j]);
      }
    }
    // console.log(qsArray);
    res.render('paper', {qsList: newList, PAPERMEDIUM: req.body.paperMedium});

  } else if (chapterTestType==='2'){
   
    // console.log(requiredchapternumbers);

    var newList = [];

    for(i=0;i<requiredchapternumbers.length;i++){
      mcqList= eval("c"+requiredchapternumbers[i] + "MCQ");
      dbList= eval("c"+requiredchapternumbers[i] + "diagramBased");
      mtcList= eval("c"+requiredchapternumbers[i] + "MTC");
      stList= eval("c"+requiredchapternumbers[i] + "Statements");
      arList= eval("c"+requiredchapternumbers[i] + "AssertionReason");
      pypList= eval("c"+requiredchapternumbers[i] + "PYP");
      NCERTplusList= eval("c"+requiredchapternumbers[i] + "NCERTplus");
      
      totalMCQs = mcqList.length;
      totalDBs = dbList.length;
      totalMTCs = mtcList.length;
      totalSTs = stList.length;
      totalARs = arList.length;
      totalPYPs = pypList.length;
      totalNCERTplus = NCERTplusList.length;
      
      requiredMCQs = 30/requiredchapternumbers.length;
      requiredDBs = 5/requiredchapternumbers.length;
      requiredMTCs = 5/requiredchapternumbers.length;
      requiredSTs = 5/requiredchapternumbers.length;
      requiredARs = 5/requiredchapternumbers.length;
      requiredPYPs = 5/requiredchapternumbers.length;
      requiredNCERTplus = 5/requiredchapternumbers.length;
      
      qsArray = createQsList()
      // console.log('listname: '+i);

      for(j=0;j<qsArray.length;j++){
        newList.push(qsArray[j]);
      }
    }
    
    res.render('paper', {qsList: newList, PAPERMEDIUM: req.body.paperMedium});
    // console.log(newList);
  }
}); 

// unit wise Test
app.post('/selectUnits', function(req, res){

  // get required unit numbers
  var requiredunitnumbers = [];
  var requiredUnits = req.body.UNITNUMBER;
  // console.log("Required Units: ", requiredUnits);
  // console.log("Required Units length: ", requiredUnits.length);
  
  
  // convert requiredUnits string array into integer array
  if(typeof requiredUnits != "object"){
    requiredunitnumbers.push(parseInt(requiredUnits));
  } else  {
    for(let i=0; i<requiredUnits.length;i++){
      requiredunitnumbers.push(parseInt(requiredUnits[i]));
    }
  }
  console.log("Required Unit numbers array: ", requiredunitnumbers);

    
  // Add required unit Names
  // require('./public/js/syllabus.js')
  
  requiredunitnames = [];
  for(i=0; i<requiredunitnumbers.length;i++){
    requiredunitnames.push(unitnames[requiredunitnumbers[i]-1])
  }
  console.log("Required Unit names: ", requiredunitnames);


  // send info to custom unit page
  let finalunitnumbers = `[${requiredunitnumbers}]`;

  console.log('final unit numbers: ', finalunitnumbers);

  unitArray  = eval(finalunitnumbers);

  unitMCQs = [];
  for(i=0;i<unitArray.length;i++){
    unitmcqlength = `u${unitArray[i]}MCQ.length`
    unitMCQs.push(eval(unitmcqlength));
  }
  unitST = [];
  for(i=0;i<unitArray.length;i++){
    unitSTlength = `u${unitArray[i]}Statements.length`
    unitST.push(eval(unitSTlength));
  }
  unitMTC = [];
  for(i=0;i<unitArray.length;i++){
    unitMTClength = `u${unitArray[i]}MTC.length`
    unitMTC.push(eval(unitMTClength));
  }
  unitDB = [];
  for(i=0;i<unitArray.length;i++){
    unitDBlength = `u${unitArray[i]}diagramBased.length`
    unitDB.push(eval(unitDBlength));
  }
  unitAR = [];
  for(i=0;i<unitArray.length;i++){
    unitARlength = `u${unitArray[i]}AssertionReason.length`
    unitAR.push(eval(unitARlength));
  }
  unitPYP = [];
  for(i=0;i<unitArray.length;i++){
    unitPYPlength = `u${unitArray[i]}PYP.length`
    unitPYP.push(eval(unitPYPlength));
  }
  unitNP = [];
  for(i=0;i<unitArray.length;i++){
    unitNPlength = `u${unitArray[i]}NCERTplus.length`
    unitNP.push(eval(unitNPlength));
  }

  // Render the Unit Wise Test Page
  res.render('customUnitTest', {
    PAGETITLE: 'CUSTOM UNIT TEST', 
    FINALUNITNUMBERS: finalunitnumbers, 
    UNITMCQS: unitMCQs,
    UNITST: unitST,
    UNITMTC: unitMTC,
    UNITDB: unitDB,
    UNITAR: unitAR,
    UNITPYP: unitPYP,
    UNITNP: unitNP,
});
});

// Custom unit test formation
app.post('/customUnitTest', function(req, res){

  let requiredunitnumbers = eval(req.body.FINALUNITS)
  // console.log('Final units: ', requiredunitnumbers);

  var unitTestType = req.body.CHOICENUMBER;


  // var totalRequiredQuestions;
  
  if (unitTestType==='1'){
    
    var newList = [];

    for(i=0;i<requiredunitnumbers.length;i++){
      let qsContribution = req.body.qsContribution.map(Number);
      // console.log(qsContribution);
      // console.log(requiredunitnumbers);
      mcqList= eval("u"+requiredunitnumbers[i] + "MCQ");
      dbList= eval("u"+requiredunitnumbers[i] + "diagramBased");
      mtcList= eval("u"+requiredunitnumbers[i] + "MTC");
      stList= eval("u"+requiredunitnumbers[i] + "Statements");
      arList= eval("u"+requiredunitnumbers[i] + "AssertionReason");
      pypList= eval("u"+requiredunitnumbers[i] + "PYP");
      NCERTplusList= eval("u"+requiredunitnumbers[i] + "NCERTplus");
      
      totalMCQs = mcqList.length;
      totalDBs = dbList.length;
      totalMTCs = mtcList.length;
      totalSTs = stList.length;
      totalARs = arList.length;
      totalPYPs = pypList.length;
      totalNCERTplus = NCERTplusList.length;
      
      var n = i*7;
  
      requiredMCQs = qsContribution[n+0];
      requiredSTs = qsContribution[n+1];
      requiredMTCs = qsContribution[n+2];
      requiredDBs = qsContribution[n+3];
      requiredARs = qsContribution[n+4];
      requiredPYPs = qsContribution[n+5];
      requiredNCERTplus = qsContribution[n+6];

    //  console.log('---------');
    //  console.log(qsContribution[n+0]);
    //  console.log(qsContribution[n+1]);
    //  console.log(qsContribution[n+2]);
    //  console.log(qsContribution[n+3]);
    //  console.log(qsContribution[n+4]);
    //  console.log(qsContribution[n+5]);
    //  console.log(qsContribution[n+6]);
    //  console.log('---------');
      
      qsArray = createQsList();

      for(j=0;j<qsArray.length;j++){
        newList.push(qsArray[j]);
      }
    }
    // console.log(qsArray);
    res.render('paper', {qsList: newList, PAPERMEDIUM: req.body.paperMedium});

      

  } else if (unitTestType==='2'){
    console.log(requiredunitnumbers);

    var newList = [];


    for(i=0;i<requiredunitnumbers.length;i++){
      mcqList= eval("u"+requiredunitnumbers[i] + "MCQ");
      dbList= eval("u"+requiredunitnumbers[i] + "diagramBased");
      mtcList= eval("u"+requiredunitnumbers[i] + "MTC");
      stList= eval("u"+requiredunitnumbers[i] + "Statements");
      arList= eval("u"+requiredunitnumbers[i] + "AssertionReason");
      pypList= eval("u"+requiredunitnumbers[i] + "PYP");
      NCERTplusList= eval("u"+requiredunitnumbers[i] + "NCERTplus");
      
      totalMCQs = mcqList.length;
      totalDBs = dbList.length;
      totalMTCs = mtcList.length;
      totalSTs = stList.length;
      totalARs = arList.length;
      totalPYPs = pypList.length;
      totalNCERTplus = NCERTplusList.length;
      
      requiredMCQs = 30/requiredunitnumbers.length;
      requiredDBs = 5/requiredunitnumbers.length;
      requiredMTCs = 5/requiredunitnumbers.length;
      requiredSTs = 5/requiredunitnumbers.length;
      requiredARs = 5/requiredunitnumbers.length;
      requiredPYPs = 5/requiredunitnumbers.length;
      requiredNCERTplus = 5/requiredunitnumbers.length;
      
      // ---------------------------------------------
      qsArray = createQsList();

      for(j=0;j<qsArray.length;j++){
        newList.push(qsArray[j]);
      }
    }
    // console.log(qsArray);
    res.render('paper', {qsList: newList, PAPERMEDIUM: req.body.paperMedium});
  }
}); 

// full syllabus paper
app.post('/fullSyllabusPaper', function(req, res){

  console.log(req.body.fullSyllabusChoice);
  console.log(req.body.paperMedium);

  let fullSyllabusChoice = req.body.fullSyllabusChoice;

  if(fullSyllabusChoice === 'XI'){
    mcqList= xiMCQ;
    dbList= xidiagramBased;
    mtcList= xiMTC;
    stList= xiStatements;
    arList= xiAssertionReason;
    pypList = xiPYP;
    NCERTplusList = xiNCERTplus;
  } else if(fullSyllabusChoice === 'XII'){
    mcqList= xiiMCQ;
    dbList= xiidiagramBased;
    mtcList= xiiMTC;
    stList= xiiStatements;
    arList= xiiAssertionReason;
    pypList = xiiPYP;
    NCERTplusList = xiiNCERTplus;
  } else  if(fullSyllabusChoice === 'NEET'){
    mcqList= neetMCQ;
    dbList= neetdiagramBased;
    mtcList= neetMTC;
    stList= neetStatements;
    arList= neetAssertionReason;
    pypList = neetPYP;
    NCERTplusList = neetNCERTplus;
  }

  let qsContribution = req.body.qsContribution.map(Number);
  console.log(qsContribution);

  totalMCQs = mcqList.length;
  totalDBs = dbList.length;
  totalMTCs = mtcList.length;
  totalSTs = stList.length;
  totalARs = arList.length;
  totalPYPs = pypList.length;
  totalNCERTplus = NCERTplusList.length;

  requiredMCQs = req.body.qsContribution[0];
  requiredDBs = req.body.qsContribution[1];
  requiredMTCs = req.body.qsContribution[2];
  requiredSTs = req.body.qsContribution[3];
  requiredARs = req.body.qsContribution[4];
  requiredPYPs = req.body.qsContribution[5];
  requiredNCERTplus = req.body.qsContribution[6];

  createQsList();
    // console.log(finalQsList);
  res.render('paper', {qsList: finalQsList,  PAPERMEDIUM: req.body.paperMedium});
});  



// functions
function createQsList(){

  finalQsList = [];
  
  for (let i=0; i<requiredMCQs; i++) {
    let newGen = Math.floor(Math.random() * totalMCQs);
    while (finalQsList.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor(Math.random() * totalMCQs);
    }
    finalQsList.push(mcqList[newGen]);
  };

  for (let i=0; i<requiredSTs; i++) {
    let newGen = Math.floor(Math.random() * totalSTs);
    while (finalQsList.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor(Math.random() * totalSTs);
    }
    finalQsList.push(stList[newGen]);
  };

  for (let i=0; i<requiredMTCs; i++) {
    let newGen = Math.floor(Math.random() * totalMTCs);
    while (finalQsList.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor(Math.random() * totalMTCs);
    }
    finalQsList.push(mtcList[newGen]);
  };

  for (let i=0; i<requiredDBs; i++) {
    let newGen = Math.floor(Math.random() * totalDBs);
    while (finalQsList.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor(Math.random() * totalDBs);
    }
    finalQsList.push(dbList[newGen]);
  };

  for (let i=0; i<requiredARs; i++) {
    let newGen = Math.floor(Math.random() * totalARs);
    while (finalQsList.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor(Math.random() * totalARs);
    }
    finalQsList.push(arList[newGen]);
  };

  for (let i=0; i<requiredPYPs; i++) {
    let newGen = Math.floor(Math.random() * totalPYPs);
    while (finalQsList.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor(Math.random() * totalPYPs);
    }
    finalQsList.push(pypList[newGen]);
  };

  for (let i=0; i<requiredNCERTplus; i++) {
    let newGen = Math.floor(Math.random() * totalNCERTplus);
    while (finalQsList.lastIndexOf(newGen) !== -1) {
      newGen = Math.floor(Math.random() * totalNCERTplus);
    }
    finalQsList.push(NCERTplusList[newGen]);
  };

  return finalQsList;
};

function sourceQuestions(){
  for(i=1;i<39;i++){
  for(j=1;j<5;j++){
  console.log('c'+i+'t'+j+': '+ eval('c'+i+'t'+j+'MCQ.length'));
  console.log('c'+i+'t'+j+': '+ eval('c'+i+'t'+j+'Statements.length'));
  console.log('c'+i+'t'+j+': '+ eval('c'+i+'t'+j+'MTC.length'));
  console.log('c'+i+'t'+j+': '+ eval('c'+i+'t'+j+'diagramBased.length'));
  console.log('c'+i+'t'+j+': '+ eval('c'+i+'t'+j+'AssertionReason.length'));
  console.log('c'+i+'t'+j+': '+ eval('c'+i+'t'+j+'PYP.length'));
  console.log('c'+i+'t'+j+': '+ eval('c'+i+'t'+j+'NCERTplus.length'));
  };
};

for(i=1;i<39;i++){
  console.log('chapter'+i+': '+ eval('c'+i+'MCQ.length'));
  console.log('chapter'+i+': '+ eval('c'+i+'Statements.length'));
  console.log('chapter'+i+': '+ eval('c'+i+'MTC.length'));
  console.log('chapter'+i+': '+ eval('c'+i+'diagramBased.length'));
  console.log('chapter'+i+': '+ eval('c'+i+'AssertionReason.length'));
  console.log('chapter'+i+': '+ eval('c'+i+'PYP.length'));
  console.log('chapter'+i+': '+ eval('c'+i+'NCERTplus.length'));
}

for(i=1;i<11;i++){
  console.log('unit'+i+': '+ eval('u'+i+'MCQ.length'));
  console.log('unit'+i+': '+ eval('u'+i+'Statements.length'));
  console.log('unit'+i+': '+ eval('u'+i+'MTC.length'));
  console.log('unit'+i+': '+ eval('u'+i+'diagramBased.length'));
  console.log('unit'+i+': '+ eval('u'+i+'AssertionReason.length'));
  console.log('unit'+i+': '+ eval('u'+i+'PYP.length'));
  console.log('unit'+i+': '+ eval('u'+i+'NCERTplus.length'));
}

console.log('neetMCQ: ' + neetMCQ.length)
console.log('neetStatments: ' + neetStatements.length)
console.log('neetMTC: ' + neetMTC.length)
console.log('neetDiagramBased: ' + neetdiagramBased.length)
console.log('neetAssertionReason: ' + neetAssertionReason.length)
console.log('neetPYP: ' + neetPYP.length)
console.log('neetNCERTplus: ' + neetNCERTplus.length)
console.log('Total Questions: ' + (neetMCQ.length+neetStatements.length+neetdiagramBased.length+neetMTC.length+neetAssertionReason.length+neetPYP.length+neetNCERTplus.length))
}

app.listen(process.env.PORT || 3000, function(){
console.log('Server is Listening at port: 3000');
});





