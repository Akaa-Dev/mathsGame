/* when start is clicked, if the game is active */ 
var playing = false;
var score =0;
var timeRemaining;
var x,y;
var correctAnswer;
var answer= false;

// countdown for game timer.
function startCountDown(){
    action = setInterval(()=>{
        timeRemaining -=1;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if(timeRemaining==0){
            stopCountDown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>game over!</> <p>your score is "+ score + ".</p>";/*<p>Your average time of answer is " + averageTime + "seconds</p>"*/
            hide("timer");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startReset").innerHTML = "Start";
        }
    },1000);
}
// stops timer
function stopCountDown(){
    clearInterval(action);
}
// adds score
function addscore(){
    if (answer==true){
        score++;
        document.getElementById("scoreValue").innerHTML = score;
    }
    return score;
}
//displays some element
function show(id){
    document.getElementById(id).style.display="block";
}
// hides some element
function hide(id){
    document.getElementById(id).style.display="none";
}

function generateQA(){
    x= Math.round(Math.random()*9)+1;
    y= Math.round(Math.random()*9)+1;
    correctAnswer=x*y;
    document.getElementById("question").innerHTML = x+"x"+y;
   var correctAnswerPosition =1+Math.round(Math.random()*3);
   var answers = [correctAnswer];
   document.getElementById("box"+correctAnswerPosition).innerHTML = correctAnswer; // fills the correct answer to the corresponding box number
   for(i=1;i<5;i++){
       if(i!=correctAnswerPosition){
           var wrongAnswer = (1+ Math.round(Math.random()*9))*(1+ Math.round(Math.random()*9)); // gets a random wrong answer
           while(answers.indexOf(wrongAnswer)>-1){
               wrongAnswer += (1+ Math.round(Math.random()*9))*(1+ Math.round(Math.random()*9)); // gets another random wrong answer
           }
           document.getElementById("box"+i).innerHTML = wrongAnswer;
           answers.push(wrongAnswer);
       }
   } 
}

document.getElementById("startReset").onclick = function (){
    if(playing){
        location.reload(); //reloads page when Reset is clicked
    }
    else{
        document.getElementById("startReset").innerHTML = "Reset";
        playing=true;
        timeRemaining=5;
        document.getElementById("scoreValue").innerHTML = score;
        hide("gameOver");
        show("timer");
        generateQA();
        startCountDown();  
    }
}
for(i =1; i<5;i++){
    document.getElementById("box"+i).onclick= function(){
        if(playing){
            if(this.innerHTML==correctAnswer){
                answer=true;
                addscore();
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct")
                },1000);
                generateQA();
            }
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong")
                },1000);
            }
        }
    }
}

/*-------------------------
** THINGS TO ADD**
1. Average time of response for correct answer ( Calculate time of question display and difference between time of click);
2. Difficulty modes;
3. Combo points
4. Count questions answered and number of trials for a failed questions. 

other: Use event handling.
--------------------*/
