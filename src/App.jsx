// App.js
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = (searchResults) => {
    setResults(searchResults);
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <SearchForm onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
}

export default App;
