let new_questions = [];
let question = null;
let answers = [];
let streak = 0;
let question_counter = 0;


const optionButtons = document.querySelectorAll(".option");
const nextButton = document.getElementById("nextButton");


optionButtons.forEach(button => {
    button.addEventListener("click", () => {
        enableNextButton();
        feedback(button);
        disableOptions();
        updateStreak(button);
    });
});

nextButton.addEventListener("click", generateNewQuestion);


async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');
    const data = await response.json();
    new_questions = data.results;
}


function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}


function enableNextButton() {
    nextButton.removeAttribute('disabled');
}


function disableNextButton() {
    nextButton.setAttribute('disabled', 'disabled');
}


function enableOptions() {
    optionButtons.forEach(option => {
        option.removeAttribute('disabled');
        option.classList.remove('correct', 'incorrect')
    });
}


function disableOptions() {
    optionButtons.forEach(option => {
        option.setAttribute('disabled', 'disabled');
    });
}


function feedback(clickedButton) {
    const correct_answer = decodeHTMLEntities(new_questions[question_counter].correct_answer);

    optionButtons.forEach(button => {
        const text = button.textContent.trim();
        if (text === correct_answer.trim()) {
            button.classList.add('correct');
        } else if (button === clickedButton) {
            button.classList.add('incorrect');
        }
    })
}


function updateStreak(clickedButton) {
    if (clickedButton.textContent.trim() === decodeHTMLEntities(new_questions[question_counter].correct_answer.trim())) {
        streak++;
    } else {
        streak = 0;
    }
    document.getElementById('streakCount').innerText = streak;
}


function generateNewQuestion() {
    if (question_counter == 49) {
        (async () => {
            await fetchQuestions();
            generateNewQuestion();
        })();
        question_counter = 0;
    }

    else {

        question_counter++;

        question = decodeHTMLEntities(new_questions[question_counter].question);

        answers = [new_questions[question_counter].correct_answer, ...new_questions[question_counter].incorrect_answers];
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        document.getElementById('question').textContent = question;
        document.getElementById('firstOption').textContent = decodeHTMLEntities(answers[0]);
        document.getElementById('secondOption').textContent = decodeHTMLEntities(answers[1]);
        document.getElementById('thirdOption').textContent = decodeHTMLEntities(answers[2]);
        document.getElementById('fourthOption').textContent = decodeHTMLEntities(answers[3]);

        enableOptions();
        disableNextButton();
    }
}


(async () => {
    await fetchQuestions();
    generateNewQuestion();
})();
