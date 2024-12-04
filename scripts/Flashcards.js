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
      },
      Chinese: {
        greetings: [
          { front: "Hello", back: "你好 (Nǐ hǎo)" },
          { front: "Good morning", back: "早上好 (Zǎoshang hǎo)" },
          { front: "Good evening", back: "晚上好 (Wǎnshàng hǎo)" },
          { front: "Goodbye", back: "再见 (Zàijiàn)" },
          { front: "See you later", back: "回头见 (Huítóu jiàn)" }
        ],
        food: [
          { front: "Bread", back: "面包 (Miànbāo)" },
          { front: "Water", back: "水 (Shuǐ)" },
          { front: "Restaurant", back: "餐馆 (Cānguǎn)" },
          { front: "Breakfast", back: "早餐 (Zǎocān)" },
          { front: "Dinner", back: "晚餐 (Wǎncān)" }
        ]
      },
      Japanese: {
        greetings: [
          { front: "Hello", back: "こんにちは (Konnichiwa)" },
          { front: "Good morning", back: "おはようございます (Ohayō gozaimasu)" },
          { front: "Good evening", back: "こんばんは (Konbanwa)" },
          { front: "Goodbye", back: "さようなら (Sayōnara)" },
          { front: "See you later", back: "またね (Matane)" }
        ],
        food: [
          { front: "Bread", back: "パン (Pan)" },
          { front: "Water", back: "水 (Mizu)" },
          { front: "Restaurant", back: "レストラン (Resutoran)" },
          { front: "Breakfast", back: "朝食 (Chōshoku)" },
          { front: "Dinner", back: "夕食 (Yūshoku)" }
        ]
      },
      Russian: {
        greetings: [
          { front: "Hello", back: "Здравствуйте (Zdravstvuyte)" },
          { front: "Good morning", back: "Доброе утро (Dobroye utro)" },
          { front: "Good evening", back: "Добрый вечер (Dobryy vecher)" },
          { front: "Goodbye", back: "До свидания (Do svidaniya)" },
          { front: "See you later", back: "Увидимся позже (Uvidimsya pozhe)" }
        ],
        food: [
          { front: "Bread", back: "Хлеб (Khleb)" },
          { front: "Water", back: "Вода (Voda)" },
          { front: "Restaurant", back: "Ресторан (Restoran)" },
          { front: "Breakfast", back: "Завтрак (Zavtrak)" },
          { front: "Dinner", back: "Ужин (Uzhin)" }
        ]
      },
      Hindi: {
        greetings: [
          { front: "Hello", back: "नमस्ते (Namaste)" },
          { front: "Good morning", back: "सुप्रभात (Suprabhat)" },
          { front: "Good evening", back: "शुभ संध्या (Shubh Sandhya)" },
          { front: "Goodbye", back: "अलविदा (Alvida)" },
          { front: "See you later", back: "फिर मिलेंगे (Phir Milenge)" }
        ],
        food: [
          { front: "Bread", back: "रोटी (Roti)" },
          { front: "Water", back: "पानी (Pani)" },
          { front: "Restaurant", back: "रेस्तरां (Restauraan)" },
          { front: "Breakfast", back: "नाश्ता (Nashta)" },
          { front: "Dinner", back: "रात का खाना (Raat ka Khana)" }
        ]
      },
      Arabic: {
        greetings: [
          { front: "Hello", back: "مرحبا (Marhaban)" },
          { front: "Good morning", back: "صباح الخير (Sabah alkhayr)" },
          { front: "Good evening", back: "مساء الخير (Masa' alkhayr)" },
          { front: "Goodbye", back: "وداعا (Wadaeaan)" },
          { front: "See you later", back: "أراك لاحقًا (Arak Lahikan)" }
        ],
        food: [
          { front: "Bread", back: "خبز (Khubz)" },
          { front: "Water", back: "ماء (Ma')" },
          { front: "Restaurant", back: "مطعم (Matam)" },
          { front: "Breakfast", back: "فطور (Futoor)" },
          { front: "Dinner", back: "عشاء (Asha')" }
        ]
      },
      Korean: {
        greetings: [
          { front: "Hello", back: "안녕하세요 (Annyeonghaseyo)" },
          { front: "Good morning", back: "좋은 아침 (Joeun Achim)" },
          { front: "Good evening", back: "좋은 저녁 (Joeun Jeonyeok)" },
          { front: "Goodbye", back: "안녕히 가세요 (Annyeonghi Gaseyo)" },
          { front: "See you later", back: "나중에 봐요 (Najunge Bwayo)" }
        ],
        food: [
          { front: "Bread", back: "빵 (Ppang)" },
          { front: "Water", back: "물 (Mul)" },
          { front: "Restaurant", back: "식당 (Sikdang)" },
          { front: "Breakfast", back: "아침 식사 (Achim Siksa)" },
          { front: "Dinner", back: "저녁 식사 (Jeonyeok Siksa)" }
        ]
      },
      Vietnamese: {
        greetings: [
          { front: "Hello", back: "Xin chào (Sin chào)" },
          { front: "Good morning", back: "Chào buổi sáng (Chào buoi sáng)" },
          { front: "Good evening", back: "Chào buổi tối (Chào buoi tối)" },
          { front: "Goodbye", back: "Tạm biệt (Tạm biêt)" },
          { front: "See you later", back: "Hẹn gặp lại (Hẹn găp lại)" }
        ],
        food: [
          { front: "Bread", back: "Bánh mì (Bánh mi)" },
          { front: "Water", back: "Nước (Nước)" },
          { front: "Restaurant", back: "Nhà hàng (Nhà hang)" },
          { front: "Breakfast", back: "Bữa sáng (Bưa sáng)" },
          { front: "Dinner", back: "Bữa tối (Bưa tối)" }
        ]
      },
      Thai: {
        greetings: [
          { front: "Hello", back: "สวัสดี (Sawasdee)" },
          { front: "Good morning", back: "สวัสดีตอนเช้า (Sawasdee Ton Chao)" },
          { front: "Good evening", back: "สวัสดีตอนเย็น (Sawasdee Ton Yen)" },
          { front: "Goodbye", back: "ลาก่อน (La Gon)" },
          { front: "See you later", back: "แล้วพบกันใหม่ (Laew Phop Kan Mai)" }
        ],
        food: [
          { front: "Bread", back: "ขนมปัง (Kanom Pang)" },
          { front: "Water", back: "น้ำ (Nam)" },
          { front: "Restaurant", back: "ร้านอาหาร (Ran Ahan)" },
          { front: "Breakfast", back: "อาหารเช้า (Ahan Chao)" },
          { front: "Dinner", back: "อาหารเย็น (Ahan Yen)" }
        ]
      },
      Turkish: {
        greetings: [
          { front: "Hello", back: "Merhaba (Mer-ha-ba)" },
          { front: "Good morning", back: "Günaydın (Goo-nay-din)" },
          { front: "Good evening", back: "İyi akşamlar (Ee-ak-sham-lar)" },
          { front: "Goodbye", back: "Hoşça kal (Hosh-cha-kal)" },
          { front: "See you later", back: "Görüşürüz (Go-roo-shoo-rooz)" }
        ],
        food: [
          { front: "Bread", back: "Ekmek (Ek-mek)" },
          { front: "Water", back: "Su (Soo)" },
          { front: "Restaurant", back: "Restoran (Res-to-ran)" },
          { front: "Breakfast", back: "Kahvaltı (Kah-vahl-tuh)" },
          { front: "Dinner", back: "Akşam yemeği (Ak-sham ye-me-yuh)" }
        ]
      },
      Ukrainian: {
        greetings: [
          { front: "Hello", back: "Привіт (Pryvit)" },
          { front: "Good morning", back: "Доброго ранку (Dobroho Ranku)" },
          { front: "Good evening", back: "Доброго вечора (Dobroho Vechora)" },
          { front: "Goodbye", back: "До побачення (Do Pobachennya)" },
          { front: "See you later", back: "Побачимось (Pobachymos)" }
        ],
        food: [
          { front: "Bread", back: "Хліб (Khlib)" },
          { front: "Water", back: "Вода (Voda)" },
          { front: "Restaurant", back: "Ресторан (Restoran)" },
          { front: "Breakfast", back: "Сніданок (Snidanok)" },
          { front: "Dinner", back: "Вечеря (Vecheria)" }
        ]
      },
      Polish: {
        greetings: [
          { front: "Hello", back: "Cześć (Cheshch)" },
          { front: "Good morning", back: "Dzień dobry (Jen Doh-bri)" },
          { front: "Good evening", back: "Dobry wieczór (Doh-bri Vye-choor)" },
          { front: "Goodbye", back: "Do widzenia (Doh Vid-zen-ya)" },
          { front: "See you later", back: "Do zobaczenia (Doh Zo-bach-en-ya)" }
        ],
        food: [
          { front: "Bread", back: "Chleb (Hlep)" },
          { front: "Water", back: "Woda (Voh-dah)" },
          { front: "Restaurant", back: "Restauracja (Reh-staw-rats-ya)" },
          { front: "Breakfast", back: "Śniadanie (Shnya-da-nye)" },
          { front: "Dinner", back: "Kolacja (Ko-lat-sya)" }
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
            <option value="Russian">Russian</option>
            <option value="Hindi">Hindi</option>
            <option value="Arabic">Arabic</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Thai">Thai</option>
            <option value="Turkish">Turkish</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Polish">Polish</option>

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