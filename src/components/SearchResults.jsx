import { useState, useEffect } from 'react';

function SearchResults({ searchTerm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://content.guardianapis.com/search?q=${encodeURIComponent(
            searchTerm
          )}&api-key=76940010-d84e-4910-b908-0a2fc059036f`
        );
        const data = await response.json();
        setSearchResults(data.response.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Group search results by section
  // would add some more styling to this so more than on worded titles would not look like lifeandstyle for example
  const groupedResults = {};
  searchResults.forEach((result) => {
    if (!groupedResults[result.sectionId]) {
      groupedResults[result.sectionId] = [];
    }
    groupedResults[result.sectionId].push(result);
  });

  return (
    <article>
      {Object.keys(groupedResults).map((sectionId) => (
        <section key={sectionId} className='border-b-2 mb-4'>
          <h2 className='text-2xl font-semibold my-auto uppercase'>
            {sectionId}
          </h2>
          <ul>
            {groupedResults[sectionId].map((article) => (
              <li key={article.id} className='my-4'>
                <h3 className='text-xl text-blue-400 hover:underline'>
                  <a
                    href={article.webUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {article.webTitle}
                  </a>
                </h3>
                <p className='text-sm text-gray-600'>
                  Publication Date: {formatDate(article.webPublicationDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

export default SearchResults;
