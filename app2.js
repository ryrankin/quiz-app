var quiz = [{     
  "question": "What historic structure, lying on the Delaware River, was once used during the American Revolutionary War, and later housed prisoners during the American Civil War?",
  "choices": ["Eastern State Penetentary", "Holmesburg Prison", "Fort Mifflin", "SCI Graterford"],
  "correct": "Fort Mifflin"
}, {
  "question" : "Although the current location of William Penn's first landing in PA is marked at Penn's Landing, Philadelphia, what Delaware County city did Mr. Penn originally land in?",
  "choices": ["Essington, PA", "Eddystone, PA", "Ridley Park, PA", "Chester, PA"],
  "correct": "Chester, PA"
}, {
  "question": "Prospect Hill Baptist Church in Prospect Park, PA, holds credit to what important, historical role in American history?",
  "choices": ["The Underground Railroad", "In God We Trust", "Prohibition", "Oldest Protestant church in PA"],
  "correct": "In God We Trust"
}, {
  "question" : "This building, considered the first quarantine-hospital in the Unites States, once housed victims of the Yellow Fever Epidemic, killing one-tenth of Philadelphia's population.",
  "choices" : ["Hospital of the University of Pennsylvania", "Philadelphia Lazaretto", "Pennsylvania Hospital", "Institute of the Pennsylvania Hospital"],
  "correct" : "Philadelphia Lazaretto"
}, {
  "question" : "This street, located in Philadelphia, is considered to be the oldest, continuously inhabited, resedential street in America.",
  "choices" : ["Elfreths Alley", "69th Street", "Arch Street", "Delaware Avenue"],
  "correct" : "Elfreths Alley"
}, {
  "question" : "Eddystone, PA was once home to this major American production plant.",
  "choices" : ["Derby hats", "Steel beams", "Steam locomotives", "Silver coins"],
  "correct" : "Steam locomotives"
}, {
  "question" : "This urban park, located outside of Philadelphia, is considered a stopping ground for over 300 species of migratory birds.",
  "choices" : ["John Heinz Wildlife Refuge", "Fairmount Park", "FDR Park", "John J. Tyler Arboretum"],
  "correct" : "John Heinz Wildlife Refuge"
}, {
  "question" : "This famous restauranteur got his start in 1995, after opening his first successful restaurant in Old City, Philadelphia; and is 'arguably the key reason for the city's revitalized culinary scene.'",
  "choices" : ["Jen Carroll", "Morimoto", "Stephen Starr", "Anthony Bourdain"],
  "correct" : "Stephen Starr"
}];


// elements
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");

// variables
var currentQuestion = 0,
  score = 0,
  askingQuestion = true;

function $(id){ // shortcut for document.getElementById
  return document.getElementById(id);
}

function askQuestion(){
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";

  // loop through choices, and create radio buttons
  for (var i=0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    quiz[currentQuestion].question;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0){
    scoreContainer.textContent = "Score: 0 correct answers out of " +
      quiz.length + " possible.";
    submitBtn.textContent = "Submit Answer";
  }
}

function checkAnswer(){
  // are we asking a question, or moving to next question?
  if (askingQuestion) {
    submitBtn.textContent = "Next Question";
    askingQuestion = false;

    // determine which radio button was clicked
    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i=0; i < radios.length; i++) {
      if (radios[i].checked){
        userpick = radios[i].value;
      }

      // get index of correct answer
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    // setup if they got it right, or wrong
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }

    scoreContainer.textContent = "Score: " + score + " correct answers out of " +
      quiz.length + " possible.";
  } else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    // if we're not at last question yet, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showResults();
    }
  }
}

function showResults() {
  content.innerHTML = "<h2>You've completed the quiz!</h2>" +
    "<h2>How well do you know Philadelphia?</h2>" +
    "<h2>" + score + " out of " + quiz.length + " questions, " +
    Math.round(score / quiz.length * 100) + "%<h2>";
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);
