if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Modern browsers with getUserMedia() under navigator.mediaDevices
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            console.log('Microphone permission granted');
            
            const micToggle = document.getElementById('micToggle');
            const micIcon = document.getElementById('micIcon');
            const inputText = document.getElementById('inputText');
            
            let recognition;

            if ('webkitSpeechRecognition' in window) {
                recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';
            } else {
                alert('Speech Recognition not supported in this browser.');
                return;
            }

            // Mobile: Delay initialization to ensure permissions are granted
            recognition.onstart = function() {
                console.log('Speech recognition started');
            };

            micToggle.addEventListener('click', () => {
                if (micIcon.classList.contains('fa-microphone-slash')) {
                    micIcon.classList.remove('fa-microphone-slash');
                    micIcon.classList.add('fa-microphone');
                    recognition.start();
                } else {
                    micIcon.classList.remove('fa-microphone');
                    micIcon.classList.add('fa-microphone-slash');
                    recognition.stop();
                }
            });

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                inputText.value = transcript;
            };

            recognition.onerror = (event) => {
                console.error('Speech Recognition Error: ', event.error);
            };
        })
        .catch((err) => {
            console.error('Error accessing the microphone: ', err);
            alert('Permission to access the microphone is required for speech recognition.');
        });
} else {
    alert('Your browser does not support microphone access.');
}
