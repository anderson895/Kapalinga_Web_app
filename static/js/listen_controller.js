// Listen Button Functionality
const listenBtn = document.getElementById('listenBtn');
const translatedText = document.getElementById('translatedText');

listenBtn.addEventListener('click', () => {
    const text = translatedText.textContent.trim();
    if (!text) {
        alert('There is no text to read.');
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; // Change this dynamically if needed based on the target language
    window.speechSynthesis.speak(speech);
});