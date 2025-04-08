let quizData = [];
        let currentQuestionIndex = 0;

        fetch('questions.json')
            .then(response => response.json())
            .then(data => {
                quizData = data;
                loadQuestion();
                updateProgressBar();
            })
            .catch(error => console.error('Error loading questions:', error));

        function loadQuestion() {
            if (quizData.length === 0) return;
            if (currentQuestionIndex >= quizData.length) {
                document.querySelector(".quiz-container").innerHTML = "<h2>Quiz finished!</h2>";
                return;
            }
            const currentQuestion = quizData[currentQuestionIndex];
            document.getElementById("question").innerText = currentQuestion.question;
            document.getElementById("correct-lenght").innerText = "Select " + currentQuestion.correct.length + " options";
            const labels = document.querySelectorAll(".answers label span");
            labels.forEach((span, index) => {
                span.innerText = currentQuestion.answers[index];
            });
            document.querySelectorAll("input[name='answer']").forEach(input => input.checked = false);
            document.getElementById("result").innerText = "";

            const imageElement = document.getElementById("question-image");
            if (currentQuestion.image) {
                imageElement.src = currentQuestion.image;
                imageElement.style.display = "block";
            } else {
                imageElement.style.display = "none";
            }
        }

        function nextQuestion() {
            const selectedAnswers = Array.from(document.querySelectorAll("input[name='answer']:checked"))
                .map(input => parseInt(input.value));
            const correctAnswers = quizData[currentQuestionIndex].correct;
            
            if (arraysEqual(selectedAnswers, correctAnswers)) {
                document.getElementById("result").innerText = "Correct!";
            } else {
                document.getElementById("result").innerText = "Wrong, try again!";
                return;
            }
            
            currentQuestionIndex++;
            updateProgressBar();
            setTimeout(loadQuestion, 1000);
        }

        function arraysEqual(a, b) {
            return a.length === b.length && a.every(value => b.includes(value));
        }

        function updateProgressBar() {
            const progress = ((currentQuestionIndex) / quizData.length) * 100;
            document.getElementById("progress-bar").style.width = progress + "%";
        }