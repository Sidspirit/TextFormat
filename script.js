// Function to set active button styles
function setActiveButton(activeButton) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.case-button');
  buttons.forEach(button => {
    button.classList.remove('bg-[#3289e7]', 'hover:bg-[#2776cc]', 'text-white');
    button.classList.add('bg-[#f0f2f4]', 'hover:bg-[#e4e6e8]', 'text-[#111418]');
  });

  // Set the specific active button to active styles
  if (activeButton) { // Check if an activeButton was actually passed (for reset scenarios)
      activeButton.classList.remove('bg-[#f0f2f4]', 'hover:bg-[#e4e6e8]', 'text-[#111418]');
      activeButton.classList.add('bg-[#3289e7]', 'hover:bg-[#2776cc]', 'text-white');
  }
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the input and output text areas
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");

  // Get references to the case conversion buttons
  // Using more robust selectors in case onclick attributes change
  const uppercaseBtn = document.querySelector('button.case-button span:has(>strong):contains("UPPERCASE")')?.closest('button');
  const lowercaseBtn = document.querySelector('button.case-button span:has(>strong):contains("lowercase")')?.closest('button');
  const sentenceCaseBtn = document.querySelector('button.case-button span:has(>strong):contains("Sentence case")')?.closest('button');
  const titleCaseBtn = document.querySelector('button.case-button span:has(>strong):contains("Title Case")')?.closest('button');


  // Get reference to the Copy button
  const copyBtn = document.querySelector('.flex.px-4.py-3.justify-end button'); // More specific selector

  // --- Dynamic Favicon Creation ---
  // Corrected selector to find the SVG within the header tag
  const headerSvg = document.querySelector('header .size-4 svg');
  if (headerSvg) {
    const svgString = new XMLSerializer().serializeToString(headerSvg); // Get the SVG as a string
    const encodedSvg = encodeURIComponent(svgString); // Encode the SVG string for data URI

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    // Use the encoded SVG in the data URI
    link.href = 'data:image/svg+xml,' + encodedSvg;

    document.head.appendChild(link); // Add the link tag to the head
  }
  // --- End Dynamic Favicon Creation ---


  // Attach event listeners to the buttons
  // Add checks to ensure buttons were found before adding listeners
  if (uppercaseBtn) {
      uppercaseBtn.addEventListener('click', function() {
        outputText.value = inputText.value.toUpperCase();
        setActiveButton(uppercaseBtn);
      });
  }

  if (lowercaseBtn) {
      lowercaseBtn.addEventListener('click', function() {
        outputText.value = inputText.value.toLowerCase();
        setActiveButton(lowercaseBtn);
      });
  }

  if (sentenceCaseBtn) {
      sentenceCaseBtn.addEventListener('click', function() {
        let text = inputText.value.toLowerCase();

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
        setActiveButton(sentenceCaseBtn);
      });
  }

  if (titleCaseBtn) {
      titleCaseBtn.addEventListener('click', function() {
        const text = inputText.value.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
        outputText.value = text;
        setActiveButton(titleCaseBtn);
      });
  }


  // Add functionality for the Copy button
  if (copyBtn && outputText) { // Check if the copy button and outputText area exist
      copyBtn.addEventListener('click', function() {
          outputText.select();
          outputText.setSelectionRange(0, 99999); // For mobile devices
          navigator.clipboard.writeText(outputText.value)
              .then(() => {
                  // Optional: Provide user feedback, e.g., change button text briefly
                  const originalText = copyBtn.querySelector('span').textContent;
                  copyBtn.querySelector('span').textContent = 'Copied!';
                  setTimeout(() => {
                      copyBtn.querySelector('span').textContent = originalText;
                  }, 1500); // Change back after 1.5 seconds
              })
              .catch(err => {
                  console.error('Failed to copy text: ', err);
                  // Optional: Handle error, e.g., alert user
                  alert('Failed to copy text.'); // Using alert for simplicity, consider a custom message box
              });
      });
  }


   // Optional: Set the initial active button state if needed (e.g., Sentence case by default)
   // setActiveButton(sentenceCaseBtn);
});
