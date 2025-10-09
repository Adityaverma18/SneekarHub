// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchSuggestions } from '../assets/assets.js'; // This comes from your assets.js

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();

  // Filter product names
  const filtered = query.length
    ? searchSuggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSuggestionClick = (val) => {
    setQuery(val);
    // Optionally, trigger a search or navigate here
    // navigate(`/results?query=${encodeURIComponent(val)}`);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-2">
      <div className="flex items-center py-2 mb-2">
        <button onClick={() => navigate(-1)} className="mr-2 p-2 text-gray-500">
          <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <input
          autoFocus
          type="text"
          placeholder="Search sneakers..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          className="flex-1 rounded-lg border px-4 py-2 focus:outline-none text-lg"
        />
      </div>
      {filtered.length > 0 && (
        <ul className="bg-white border rounded-lg shadow max-w-full mt-2">
          {filtered.map((s, idx) => (
            <li
              key={s}
              onMouseDown={() => handleSuggestionClick(s)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                idx === active ? 'bg-blue-50' : ''
              }`}
              onMouseEnter={() => setActive(idx)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      {(query.length > 0 && filtered.length === 0) && (
        <div className="mt-4 text-gray-400 text-center">
          No matches found
        </div>
      )}
    </div>
  );
};

export default SearchPage;
