const { useState, useEffect } = React;

const LanguageTutorials = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('French');
  const [selectedCategory, setSelectedCategory] = useState('greetings');

  const YOUTUBE_API_KEY = 'AIzaSyDjwWpHwBim16woM-u0eFZEdd3uKktUyH8';

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchQuery = `${selectedLanguage} ${selectedCategory} tutorial language learning`;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(
            searchQuery
          )}&type=video&key=${YOUTUBE_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data.items);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedLanguage, selectedCategory]);

  const languages = [
    'French', 'Spanish', 'German', 'Italian', 'Portuguese', 'Russian',
    'Hindi', 'Arabic', 'Chinese', 'Japanese', 'Korean', 'Vietnamese',
    'Thai', 'Turkish', 'Ukrainian', 'Polish'
  ];

  const categories = [
    'greetings','grammar','basic'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Language Learning Tutorials</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tutorials...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id.videoId} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
               
              </a>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {video.snippet.description}
              </p>
              <div className="mt-4">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  Watch Tutorial
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<LanguageTutorials />, document.getElementById('root'));