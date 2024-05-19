import { useState, useRef, useEffect } from "react";

function Search({ setSearchQuery }) {
  const [searchQuery, setSearchQueryState] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery, setSearchQuery]);

  const isSearchEnabled = searchQuery.trim() !== "";

  const handleSearch = () => {
    if (isSearchEnabled) {
      // Perform search action
      console.log("Searching for:", searchQuery);
      // Add the new search result to the list of all results
      setAllResults((prevResults) => [...prevResults, searchQuery]);
    }
  };

  const handleAddNewWord = () => {
    if (searchQuery) {
      // Get the word to be highlighted
      const wordToAdd = searchQuery.trim();

      // Add the new word to the list of highlighted words
      setHighlightedWords((prevWords) => [...prevWords, wordToAdd]);

      // Clear the input field
      setSearchQueryState("");

      // Focus on the input field
      inputRef.current.focus();

      // Filter the remaining rows to include only those that contain both the new word and the previous search query
      const filteredResults = allResults.filter(
        (row) => row.includes(searchQuery) && row.includes(wordToAdd),
      );

      // Update the list of all results with the filtered rows
      setAllResults(filteredResults);

      // Perform action to add new word
      console.log("Adding new word:", wordToAdd);

      // Perform search action
      console.log("Searching for:", wordToAdd);
    }
  };

  // Render the table with matching rows
  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Data Point</th>
          </tr>
        </thead>
        <tbody>
          {allResults.map((row, index) => (
            <tr key={index}>
              <td>{row}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="relative flex items-center">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQueryState(e.target.value)}
        className="mr-2 rounded-lg border border-gray-300 px-4 py-2 pr-10"
        ref={inputRef}
      />

      <button
        type="button"
        className={`absolute right-10 top-1/2 -translate-y-1/2 transform text-gray-600 hover:text-gray-700 ${
          isSearchEnabled ? "" : "cursor-not-allowed"
        }`}
        onClick={handleSearch}
        disabled={!isSearchEnabled}
      >
        <span className="sr-only">Search</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>

      {/* <button
        type="button"
        className={`absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-600 hover:text-gray-700 ${
          isSearchEnabled ? "" : "cursor-not-allowed"
        }`}
        onClick={handleAddNewWord}
        disabled={!isSearchEnabled}
      > */}
      {/* <span className="sr-only">Add new word</span> */}
      {/* </button> */}

      {/* Render the table with matching rows */}
      {allResults.length > 0 && renderTable()}
    </div>
  );
}

export default Search;
