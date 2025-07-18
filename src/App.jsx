import React, { useState, useEffect } from 'react';
import { runTuringMachine, getAllHistory, updateMemory } from './turingMachine';

export default function App() {
  const [input, setInput] = useState('');
  const [predicted, setPredicted] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  // Run prediction and get suggestions
  useEffect(() => {
    if (input.length >= 1) {
      const suggestion = runTuringMachine(input);
      setPredicted(suggestion);

      const matches = getAllHistory().filter((word) => word.startsWith(input.toLowerCase()));
      setSuggestions(matches);
      setShowDropdown(true);
    } else {
      setPredicted('');
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [input]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[activeSuggestion]);
      setPredicted('');
      setSuggestions([]);
      setShowDropdown(false);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(predicted);
      setPredicted('');
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    updateMemory(suggestion);
    setPredicted('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧠 Turing Machine AutoFill + Memory</h2>
      <p style={styles.subtitle}>Type and see it learn from your history!</p>

      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type something..."
          style={styles.input}
          autoFocus
        />
        {predicted && input.length >= 2 && input !== predicted && (
          <span style={styles.ghostText}>{predicted}</span>
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul style={styles.suggestions}>
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              style={idx === activeSuggestion ? { ...styles.suggestionItem, ...styles.activeSuggestion } : styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && suggestions.length === 0 && input.length >= 1 && (
        <ul style={styles.suggestions}>
          <li style={styles.noResult}>No matches found</li>
        </ul>
      )}

      <p style={styles.instructions}>
        Use <strong>↑ ↓ Enter Tab</strong> to navigate • It remembers what you type!
      </p>
    </div>
  );
}

// 💅 Styling
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#222',
    marginBottom: '0.5rem',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '1.5rem',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '20px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
    outline: 'none',
    backgroundColor: '#fff',
    zIndex: 2,
    position: 'relative',
  },
  ghostText: {
    position: 'absolute',
    top: '14px',
    left: '18px',
    color: '#bbb',
    pointerEvents: 'none',
    fontSize: '20px',
    opacity: 0.6,
    zIndex: 1,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  suggestions: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    border: '1px solid #ddd',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 10,
    position: 'absolute',
    width: 'calc(100% - 36px)',
    left: '18px',
  },
  suggestionItem: {
    padding: '10px 14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  activeSuggestion: {
    backgroundColor: '#eef',
  },
  noResult: {
    fontStyle: 'italic',
    color: '#888',
    padding: '10px',
  },
  instructions: {
    marginTop: '1rem',
    fontSize: '14px',
    color: '#555',
    textAlign: 'center',
  },
};