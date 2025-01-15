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