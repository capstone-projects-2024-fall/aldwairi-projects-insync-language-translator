// Quiz.js
const { useState, useEffect } = React;

const quizService = {
  async generateQuiz(language, category) {
    const quizQuestions = {
      English: {
        vocabulary: [
          {
            question: 'What is the synonym of "quick"?',
            options: [
              { text: 'Slow', isCorrect: false },
              { text: 'Fast', isCorrect: true },
              { text: 'Lazy', isCorrect: false },
              { text: 'Late', isCorrect: false },
            ],
          },
          {
            question: 'Select the antonym of "happy".',
            options: [
              { text: 'Joyful', isCorrect: false },
              { text: 'Sad', isCorrect: true },
              { text: 'Cheerful', isCorrect: false },
              { text: 'Glad', isCorrect: false },
            ],
          },
          // Add more vocabulary questions
        ],
        grammar: [
          {
            question: 'Choose the correct form: She ___ to the store yesterday.',
            options: [
              { text: 'goes', isCorrect: false },
              { text: 'going', isCorrect: false },
              { text: 'went', isCorrect: true },
              { text: 'gone', isCorrect: false },
            ],
          },
          {
            question: 'Fill in the blank: They have ___ a new car.',
            options: [
              { text: 'buy', isCorrect: false },
              { text: 'bought', isCorrect: true },
              { text: 'buying', isCorrect: false },
              { text: 'buys', isCorrect: false },
            ],
          },
          // Add more grammar questions
        ],
      },
      // Add more languages if needed
    };

    return quizQuestions[language][category] || [];
  },
};

const Quiz = () => {
  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCategory, setSelectedCategory] = useState('vocabulary');
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false); // NEW state for quiz start

  // Function to load quiz questions
  const loadQuiz = async () => {
    setLoading(true);
    try {
      const newQuestions = await quizService.generateQuiz(selectedLanguage, selectedCategory);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsQuizFinished(false);
    } catch (error) {
      console.error('Error loading quiz:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadQuiz();
  }, [selectedLanguage, selectedCategory]);

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setIsQuizStarted(false); // Reset quiz start state
    loadQuiz();
  };

  if (loading) return <div className="text-center">Loading quiz...</div>;

  if (!questions.length) return <div className="text-center">No questions available.</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="language-selection">
          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="English">English</option>
            {/* Add more languages here */}
          </select>
        </div>
        <div className="category-selection">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="vocabulary">Vocabulary</option>
            <option value="grammar">Grammar</option>
            {/* Add more categories here */}
          </select>
        </div>
      </div>

      {!isQuizStarted ? (
        <div className="start-quiz-section">
          <button onClick={() => setIsQuizStarted(true)}>Start Quiz</button>
        </div>
      ) : isQuizFinished ? (
        <div className="score-section">
          <h2>
            Your Score: {score} out of {questions.length}
          </h2>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="question-text">{questions[currentQuestionIndex].question}</div>
          <div className="answer-options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option.isCorrect)}>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<Quiz />, document.getElementById('root'));
