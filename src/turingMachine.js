// src/turingMachine.js

const dictionary = ['hello', 'help', 'good', 'great', 'google', 'greet', 'game', 'hi', 'happy' , 'calender', ''];

export function runTuringMachine(input) {
  let state = 'start';
  let index = 0;
  let tape = input.toLowerCase().split('');
  let output = '';

  while (state !== 'halt') {
    const currentInput = tape.slice(0, index + 1).join('');

    // Try to find matching word from dictionary
    const match = dictionary.find((word) => word.startsWith(currentInput));

    if (match) {
      output = match; // autocomplete to full word
      state = 'halt';
    } else {
      if (index >= tape.length - 1) {
        output = input; // no match, return original
        state = 'halt';
      } else {
        index++;
      }
    }
  }

  // Capitalize and punctuate
  if (output.length > 0 && !output.endsWith('.')) {
    output = output.toUpperCase() + '.';
  }

  return output;
}
