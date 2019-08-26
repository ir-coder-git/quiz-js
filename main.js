const questionDiv = document.querySelector(".question");
const finishDiv = document.querySelector(".finish-div")
const btnNext = document.querySelector("button.next-question");
const btnAgain = document.querySelector(".again");

const data1 = {
    question: "Which city is the capital of Portugal ?",
    answers: ["Lisbon", "Moscov", "Budapest"],
    correct_answer: "Lisbon"
};

const data2 = {
    question: "Which mountain of the world is the highest?",
    answers: ["K2", "Mount Everest", "Makalu"],
    correct_answer: "Mount Everest"
};

const data3 = {
    question: "How many continents we have?",
    answers: ["Seven", "Two", "Ten"],
    correct_answer: "Seven"
};

const data4 = {
    question: "Who wins football championship on 2004?",
    answers: ["Poland", "Germany", "Brasil"],
    correct_answer: "Germany"
};

// let questionObject;
// let indexQuestion = 0;


const questions = [data1, data2, data3, data4];




// class MainQuestion {
//     constructor() {

//         this.title = questionDiv.querySelector(".title");
//         this.buttonsAnswers = [...questionDiv.querySelectorAll("button.answer")];

//         for (let i = 0; i < this.buttonsAnswers.length; i++) {
//             this.buttonsAnswers[i].addEventListener("click", onSelectButton);
//         }
//     }

//     initialazeWithQuestion(qNumber) {

//         if (qNumber > questions.length) {
//             console.log("nie ma takiego pytania");
//             return;
//         }

//         this.title.textContent = questions[qNumber].question;

//         for (let i = 0; i < this.buttonsAnswers.length; i++) {
//             this.buttonsAnswers[i].textContent = questions[qNumber].answers[i];

//             if (questions[qNumber].answers[i] === questions[qNumber].correct_answer) {
//                 this.buttonsAnswers[i].classList.add("answer-good");
//             }
//         }
//     }

//     select(selectedButton) {
//         for (let i = 0; i < this.buttonsAnswers.length; i++) {
//             if (selectedButton === this.buttonsAnswers[i]) {
//                 this.buttonsAnswers[i].classList.add("chosen-answer");
//             } else {
//                 this.buttonsAnswers[i].classList.remove("chosen-answer");
//             }
//         }
//     }

//     checkIfAnySelected() {
//         for (let i = 0; i < this.buttonsAnswers.length; i++) {
//             if (this.buttonsAnswers[i].classList.contains("chosen-answer")) {
//                 return this.buttonsAnswers[i];
//             }
//         }
//         return null;
//     }

//     checkAnswer() {
//         const selected = this.checkIfAnySelected();
//         if (selected === null) {
//             alert("zaznacz odpowiedz")
//             return;
//         }

//         if (selected.classList.contains("answer-good")) {

//             selected.classList.add("correct-answers")
//         } else {
//             selected.classList.add("wrong-answers");
//         }



//     }

// }

// let myObject = new MainQuestion();


// function start() {

//     myObject.initialazeWithQuestion(indexQuestion);
// }

// function nextQuestion() {
//     // indexQuestion++;
//     // myObject.initialazeWithQuestion(indexQuestion);
//     myObject.checkAnswer();
// }

// function onSelectButton() {
//     //this.classList.add("chosen-answer");

//     myObject.select(this);
// }
// start();

// btnNext.addEventListener("click", nextQuestion);

let myObject;
let indexQuestion = 0;
let timeout;
let points = 0;

class MainQuestion {
    constructor() {

        this.title = questionDiv.querySelector(".title");
        this.buttonsAnswers = [...questionDiv.querySelectorAll("button.answer")];

        for (let i = 0; i < this.buttonsAnswers.length; i++) {
            this.buttonsAnswers[i].addEventListener("click", onSelectButton);
        }

    }

    initialazeWithQuestion(qNumber) {

        this.title.textContent = questions[qNumber].question;

        for (let i = 0; i < this.buttonsAnswers.length; i++) {
            this.buttonsAnswers[i].classList.remove("wrong-answers");
            this.buttonsAnswers[i].classList.remove("good-answer");
            this.buttonsAnswers[i].classList.remove("correct-answers");
            this.buttonsAnswers[i].classList.remove("chosen-answer");

            this.buttonsAnswers[i].textContent = questions[qNumber].answers[i];


            if (this.buttonsAnswers[i].textContent === questions[qNumber].correct_answer) {
                this.buttonsAnswers[i].classList.add("good-answer");
            }

        }
        this.isChecked = false;
    }

    selectedButton(button) {
        if (this.isChecked === true) {
            return;
        }
        for (let i = 0; i < this.buttonsAnswers.length; i++) {

            if (this.buttonsAnswers[i] === button) {
                this.buttonsAnswers[i].classList.add("chosen-answer");

            } else {
                this.buttonsAnswers[i].classList.remove("chosen-answer");
            }
        }
    }

    checkIfAnySelected() {
        for (let i = 0; i < this.buttonsAnswers.length; i++) {
            if (this.buttonsAnswers[i].classList.contains("chosen-answer")) {
                return this.buttonsAnswers[i];
            }


        }

        return undefined;
    }

    goodOrBadAnswer() {
        if (this.isChecked === true) {
            return;
        }
        let choosenButton = this.checkIfAnySelected();

        if (choosenButton === undefined) {
            return;
        }

        if (choosenButton.classList.contains("good-answer")) {
            choosenButton.classList.add("correct-answers")
            points++;
        } else {
            choosenButton.classList.add("wrong-answers");
        }
        this.isChecked = true;

    }


}

function onSelectButton() {
    myObject.selectedButton(this);
}

function start() {
    myObject = new MainQuestion();
    myObject.initialazeWithQuestion(indexQuestion);
}

function nextQuestion() {
    if (myObject.isChecked === false) {

        if (myObject.checkIfAnySelected() === undefined) {
            alert("zaznacz odpowiedz");
            return;
        }

        myObject.goodOrBadAnswer();
        timeout = setTimeout(setNextQuestion, 2000);
    } else {
        clearTimeout(timeout);
        setNextQuestion();
    }

}

function setNextQuestion() {
    if (indexQuestion + 1 >= questions.length) {
        endGame();
        return;
    }

    indexQuestion++;
    myObject.initialazeWithQuestion(indexQuestion);
}


function endGame() {

    questionDiv.classList.add("hidden");
    finishDiv.classList.remove("hidden");
    finishDiv.querySelector("p").textContent = `Gratulacje Twoja liczba punktów wynosi: ${points}`;

}

function restartGame() {
    indexQuestion = 0;
    points = 0;
    myObject.initialazeWithQuestion(indexQuestion);

    questionDiv.classList.remove("hidden");
    finishDiv.classList.add("hidden");
}




btnNext.addEventListener("click", nextQuestion);
btnAgain.addEventListener("click", restartGame);

start();