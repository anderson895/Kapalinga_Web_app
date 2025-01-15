// Function to check if it's a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Function to initialize Speech Recognition
function initializeSpeechRecognition() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Modern browsers with getUserMedia()
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log('Microphone permission granted');
        
        // Get DOM elements
        const micToggle = document.getElementById('micToggle');
        const micIcon = document.getElementById('micIcon');
        const inputText = document.getElementById('inputText');
  
        let recognition;
        let isListening = false; // To track recognition state
  
        // Check if the browser supports SpeechRecognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.continuous = true; // Keep listening until stopped
          recognition.interimResults = true; // Show interim results
          recognition.lang = 'en-US'; // Set language (adjustable)
        } else {
          alert('Speech Recognition is not supported on this device.');
          return;
        }
  
        // Toggle microphone and start/stop recognition
        micToggle.addEventListener('click', () => {
          if (!isListening) {
            micIcon.classList.remove('fa-microphone-slash');
            micIcon.classList.add('fa-microphone');
            recognition.start(); // Start speech recognition
            isListening = true;
          } else {
            micIcon.classList.remove('fa-microphone');
            micIcon.classList.add('fa-microphone-slash');
            recognition.stop(); // Stop speech recognition
            isListening = false;
          }
        });
  
        // Update the textarea with recognized speech
        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          inputText.value = transcript.trim(); // Update inputText with the speech
        };
  
        // Automatically stop recognition and update icon on end
        recognition.onend = () => {
          if (isListening) {
            micIcon.classList.remove('fa-microphone');
            micIcon.classList.add('fa-microphone-slash');
            isListening = false;
          }
        };
  
        // Handle recognition errors
        recognition.onerror = (event) => {
          console.error('Speech Recognition Error: ', event.error);
          micIcon.classList.remove('fa-microphone');
          micIcon.classList.add('fa-microphone-slash');
          isListening = false;
        };
      })
      .catch((err) => {
        // Permission denied or other error
        console.error('Error accessing the microphone: ', err);
        alert('Permission to access the microphone is required for speech recognition.');
      });
  } else if (navigator.getUserMedia) {
    // Support for older browsers
    navigator.getUserMedia({ audio: true }, () => {
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
