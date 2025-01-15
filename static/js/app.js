// When language1 is changed, automatically set language2 to Kapampangan, if not already Kapampangan
$('#language1').change(function() {
    if ($('#language1').val() === 'Kapampangan') {
      // If language1 is Kapampangan, check language2 and change it to English if it is Kapampangan
      if ($('#language2').val() === 'Kapampangan') {
        $('#language2').val('English');
      }
    } else {
      // If language1 is not Kapampangan, set language2 to Kapampangan
      $('#language2').val('Kapampangan');
    }
  });

  // When language2 is changed, automatically set language1 to Kapampangan, if not already Kapampangan
  $('#language2').change(function() {
    if ($('#language2').val() === 'Kapampangan') {
      // If language2 is Kapampangan, check language1 and change it to English if it is Kapampangan
      if ($('#language1').val() === 'Kapampangan') {
        $('#language1').val('English');
      }
    } else {
      // If language2 is not Kapampangan, set language1 to Kapampangan
      $('#language1').val('Kapampangan');
    }
  });






















   /// Translate button click event
$('#translateBtn').click(function() {
    let inputText = $('#inputText').val();
    const language1 = $('#language1').val().toLowerCase();
    const language2 = $('#language2').val().toLowerCase();
  
    // Convert the input text to lowercase (automatic)
    inputText = inputText.toLowerCase();
  
    // API endpoint
    const endpoint = '/translate';
  
    // Check if input text is not empty
    if (inputText.trim() !== '') {
      // Show loading text
      $('#translatedText').text('Translating...');
  
      // Use a POST request to send the input text and language information
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,  // Send the input text in lowercase
          from_lang: language1,
          to_lang: language2
        }),
      })
      .then(response => response.json())
      .then(data => {
        const translatedText = data.translation || 'No translation available';
        $('#translatedText').text(translatedText);
      })
      .catch(error => {
        console.error('Error:', error);
        $('#translatedText').text('Error occurred while translating.');
      });
    } else {
      // If input is empty, clear the output area
      $('#translatedText').text('Translated text will appear here...');
    }
  });
  
  // Clear button click event
  $('#clearBtn').click(function() {
    // Clear both input and translated text
    $('#inputText').val('');
    $('#translatedText').text('Translated text will appear here...');
  });
  
  // Swap the two languages
  $('#swapBtn').click(function() {
    const lang1 = $('#language1').val();
    const lang2 = $('#language2').val();
  
    // Swap the values
    $('#language1').val(lang2);
    $('#language2').val(lang1);
  
    // Ensure that one of the dropdowns is always set to Kapampangan
    if ($('#language1').val() !== 'Kapampangan' && $('#language2').val() !== 'Kapampangan') {
      $('#language1').val('Kapampangan');
    }
  });
  