// Function to check if it's a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Function to initialize Speech Recognition
function initializeSpeechRecognition() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log('Microphone permission granted');
        
        // Get DOM elements
        const micIcon = document.getElementById('micIcon');
        const inputText = document.getElementById('inputText');

        let recognition;
        let isListening = false; // Track recognition state

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
        micIcon.addEventListener('click', () => {

          console.log('The mic is click');

          if (!isListening) {
            recognition.start(); // Start speech recognition
          } else {
            recognition.stop(); // Stop speech recognition
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

        // Handling start event
        recognition.onstart = () => {
          isListening = true;
          micIcon.classList.remove('fa-microphone-slash');
          micIcon.classList.add('fa-microphone');
        };

        // Handling end event
        recognition.onend = () => {
          isListening = false;
          micIcon.classList.remove('fa-microphone');
          micIcon.classList.add('fa-microphone-slash');
        };

        // Handle recognition errors
        recognition.onerror = (event) => {
          console.error('Speech Recognition Error: ', event.error);
          recognition.stop(); // Ensure it stops on error
        };
      })
      .catch((err) => {
        console.error('Error accessing the microphone: ', err);
        alert('Permission to access the microphone is required for speech recognition.');
      });
  } else {
    alert('Your browser does not support microphone access.');
  }
}

// Call the function to initialize Speech Recognition
initializeSpeechRecognition();
