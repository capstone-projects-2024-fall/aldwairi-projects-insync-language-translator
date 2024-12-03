const { useState, useEffect } = React;

const API_KEY = 'AIzaSyCUUd14-5vzarz_paFMmd_nepwE-TZ9FhU'; // API key

const quizService = {
  async generateQuiz(language) {
    const allWords = [
      'apple', 'banana', 'car', 'house', 'dog', 'run', 'happy', 'computer', 'water', 'sun',
      'cat', 'tree', 'flower', 'jump', 'read', 'write', 'sad', 'fast', 'phone', 'moon',
      'bird', 'book', 'chair', 'table', 'swim', 'big', 'small', 'food', 'star', 'sky',
    ];

    const shuffledWords = allWords.sort(() => Math.random() - 0.5);
    const words = shuffledWords.slice(0, 5);

    const sourceLanguage = 'en';
    const targetLanguage = getLanguageCode(language);

    const translationPromises = words.map(word =>
      getTranslatedText(word, sourceLanguage, targetLanguage)
        .then(translatedWord => ({ word, translatedWord }))
    );

    const translations = await Promise.all(translationPromises);

    const questions = [];

    for (const { word, translatedWord } of translations) {
      if (translatedWord) {
        const distractors = await generateDistractors(translatedWord, targetLanguage);
        const options = [
          { text: translatedWord, isCorrect: true },
          ...distractors.map(text => ({ text, isCorrect: false })),
        ];

        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        questions.push({
          question: `What is the translation of the word '${word}' in ${language}?`,
          options: shuffledOptions,
          correctAnswer: translatedWord,
        });
      }
    }

    return questions;
  },
};

function getLanguageCode(languageName) {
  const languageCodes = {
    Spanish: 'es',
    French: 'fr',
    German: 'de',
    Russian: 'ru',
    Arabic: 'ar',
  };
  return languageCodes[languageName];
}

async function getTranslatedText(text, sourceLanguage, targetLanguage) {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error(`Error translating '${text}':`, error);
    return null;
  }
}

async function generateDistractors(correctTranslation, targetLanguage) {
  const distractorWords = [
    'car', 'house', 'dog', 'cat', 'tree', 'flower', 'run', 'jump', 'swim',
    'read', 'write', 'happy', 'sad', 'fast', 'slow', 'big', 'small', 'computer',
    'phone', 'water', 'food', 'sun', 'moon', 'bird', 'book', 'chair', 'table',
  ];

  const shuffledDistractorWords = distractorWords.sort(() => Math.random() - 0.5);

  const translationPromises = shuffledDistractorWords.map(word =>
    getTranslatedText(word, 'en', targetLanguage)
  );

  const translatedWords = await Promise.all(translationPromises);

  const distractors = translatedWords
    .filter(translatedWord =>
      translatedWord &&
      translatedWord !== correctTranslation
    )
    .slice(0, 3);

  return distractors;
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const newQuestions = await quizService.generateQuiz(selectedLanguage);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsQuizFinished(false);
      setShowCorrectAnswers(false);
    } catch (error) {
      console.error('Error loading quiz:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isQuizStarted) {
      loadQuiz();
    }
  }, [selectedLanguage, isQuizStarted]);

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
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestions([]);
  };

  if (loading) return <div className="text-center">Loading quiz...</div>;

  if (!questions.length && isQuizStarted && !loading)
    return <div className="text-center">No questions available.</div>;

  return (
    
    <div className="quiz-container"
      style={{
        maxWidth: '900px', /* Increased from 800px */
        margin: '50px auto',
        padding: '30px', /* Increased from 20px */
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      }}
      >
      <div className="quiz-header">
        <div className="language-selection">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={isQuizStarted}
          >
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Russian">Russian</option>
            <option value="Arabic">Arabic</option>
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
          <button onClick={() => setShowCorrectAnswers(true)}>Show Correct Answers</button>
          {showCorrectAnswers && (
            <div className="correct-answers-section">
              <h3>Correct Answers:</h3>
              <ul>
                {questions.map((q, index) => (
                  <li key={index}>
                    {q.question} - <strong>{q.correctAnswer}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestionIndex].question}
          </div>
          <div className="answer-options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.isCorrect)}
              >
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
