import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

function Typewriter({ text, delay }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, currentIndex]);

  return (
    <h1 className='font-semibold text-3xl my-4 text-gray-700'>{displayText}</h1>
  );
}

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      {isTyping && <Typewriter text='Torque News' delay={100} />}
      <form className='mb-4'>
        <label className='sr-only text-gray-800' htmlFor='searchInput'>
          Torque News
        </label>
        <input
          type='text'
          id='searchInput'
          value={searchTerm}
          onChange={handleChange}
          placeholder='Enter a search term...'
          className='border-2 border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500'
          aria-label='Search News'
          required
        />
      </form>
      <SearchResults searchTerm={debouncedSearchTerm} />
    </div>
  );
}

export default SearchForm;
