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

  // Updated regex pattern to include both Latin and Cyrillic characters
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
  // Custom approach to handle both Latin and Cyrillic characters
  const words = inputText.toLowerCase().split(' ');
  const titleCaseText = words.map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');

  outputText.value = titleCaseText;
}

function copyToClipboard() {
  const outputText = document.getElementById("outputText");
  outputText.select();  // Selects the text in the textarea
  document.execCommand("copy");  // Copies the selected text to clipboard

  // Optional: Visual feedback that copy happened
  const copyButton = document.querySelector('button span.truncate').parentElement;
  const originalText = copyButton.querySelector('span').textContent;
  copyButton.querySelector('span').textContent = "Copied!";

  setTimeout(() => {
    copyButton.querySelector('span').textContent = originalText;
  }, 1500);
}

// Make sure the DOM is fully loaded before attaching event listeners
window.onload = function() {
  // Get the copy button - more direct selector
  const copyButton = document.querySelector('.flex.px-4.py-3.justify-end button');

  if (copyButton) {
    copyButton.addEventListener('click', copyToClipboard);
  } else {
    console.error("Copy button not found!");
  }
};
// Add an ID to the Copy button in the HTML
document.addEventListener('DOMContentLoaded', function() {
  // Find the Copy button by its text content
  const buttons = document.querySelectorAll('button');
  for (let button of buttons) {
    if (button.textContent.trim() === 'Copy') {
      // Add an ID to make it easier to reference
      button.id = 'copyButton';
      // Add the event listener directly
      button.addEventListener('click', function() {
        const outputText = document.getElementById("outputText");
        outputText.select();
        document.execCommand("copy");

        // Visual feedback
        const original = this.innerHTML;
        this.innerHTML = '<span class="truncate">Copied!</span>';

        setTimeout(() => {
          this.innerHTML = original;
        }, 1500);
      });

      break;
    }
  }
});
/* Custom styles to improve text areas */
document.addEventListener('DOMContentLoaded', function() {
  // Apply styles to both input and output text areas
  const textareas = document.querySelectorAll('#inputText, #outputText');

  textareas.forEach(textarea => {
    // Make the text area containers take full width
    const container = textarea.closest('.flex.max-w-\\[480px\\]');
    if (container) {
      container.classList.remove('max-w-[480px]');
      container.classList.add('w-full', 'max-w-[960px]');
    }

    // First, remove any conflicting CSS classes that might prevent resizing
    textarea.classList.remove('resize-none');

    // Apply direct styles to override any conflicting CSS
    textarea.style.width = '100%';
    textarea.style.resize = 'vertical'; // Allow vertical resizing
    textarea.style.minHeight = '150px';
    textarea.style.maxHeight = '500px';
    textarea.style.overflowY = 'auto';

    // Apply inline CSS with !important to force override conflicting styles
    textarea.setAttribute('style', 
      'width: 100% !important; ' + 
      'resize: vertical !important; ' + 
      'min-height: 150px !important; ' + 
      'max-height: 500px !important; ' + 
      'overflow-y: auto !important;'
    );
  });

  // Adjust the buttons container width to match
  const buttonsContainer = document.querySelector('.flex.flex-1.gap-3.flex-wrap');
  if (buttonsContainer) {
    buttonsContainer.classList.remove('max-w-[480px]');
    buttonsContainer.classList.add('max-w-[960px]');
  }

  // Adjust the Copy button container width
  const copyContainer = document.querySelector('.flex.px-4.py-3.justify-end');
  if (copyContainer) {
    copyContainer.classList.add('max-w-[960px]', 'w-full');
  }
});
