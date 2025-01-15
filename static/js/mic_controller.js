// Function to check if it's a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Function to initialize Speech Recognition
function initializeSpeechRecognition() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Modern browsers with getUserMedia()
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        console.log('Microphone permission granted');
        
        // Initialize SpeechRecognition
        const micToggle = document.getElementById('micToggle');
        const micIcon = document.getElementById('micIcon');
        const inputText = document.getElementById('inputText');
  
        let recognition;
  
        // Check if the browser supports SpeechRecognition (webkitSpeechRecognition for mobile Safari, etc.)
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.continuous = true; // Keep listening until stopped
          recognition.interimResults = true; // Show interim results
          recognition.lang = 'en-US'; // Set language (can be adjusted based on language selection)
        } else {
          alert('Speech Recognition is not supported on this device.');
          return;
        }
  
        // Toggle microphone icon and start/stop recognition
        micToggle.addEventListener('click', () => {
          if (micIcon.classList.contains('fa-microphone-slash')) {
            micIcon.classList.remove('fa-microphone-slash');
            micIcon.classList.add('fa-microphone');
            recognition.start(); // Start speech recognition
          } else {
            micIcon.classList.remove('fa-microphone');
            micIcon.classList.add('fa-microphone-slash');
            recognition.stop(); // Stop speech recognition
          }
        });
  
        // Update the textarea with recognized speech
        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          inputText.value = transcript; // Set the inputText area with the recognized speech
        };
  
        // Handle recognition errors
        recognition.onerror = (event) => {
          console.error('Speech Recognition Error: ', event.error);
        };
      })
      .catch((err) => {
        // Permission denied or other error
        console.error('Error accessing the microphone: ', err);
        alert('Permission to access the microphone is required for speech recognition.');
      });
  } else if (navigator.getUserMedia) {
    // Support for older versions of browsers
    navigator.getUserMedia({ audio: true }, (stream) => {
      console.log('Microphone permission granted');
      // Initialize SpeechRecognition and other logic...
    }, (err) => {
      console.error('Error accessing the microphone: ', err);
      alert('Permission to access the microphone is required for speech recognition.');
    });
  } else {
    alert('Your browser does not support microphone access.');
  }
}

// Call the function to initialize Speech Recognition
initializeSpeechRecognition();
