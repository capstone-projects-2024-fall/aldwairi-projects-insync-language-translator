// flashcards.js
const { useState, useEffect } = React;

const translateService = {
  async generateFlashcards(language, category, count = 5) {
    const commonWords = {
      French: {
        greetings: [
          { front: "Hello", back: "Bonjour" },
          { front: "Good morning", back: "Bon matin" },
          { front: "Good evening", back: "Bonsoir" },
          { front: "Goodbye", back: "Au revoir" },
          { front: "See you later", back: "À plus tard" }
        ],
        food: [
          { front: "Bread", back: "Pain" },
          { front: "Water", back: "Eau" },
          { front: "Restaurant", back: "Restaurant" },
          { front: "Breakfast", back: "Petit-déjeuner" },
          { front: "Dinner", back: "Dîner" }
        ]
      },
      Spanish: {
        greetings: [
          { front: "Hello", back: "Hola" },
          { front: "Good morning", back: "Buenos días" },
          { front: "Good evening", back: "Buenas noches" },
          { front: "Goodbye", back: "Adiós" },
          { front: "See you later", back: "Hasta luego" }
        ],
        food: [
          { front: "Bread", back: "Pan" },
          { front: "Water", back: "Agua" },
          { front: "Restaurant", back: "Restaurante" },
          { front: "Breakfast", back: "Desayuno" },
          { front: "Dinner", back: "Cena" }
        ]
      },
      German: {
        greetings: [
          { front: "Hello", back: "Hallo" },
          { front: "Good morning", back: "Guten Morgen" },
          { front: "Good evening", back: "Guten Abend" },
          { front: "Goodbye", back: "Auf Wiedersehen" },
          { front: "See you later", back: "Bis später" }
        ],
        food: [
          { front: "Bread", back: "Brot" },
          { front: "Water", back: "Wasser" },
          { front: "Restaurant", back: "Restaurant" },
          { front: "Breakfast", back: "Frühstück" },
          { front: "Dinner", back: "Abendessen" }
        ]
      },
      Italian: {
        greetings: [
          { front: "Hello", back: "Ciao" },
          { front: "Good morning", back: "Buongiorno" },
          { front: "Good evening", back: "Buona sera" },
          { front: "Goodbye", back: "Arrivederci" },
          { front: "See you later", back: "A dopo" }
        ],
        food: [
          { front: "Bread", back: "Pane" },
          { front: "Water", back: "Acqua" },
          { front: "Restaurant", back: "Ristorante" },
          { front: "Breakfast", back: "Colazione" },
          { front: "Dinner", back: "Cena" }
        ]
      },
      Portuguese: {
        greetings: [
          { front: "Hello", back: "Olá" },
          { front: "Good morning", back: "Bom dia" },
          { front: "Good evening", back: "Boa noite" },
          { front: "Goodbye", back: "Adeus" },
          { front: "See you later", back: "Até logo" }
        ],
        food: [
          { front: "Bread", back: "Pão" },
          { front: "Water", back: "Água" },
          { front: "Restaurant", back: "Restaurante" },
          { front: "Breakfast", back: "Café da manhã" },
          { front: "Dinner", back: "Jantar" }
        ]
      }
    };

    return commonWords[language][category] || [];
  }
};

const Flashcards = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('French');
    const [selectedCategory, setSelectedCategory] = useState('greetings');
  
    const loadFlashcards = async () => {
      setLoading(true);
      try {
        const newCards = await translateService.generateFlashcards(selectedLanguage, selectedCategory);
        setCards(newCards);
        setCurrentCard(0);
        setIsFlipped(false);
      } catch (error) {
        console.error('Error loading flashcards:', error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      loadFlashcards();
    }, [selectedLanguage, selectedCategory]);
  
    const handleNext = () => {
      setIsFlipped(false);
      setCurrentCard((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    };
  
    const handlePrevious = () => {
      setIsFlipped(false);
      setCurrentCard((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    };
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
    };
  
    if (!cards.length) return <div className="text-center">Loading flashcards...</div>;
  
    return (
      <div className="grid grid-cols-3 gap-4 p-4 max-w-lg mx-auto">
        <div className="col-span-1">
          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Portuguese">Portuguese</option>



          </select>
        </div>
        <div className="col-span-1 text-center font-bold">
          {selectedLanguage} - {selectedCategory}
        </div>
        <div className="col-span-1 flex justify-end gap-2">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleFlip}>Flip</button>
          <button onClick={handleNext}>Next</button>
        </div>
  
        <div className="col-span-3">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="greetings">Greetings</option>
            <option value="food">Food</option>
          </select>
        </div>
  
        <div className="col-span-3 card" onClick={handleFlip} style={{ height: '200px', width: '100%', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div style={{ fontSize: '24px' }}>
              {isFlipped ? cards[currentCard].back : cards[currentCard].front}
            </div>
          )}
        </div>
  
        <div className="col-span-3 text-center">
          Card {currentCard + 1} of {cards.length}
        </div>
      </div>
    );
  };
  
  ReactDOM.render(<Flashcards />, document.getElementById('root'));