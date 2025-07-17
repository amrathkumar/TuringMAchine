// App.jsx

import React, { useState } from 'react';

const dictionary = ['hello', 'help', 'hell', 'hero', 'hi', 'happy', 'hat', 'hope', 'good', 'google', 'great'];

export default function App() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    // Filter dictionary for matches
    if (value.length > 0) {
      const matches = dictionary.filter((word) => word.startsWith(value));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);     // Autofill input
    setSuggestions([]);       // Clear suggestions
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Dynamic Turing-like AutoFill</h2>
      <input
        type="text"
        placeholder="Start typing..."
        value={input}
        onChange={handleInputChange}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{
              padding: '8px',
              backgroundColor: '#f1f1f1',
              marginBottom: '4px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
