let memory = {}; // Tracks frequency of word usage

const dictionary = [
  'hello', 'help', 'hell', 'hero', 'hi', 'happy', 'hat', 'hope', 'good',
  'google', 'great', 'game', 'greet', 'calender', 'chat', 'crash', 'car',
  'code', 'crazy', 'cool', 'create'
];

// Load memory from localStorage if available
if (typeof window !== 'undefined' && localStorage.getItem('turingMemory')) {
  memory = JSON.parse(localStorage.getItem('turingMemory'));
}

export function runTuringMachine(input) {
  if (!input || input.length < 1) return '';

  let state = 'start';
  let index = 0;
  let tape = input.toLowerCase().split('');
  let output = '';

  while (state !== 'halt') {
    const currentInput = tape.slice(0, index + 1).join('');
    const matches = dictionary.filter((word) => word.startsWith(currentInput));
    const userHistory = Object.keys(memory).filter((word) => word.startsWith(currentInput));
    const combinedMatches = [...new Set([...userHistory, ...matches])]; // deduplicate
    const sortedMatches = combinedMatches.sort((a, b) => (memory[b] || 0) - (memory[a] || 0));

    if (sortedMatches.length > 0) {
      output = sortedMatches[0]; // pick best match
      state = 'halt';
    } else {
      if (index >= tape.length - 1) {
        output = input; // fallback to input
        state = 'halt';
      } else {
        index++;
      }
    }
  }

  // Save input to memory
  updateMemory(input.toLowerCase());
  updateMemory(output.toLowerCase());

  return output;
}

export function getAllHistory() {
  return Object.keys(memory).sort((a, b) => (memory[b] || 0) - (memory[a] || 0));
}

export function updateMemory(word) {
  if (!word || word.length < 2) return; // ignore short inputs
  memory[word] = (memory[word] || 0) + 1;
  localStorage.setItem('turingMemory', JSON.stringify(memory));
}