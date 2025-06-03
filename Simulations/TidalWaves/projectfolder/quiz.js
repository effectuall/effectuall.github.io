let questions = [];

window.onload = async function () {
    const response = await fetch('questions.json');
    questions = await response.json();
    renderQuestions();
};

function renderQuestions() {
    const container = document.getElementById('questions');
    questions.forEach((q, index) => {
        const qDiv = document.createElement('div');
        qDiv.classList.add('question-block');
        qDiv.innerHTML = `
      <p><strong>${index + 1}. ${q.question}</strong></p>
      ${q.options.map((opt, i) =>
            `<label><input type="radio" name="q${index}" value="${i}"> ${opt}</label><br>`
        ).join('')}
    `;
        container.appendChild(qDiv);
    });

    document.getElementById('submitBtn').addEventListener('click', showResults);
}

function showResults() {
    let score = 0;
    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
            score++;
        }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Your Score: ${score} / ${questions.length}</h3>`;
}
