// assets/js/module-quiz.js

/**
 * Fetches quiz data from the JSON file.
 * @returns {Promise<Array>} A promise that resolves to an array of quiz objects.
 */
async function fetchQuizData() {
    try {
        const response = await fetch('../quizzes/quizzes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const quizzes = await response.json();
        return quizzes;
    } catch (error) {
        console.error("Could not fetch quiz data:", error);
        // Return an empty array or handle error gracefully in the UI
        return [];
    }
}

/**
 * Renders a specific quiz based on its ID into the quiz container.
 * @param {string} quizId - The ID of the quiz to render (e.g., 'geosphere-quiz').
 */
async function renderQuiz(quizId) {
    const quizContainer = document.getElementById('quiz-container');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    const quizResultsDiv = document.getElementById('quiz-results');

    if (!quizContainer || !submitQuizBtn || !quizResultsDiv) {
        console.warn("Quiz elements not found on this page. Skipping quiz rendering.");
        return;
    }

    // Clear previous results and hide results div
    quizResultsDiv.innerHTML = '';
    quizResultsDiv.classList.add('hidden');
    submitQuizBtn.disabled = false; // Enable submit button

    const quizzes = await fetchQuizData();
    const currentQuiz = quizzes.find(quiz => quiz.id === quizId);

    if (!currentQuiz) {
        quizContainer.innerHTML = '<p class="text-red-500">Quiz not found for this module.</p>';
        submitQuizBtn.style.display = 'none'; // Hide submit button if no quiz
        return;
    }

    let quizHtml = `<h4 class="text-xl font-bold text-gray-800 mb-4">${currentQuiz.title}</h4>`;
    currentQuiz.questions.forEach((q, index) => {
        quizHtml += `
            <div class="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p class="font-semibold text-lg text-gray-800 mb-3">${index + 1}. ${q.questionText}</p>
        `;
        if (q.type === 'multiple-choice') {
            q.options.forEach(option => {
                quizHtml += `
                    <div class="mb-2">
                        <input type="radio" id="q${index}-option-${option.replace(/\s+/g, '-')}" name="question${index}" value="${option}" class="mr-2">
                        <label for="q${index}-option-${option.replace(/\s+/g, '-')}" class="text-gray-700">${option}</label>
                    </div>
                `;
            });
        } else if (q.type === 'true-false') {
            quizHtml += `
                <div class="mb-2">
                    <input type="radio" id="q${index}-option-true" name="question${index}" value="True" class="mr-2">
                    <label for="q${index}-option-true" class="text-gray-700">True</label>
                </div>
                <div class="mb-2">
                    <input type="radio" id="q${index}-option-false" name="question${index}" value="False" class="mr-2">
                    <label for="q${index}-option-false" class="text-gray-700">False</label>
                </div>
            `;
        } else if (q.type === 'fill-in-the-blank') {
            quizHtml += `
                <input type="text" id="q${index}-fill" name="question${index}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm" placeholder="Your answer">
            `;
        }
        quizHtml += `</div>`;
    });
    quizContainer.innerHTML = quizHtml;

    // Add event listener for quiz submission
    submitQuizBtn.onclick = () => {
        checkQuizAnswers(currentQuiz, quizContainer, quizResultsDiv, submitQuizBtn);
    };
    submitQuizBtn.style.display = 'block'; // Ensure button is visible
}

/**
 * Checks the user's answers for the quiz and displays results.
 * @param {Object} quizData - The current quiz data object.
 * @param {HTMLElement} quizContainer - The DOM element containing the quiz questions.
 * @param {HTMLElement} quizResultsDiv - The DOM element to display results.
 * @param {HTMLElement} submitBtn - The submit button element.
 */
function checkQuizAnswers(quizData, quizContainer, quizResultsDiv, submitBtn) {
    let score = 0;
    let resultsHtml = `<h4 class="text-xl font-bold mb-3">Your Quiz Results:</h4>`;
    const numQuestions = quizData.questions.length;

    quizData.questions.forEach((q, index) => {
        let userAnswer = '';
        let isCorrect = false;

        const questionElement = quizContainer.querySelector(`div:nth-child(${index + 2})`); // Adjust selector for direct children after title

        if (q.type === 'multiple-choice' || q.type === 'true-false') {
            const selectedOption = questionElement.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                userAnswer = selectedOption.value;
                isCorrect = (userAnswer === q.correctAnswer);
            }
        } else if (q.type === 'fill-in-the-blank') {
            const fillInput = questionElement.querySelector(`#q${index}-fill`);
            if (fillInput) {
                userAnswer = fillInput.value.trim();
                // Case-insensitive comparison for fill-in-the-blank
                isCorrect = (userAnswer.toLowerCase() === q.correctAnswer.toLowerCase());
            }
        }

        if (isCorrect) {
            score++;
            resultsHtml += `<p class="text-green-700 font-medium">${index + 1}. Correct! </p>`;
        } else {
            resultsHtml += `<p class="text-red-700 font-medium">${index + 1}. Incorrect. Your answer: "${userAnswer || 'No answer'}". Correct answer: "${q.correctAnswer}".</p>`;
        }
        resultsHtml += `<p class="text-gray-600 mb-2 text-sm">Explanation: ${q.explanation}</p>`;
    });

    resultsHtml += `<p class="text-2xl font-bold mt-4">You scored ${score} out of ${numQuestions}.</p>`;
    quizResultsDiv.innerHTML = resultsHtml;
    quizResultsDiv.classList.remove('hidden');
    submitBtn.disabled = true; // Disable submit button after showing results
}


// Event listener to trigger quiz rendering when the Quiz tab is clicked
document.addEventListener('DOMContentLoaded', () => {
    const quizTabBtn = document.getElementById('quizTabBtn');
    if (quizTabBtn) {
        quizTabBtn.addEventListener('click', () => {
            // Get the module ID from the URL or a data attribute if needed.
            // For now, let's assume it's 'geosphere-quiz' for the geosphere.html example.
            // In a more complex app, you'd extract this dynamically.
            const path = window.location.pathname;
            let quizId = '';
            if (path.includes('geosphere')) {
                quizId = 'geosphere-quiz';
            } else if (path.includes('hydrosphere')) {
                quizId = 'hydrosphere-quiz';
            }
            // Add more else if for other modules

            if (quizId) {
                renderQuiz(quizId);
                console.log(`Rendering quiz for module: ${quizId}`);
            } else {
                console.warn("Could not determine quiz ID for this module.");
                document.getElementById('quiz-container').innerHTML = '<p class="text-red-500">No quiz available for this module yet.</p>';
                document.getElementById('submitQuizBtn').style.display = 'none';
            }
        });
    }
    console.log("Module quiz script loaded.");
});
