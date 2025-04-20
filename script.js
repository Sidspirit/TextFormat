function setActiveButton(activeButton) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.case-button');
  buttons.forEach(button => {
    button.classList.remove('bg-[#3289e7]', 'hover:bg-[#2776cc]', 'text-white');
    button.classList.add('bg-[#f0f2f4]', 'hover:bg-[#e4e6e8]', 'text-[#111418]');
  });

  // Set the specific active button to active styles
  activeButton.classList.remove('bg-[#f0f2f4]', 'hover:bg-[#e4e6e8]', 'text-[#111418]');
  activeButton.classList.add('bg-[#3289e7]', 'hover:bg-[#2776cc]', 'text-white');
}

function convertToUpperCase() {
  const inputText = document.getElementById("inputText").value;
  const outputText = document.getElementById("outputText");
  outputText.value = inputText.toUpperCase();
  setActiveButton(document.querySelector('button[onclick="convertToUpperCase()"]'));
}

function convertToLowerCase() {
  const inputText = document.getElementById("inputText").value;
  const outputText = document.getElementById("outputText");
  outputText.value = inputText.toLowerCase();
  setActiveButton(document.querySelector('button[onclick="convertToLowerCase()"]'));
}

function convertToSentenceCase() {
  const inputText = document.getElementById("inputText").value;
  const outputText = document.getElementById("outputText");
  setActiveButton(document.querySelector('button[onclick="convertToSentenceCase()"]'));

  let text = inputText.toLowerCase();

  // Capitalize the first character of the entire text
  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Capitalize letters that follow sentence-ending punctuation (. ! ?) and common whitespace
  const sentenceEnders = /[.!?]/;
  const whitespace = /\s+/;

  text = text.replace(new RegExp(`(${sentenceEnders.source}${whitespace.source})([a-zа-яёäöüßéèàçšžčćđñğışъьюя])`, 'gi'), function(match, p1, p2) {
    return p1 + p2.toUpperCase();
  });

  // Handle ellipsis (assuming it's always "...")
  text = text.replace(new RegExp(`([.]{3}${whitespace.source})([a-zа-яёäöüßéèàçšžčćđñğışъьюя])`, 'gi'), function(match, p1, p2) {
    return p1 + p2.toUpperCase();
  });

  outputText.value = text;
}

function convertToTitleCase() {
  const inputText = document.getElementById("inputText").value;
  const outputText = document.getElementById("outputText");
  setActiveButton(document.querySelector('button[onclick="convertToTitleCase()"]'));

  // Convert to title case by capitalizing the first letter of each word
  const text = inputText.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());

  outputText.value = text;
}
