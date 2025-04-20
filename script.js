
function convertToUpperCase() {
  const inputText = document.getElementById("inputText").value;
  const outputText = document.getElementById("outputText");
  outputText.value = inputText.toUpperCase();
}

function convertToLowerCase() {
  const inputText = document.getElementById("inputText").value;
  const outputText = document.getElementById("outputText");
  outputText.value = inputText.toLowerCase();
}

function convertToSentenceCase() {
  const inputText = document.getElementById("inputText").value;
  const outputText = document.getElementById("outputText");

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
  
  // Convert to title case by capitalizing first letter of each word
  const text = inputText.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
  
  outputText.value = text;
}
