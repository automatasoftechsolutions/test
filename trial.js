console.clear();
// console.log('I am working')
All = [
  papers0 = ['The Living World','Plant Kingdom','Morphology', 'Respiration','Photosynthesis',],
  papers1 = ['The Living World','Plant Kingdom','Anatomy','Cell division','Growth','photosynthesis'],
  papers2 = ['The Living World','Plant Kingdom', 'Morphology','Growth','Cell'],
  papers3 = ['Biomolecules','Plant Kingdom'],
]

y = ['Cell','Photosynthesis'];

myresult = filterPapers(x, y);

console.log('This is my result', myresult);

function filterPapers(papers, requiredChapters){

  result = [];
  
  for(i=0;i<papers.length;i++){
    paper = eval(`papers${i}`)
    for(j=0;j<3;j++){
      if(paper.includes(requiredChapters[j])){
        result.push(`papers${i}`)
        console.log(`papers${i}`)
      } else{
        console.log('not found')
      }
    }
    console.log(result);
    // remove duplicate values
    finalPaperList = Array.from(new Set(result));
    console.log(finalPaperList);
    console.log(finalPaperList[0]);
  }
  return finalPaperList
}

 