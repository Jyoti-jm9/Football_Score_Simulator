let selection = document.querySelectorAll(".sbar");
let board1 = document.querySelector(".board1");
let board2 = document.querySelector(".board2");
let score1 = document.querySelector("#You_score");
let score2 = document.querySelector("#opp_score");
let button = document.querySelector(".pbutton");
let football = document.querySelector(".football");
let timer = document.querySelector(".timer");
let news = document.querySelector("#news");
let val1 = "INDIA";
let val2 = "AFGHANISTAN";
let time;
// the Selectiom Bar
for(let sel of selection) { 
    for(let currCode in countryList1) {
        let newOption = document.createElement("option");  // have to read the document about this createelement 
        newOption.innerText = currCode;
        newOption.value = currCode;
       sel.append(newOption);
       

        if(sel.name==="your_t" && currCode==="INDIA") {
           newOption.selected = "selected";
        }
        
    }

    sel.addEventListener("change", (evt) => {
           // console.log(evt.target.value);
            updateFlag(evt.target);
            if(sel.name==="your_t") {
                 val1 = evt.target.value;
                 let f_code = countryList1[val1];
                 let f_code1 = f_code.fifaCode;
           board1.innerText = f_code1;

            }
            if(sel.name==="opp_t") {
                 val2 = evt.target.value;
                 let f_code = countryList1[val2];
                 let f_code1 = f_code.fifaCode;
                board2.innerText = f_code1;
            }
            
        })

}
// the play button 
button.addEventListener("click", ()=> {
     time = -10 ;
    score1.innerText = "0";
    score2.innerText = "0";
    football.classList.add('animate');
    gamePlay(val1 , val2);
   
})

//update flag
const updateFlag= (element) => {
   let currCode = element.value;
   let c_code = countryList1[currCode];
   let c_code1 = c_code.countryCode;
  // console.log(c_code1);
   let newsrc = `https://flagsapi.com/${c_code1}/flat/64.png`;

   let img = element.parentElement.querySelector('img');
   img.src = newsrc;
}
//gameplay
const gamePlay = (val1 , val2) => {
    
 
let t1_rank = Rank(val1);
let  t2_rank = Rank(val2);
 

 let goal1= 0;
 let goal2 = 0;
 goal(goal1 , goal2 , t1_rank , t2_rank , val1 , val2);
}

// get rank 
 const Rank = (val) => {
    let c_code = countryList1[val];
    let rank = c_code.fifaRank;
    return rank;
 }

 //goal
 async function goal(goal1 , goal2 , t1_rank , t2_rank , val1 , val2) {
    for(let i = 1;i<11;i++) {
     time+=10;  
 let   rand1 =  Math.floor(Math.random()*10);
   let  rand2 =  Math.floor(Math.random()*10);
  let team1_attempt = attempt(t1_rank , rand1);
  let team2_attempt = attempt(t2_rank , rand2);
  
      if (team1_attempt === 1 && team2_attempt===0) {
     goal1+=1;
    // console.log("goal1");
     score1.innerText = goal1;
     }
     else if (team1_attempt === 0 && team2_attempt===1 ) {
      goal2+=1;
     // console.log("goal2");
      score2.innerText = goal2;
     }
     timer.innerText = time;
     await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
   if(goal1 > goal2) {
    news.innerText= `Breaking News : ${val1} beat ${val2} ${goal1}-${goal2}`;
   }
   else if(goal2 > goal1) {
    news.innerText= `Breaking News : ${val2} beat ${val1} ${goal2}-${goal1}`;
   }
   else {
    news.innerText= `Breaking News : The Match Between ${val2} and ${val1} Ends in a Draw`;
   }
    timer.innerText = 'FT';
    startAnm();
  }

// goalAttempts 
const attempt = (t1_rank , rand1) => {
    let flag1 = 0;
    if (t1_rank === 1  ) {
        if(rand1 === 3 || rand1 === 5 || rand1 === 9) {
            flag1 = 0;
        }
        else {
            flag1 =1;
        }
    
      }
   else  if(t1_rank >= 2 && t1_rank <=21) {
        if(rand1 === 7 || rand1 === 5 || rand1 === 1 || rand1===2) {
            flag1 = 0;
        }
        else {
            flag1 =1;
        }
    
    }
   else  if(t1_rank >= 22 && t1_rank <=60) {
        if(rand1 === 7 || rand1 === 0 || rand1 === 1 || rand1===2 ||rand1 === 6 ) {
            flag1 = 0;
        }
        else {
            flag1 =1;
        }
    
    
    }
    else if(t1_rank >= 61 && t1_rank <= 100) {
        if(rand1 === 8 || rand1 === 6 || rand1 === 1 || rand1===2 || rand1 ===4 || rand1 ===9) {
            flag1 = 0;
        }
        else {
            flag1 =1;
        }
    
    }
    else {
        if(rand1 === 8 || rand1 === 5) {
            flag1 = 1;
        }
        else {
            flag1 = 0;
        }
    }
    return flag1;
}



function startAnm() {
    football.classList.remove('animate');
}

/*function startTimer() {
    const circle = document.querySelector('.timer');
    circle.style.animationPlayState = 'running';
} 
*/
