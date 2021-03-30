import './App.css';
import React from 'react';
import { Progress } from 'reactstrap';

function App() {
  const userInfo = { name:"Mike", height:175, dob:new Date(1989, 0, 31), 
                       maxBpm: 188, weightGoal:85.0, waistGoal:95.5, dateGoal:new Date(2021,6,1) };

  const stats = [  
                    {date:new Date(2021, 0, 25), weight:96.4, waist:106.5, kCal:0,    slept:true,   },

                    {date:new Date(2021, 0, 27), weight:97.2, waist:105.0, kCal:512,                },




                    {date:new Date(2021, 1, 1),  weight:99.1, waist:108.0, kCal:1150, slept:false,  },
                    {date:new Date(2021, 1, 2),  weight:99.0, waist:107.5,            slept:true,   },
                    
                    {date:new Date(2021, 1, 4),                            kCal:666                 },
                    {date:new Date(2021, 1, 5),  weight:98.9, waist:107.0,            slept:false,  },
            ];
            
            
//Destructuring
const {name: firstName, gender = "male", ...rest} = userInfo;

//create twin's info from userInfo
const twin = {name: "Michael"};
const twinInfo = {...userInfo, ...twin};
console.log("Twin's info: ");
console.dir(twinInfo);

//practicing objects
let printUser = ({name, gender ="male"}) => {
  console.log(`User's name is ${name}. He is ${gender}.`); //backtick to include expressions
}

printUser(userInfo);

//IIFE
console.log((name => "Hello " + name + "!")(userInfo.name)); 

//VARIABLE STATEMENTS
//playing with the pulse
var maxPulse = userInfo.maxBpm;
const normal = 60; //const immutable, must be declared and initialised

avgPulse(1000, 10); //hoisted function

function avgPulse (total, count) {
  "use strict"; //expose undeclared variables, optimization
  var avgpulse = total/count; //tried to remove var to check if made to global variable, alas testing is bad here
                              //declare and initialise the variable
  var noPulse = 0; //if declared, bound to function scope
  let normalMax = 100; //block scoped

  console.log("Average Pulse is " + avgpulse);
  return avgpulse;
}

//falsy values
//false, null, undefined, 0, -0, Nan, empty string, document.all

if (-0) {
  console.log("This is truthy.")
} else {
  console.log("This is falsy.")
}

//second function testing falsy values

function truthyCheck (arr) {
  //return only truthy values of array
  return arr.filter(function(elem) {
    console.log(elem);
    return elem;
  });
}

truthyCheck([userInfo]);
truthyCheck([stats[1]]); //does not return if empty

//FUNCTION STATEMENTS
//playing on dates
var today = new Date();
console.log("Today is " + today);

//function declaration vs. expression
function daysToGoal (startDate, endDate) {
  "use strict";
  var start = new Date(startDate);
  var end = new Date(endDate);

  var diffTime = Math.abs(end - start);
  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
  console.log("You have " + diffDays + " days till your date goal.");
  return("You have " + diffDays + " days till your date goal.");
}

var progressCheck = function daysToGoal (startDate, endDate) {
  "use strict";
  var start = new Date(startDate);
  var end = new Date(endDate);

  var diffTime = Math.abs(end - start);
  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  console.log("You have " + diffDays + " days till your date goal.");
  return("You have " + diffDays + " days till your date goal.");
}

daysToGoal(today, userInfo.dateGoal); //declaration for global scope
progressCheck(today, userInfo.dateGoal); //expression cannot be hoisted thus avoiding pollution of global scope

//playing with Age
var birthday = userInfo.dob;

let getAge = (day) => {
  "use strict";
    var age = today.getFullYear() - day.getFullYear();
    var m = today.getMonth() - day.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < day.getDate())) {
        age--;
    }
    return age;
};

var age = getAge(birthday);
console.log("Your current age is " + age);

//Function defines a function and returns that function(object)
//recommended daily steps per age group
//4-19 = 6,000 steps
//Above 20 = 3,000 steps

var stepsComment = function (steps) {
  "use strict";
  if(age < 19 && steps >= 6000) {
    return function(text) {
      var extraSteps =  steps - 6000;
      console.log("Yes! You walked an extra " + extraSteps + " steps." + text);
    };
  } else if(age < 19 && steps < 6000) {
      return function(text) {
        var extraSteps =  6000 - steps;
        console.log("Meh, you need to walk " + extraSteps + " steps more." + text);
      };
  } else if(age > 19 && steps >= 3000) {
      return function(text) {
        var extraSteps =  steps- 3000;
        console.log("Yes! You walked an extra " + extraSteps + " steps." + text);
      };
  } else {
    return function(text) {
      var extraSteps =  3000 - steps;
      console.log("Meh, you need to walk " + extraSteps + " steps more." + text);
    };
  }
};

//takes in value of steps, NEED TO THINK MORE ABOUT THIS 
stepsComment(7000)(" There are no limits.");

//new try, this time about sleep
var sleepComment = function (d) {
  "use strict";
  if(d===true) {
      return function(text) {
          console.log("You had slept well" + text);
      };
  } else {
      return function(text) {
          console.log("You have either slept poorly or not recorded your sleep" + text);
      };
  }
};

// calling both functions on one row:
sleepComment(true)(" Sunshine!");

var moodSleep = function (arr) {
  "use strict";
  for(let i = 0; i < arr.length; i++) {
          if(arr[i].slept) {
                  sleepComment(true)(" on " + arr[i].date);
          } else {
                  sleepComment(false)(" on " + arr[i].date);
          }
  }   
};

moodSleep(stats);

//check for avgSleep
let avgSleep = (arr) => {
  "use strict";
  var goodSleep = 0;
  var badSleep = 0;
  var noSleepRecord = 0;

  for(let i = 0; i < arr.length; i++){
    if(arr[i].slept === true){
      goodSleep++;
    } else if (arr[i].slept === undefined) {
      noSleepRecord++;
    } else {
      badSleep++;
    }
  }
   
  if (goodSleep > badSleep) {
    return("You are sleeping well more than the usual.");
  } else if (badSleep > goodSleep)  {
    return("You are sleeping poorly than the usual.");
  } else {
    return("Your sleeping pattern is okay.");
  }
};

avgSleep(stats);

//IIFE to avoid global pollution
(function(sleepHrs) {
  if (sleepHrs > 8) {
    console.log("Lucky you. Keep on sleeping for " + sleepHrs + " hours.");
  } else {
    console.log("Ouch. Try to sleep for more than 8 hrs.")
  }
})(7);


//checking weights
var currentWeight= stats[stats.length-1].weight;
var currentWaist= stats[stats.length-1].waist;

//With optional parameters usually similar params to avoid repetition
//using arrow function
let latestStats = (weight, waist, kCal) => {
  if (weight === undefined) {
    weight = currentWeight;
  } 
  if (waist === undefined) {
    waist = currentWaist;
  }
  if (kCal === undefined) {
    kCal = 0;
  }
    console.log("Latest Stats: " + weight + " " + waist + " " + kCal);
  };

latestStats(stats.weight, stats.waist, stats.kCal);

//default params for functions
//default normal weight is 70 for a 175 cm male
var checkWeightGoal = (weight = currentWeight, weightGoal = userInfo.weightGoal) => {
   var weightProgress = (weightGoal/weight) * 100;
  console.log("You are " + weightProgress.toFixed() + "% closer to your weight goal!");
  return weightProgress;
};

checkWeightGoal(88, 87); //check progress from weight and weight goal, this results to near 99%
checkWeightGoal(); //takes default values

console.log("Your current weight is " + currentWeight + " kgs.");

//MIFFLIN-ST JEOR FORMULA
//compute daily calorie intake
//var mensDailyKcal = (10 * userInfo.weight) + (6.25 * userInfo.height) - (5 * age) + 5;
//var womensDailyKcal = (10 * userInfo.weight) + (6.25 * userInfo.height) - (5 * age) - 161;

var dailyKcal = (10 * currentWeight) + (6.25 * userInfo.height) - (5 * age) + 5;
console.log("Your daily kcal normal intake is " + dailyKcal);

//get the daily kcal goal to lose weight or declare it manually
function goalAndDeficit(kcalGoal, deficit) {
  return [kcalGoal-500, kcalGoal-deficit];
}

const [kcalGoal, declaredGoal] = goalAndDeficit(dailyKcal, 900);
console.log("Weight loss daily kcal goal is " +  kcalGoal);
console.log("You decided to eat " + declaredGoal + " kcals today");


//check average kcal spent daily
function getAvgKcal(arr) {
    "use strict";
    var sumKcalSpent = 0;
    var avgKcalSpent = 0;
    var daysSpent = 0;

    for(let i = 0; i < arr.length; i++) {
            if (arr[i].kCal === undefined) {
                daysSpent++;
            } else {
                sumKcalSpent = sumKcalSpent + arr[i].kCal;
                daysSpent++;
                avgKcalSpent = sumKcalSpent / daysSpent;
            }
    }

    return avgKcalSpent;
};

var avgKcal= getAvgKcal(stats);

var deficitKcal = 500 - avgKcal;
var percentDeficit = (avgKcal / 500) * 100;
console.log("Based on the values recorded, you are losing " + avgKcal + " kCal daily.")
console.log("That is " + percentDeficit + "% of the daily goal to lose weight!");


function progress() {
    "use strict";
    if(deficitKcal > 500) {
      console.log("You are maintaining a 500 kCal loss, you are losing weight!");
      return("You are maintaining a 500 kCal loss, you are losing weight!");
    } else {
      console.log("Your calorie deficit should be 500 kCal, you have to lose " + deficitKcal.toFixed(1) + " kcal more.");  
      return("Your calorie deficit should be 500 kCal, you have to lose " + deficitKcal.toFixed(1) + " kcal more.");
          }
}
progress();


//Compute BMI
function getBMI() {
    var BMIheight = userInfo.height/100;
    var BMImeasure = (currentWeight / (BMIheight * BMIheight));
    var BMI = BMImeasure.toFixed();
    var BMIgoal = BMI - 25;
   
    if (BMI < 18.5) {
        return(BMI + " underweight");
    } else if (BMI >= 18.5 && BMI <= 25){
        return(BMI + " healthy");
    } else if (BMI > 25 && BMI <= 30) {
        return(BMI + " overweight");
    } else if (BMI > 30 && BMI <= 35) {
        return(BMI + " low-risk");
    } else if(BMI > 35 && BMI <= 40) {
        return(BMI + " moderate-risk");
    } else {
        return(BMI + " means that you have high-risk obesity!");
    }
}   
getBMI();


//filter functions, initializing one array first
let waistValues = [];

let waistRecords = () => {
  stats.forEach(values => {
    if(values.waist) {
      waistValues.push(values.waist);
    }
  })
  console.log("Recorded waist values: " + waistValues);
};

waistRecords(stats);

let bigWaists = waistValues.filter( waist => waist > 106);
console.log("Waist values bigger than 106: " + bigWaists);

//Compute normal waist based on WESTERN MEN body
var currentWaist= stats[stats.length-1].waist;
function measureWaist() {
  
    if (currentWaist < 94) {
        return(currentWaist + " ok");
    } else if (currentWaist >= 94 && currentWaist <= 102){
        return(currentWaist + " go walk");
    } else {
        return(currentWaist + " go run")
    }
}   
measureWaist();

var percentWaistGoal = (userInfo.waistGoal/currentWaist) * 100;
console.log("You are " + percentWaistGoal.toFixed() + "% close to your waist goal.");

//extra notes
//export prefix
//import * as otherModule from 'otherModule'
//otherModule.measureWaist();
//import {measureWaist} from 'otherModule'
//import {measureWaist as measure} from 'otherModule'

//some random feature
window.onload=function(){
const rangeInput = document.querySelector('input');
const output = document.querySelector('output');

function setDefaultState() {
  output.value = rangeInput.value;
}

rangeInput.addEventListener('input', function(){
  output.value = this.value;
});

document.addEventListener('DOMContentLoaded', function(){
  setDefaultState();
});
}

  return (
    <div className="App">
      <header className="App-header">HEALTH APP WITH TOO MUCH INFO</header>
        <div className ="division">

          <div className ="box">
            <h1>Date: {today.toLocaleDateString()}</h1>
          
            <div className ="under" style={{backgroundColor: '#cfcfc4'}}>
              <p>Name: {firstName}</p>
              <p>Age: {JSON.stringify(age)}</p>
              <p>Weight Goal: {JSON.stringify(userInfo.weightGoal)} kgs.</p>
              <input type="range" name="quantity" id="quantity" min="0" max="200"/>
              <output for="quantity">{JSON.stringify(userInfo.weightGoal)}</output>    
              <p>Waist Goal: {JSON.stringify(userInfo.waistGoal)} kgs.</p>
            </div>
            
            <div className ="under" style={{backgroundColor: '#77dd77'}}>
              <p>{avgSleep(stats)}</p>
            </div>

            <div className ="under" style={{backgroundColor: '#fdfd96'}}>
              <p>{daysToGoal(today, userInfo.dateGoal)}</p>
            </div>

          </div>

          <div className ="box">
             <div className ="under">
              <p>Current Weight: {JSON.stringify(currentWeight)} kgs.</p>
              <p>Percent Closer to Goal Weight:</p>
              <Progress value={checkWeightGoal()}>{checkWeightGoal().toFixed()}%</Progress>
            </div>

            <div className ="under">
              <p>Body Mass Index:</p>
              <Progress multi>
                <Progress bar value={getBMI()} />
                <Progress bar color="danger" value="17">under</Progress>
                <Progress bar color="success" value="18">normal</Progress>
                <Progress bar color="warning" value="26">overweight</Progress>
                <Progress bar color="danger" value="50">obese</Progress>
              </Progress>
              <Progress multi>
                <Progress bar color="danger" value="17">17</Progress>
                <Progress bar color="success" value="18">18-25</Progress>
                <Progress bar color="warning" value="26">26-30</Progress>
                <Progress bar color="danger" value="50">Over 30</Progress>
              </Progress>
              <Progress value="35">{getBMI()}</Progress>
            </div> 

            <div className ="under">
              <p>Waist: {measureWaist()}</p>
              <Progress multi>
                <Progress bar color="success" value="94">normal</Progress>
                <Progress bar color="warning" value="102">medium risk</Progress>
                <Progress bar color="danger" value="140">high risk</Progress>
              </Progress>
              <Progress value="35">{measureWaist()}</Progress>
              <p>Percent Close to Waist Goal: </p>
              <Progress value={percentWaistGoal}>{percentWaistGoal.toFixed()}%</Progress>
            </div>
          </div>

          <div className ="box">

            <div className ="under" style={{backgroundColor: '#88ade0'}}>
              <p>Normal Daily Kcal Intake: {JSON.stringify(dailyKcal)}</p>
              <p>Kcal Intake to Lose Weight: {JSON.stringify(kcalGoal)}</p>
            </div>

            <div className ="under" style={{backgroundColor: '#ffd1dc'}}>
              <p>Daily Avg Kcal Lost: {JSON.stringify(avgKcal)}</p>
              <p>Percent Closer to Kcal Goal:</p>
              <Progress value={percentDeficit}>{percentDeficit}%</Progress>
              <p>{progress(deficitKcal)}</p>
            </div>
          </div>
          
        </div>
    </div>
  );
}

export default App;
