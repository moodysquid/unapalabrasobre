$(document).ready( function(){

  //Geolocation - More info: https://www.w3schools.com/html/html5_geolocation.asp
  //navigator.geolocation.getCurrentPosition(showPosition);

  //Shows geo position
  function showPosition(position){
    $(".position").text("Lat:" + position.coords.latitude + " - Long:" + position.coords.longitude);
  }

  function getColorScheme(){
    var sch1 = [ "rgba(237, 106, 90, 1)", "rgba(247, 244, 205, 1)", "rgba(155, 193, 188, 1)", "rgba(92, 164, 169, 1)", "rgba(230, 235, 224, 1)" ];
    var sch2 = [ "rgba(154, 135, 157, 1)", "rgba(218, 255, 125, 1)", "rgba(46, 196, 182, 1)", "rgba(231, 29, 54, 1)", "rgba(255, 159, 28, 1)" ];
    var sch3 = [ "rgba(232, 78, 15, 1)", "rgba(238, 126, 80, 1)", "rgba(143, 145, 113, 1)", "rgba(120, 124, 28, 1)", "rgba(77, 81, 0, 1)" ];

    var cschemes = [ sch1, sch2, sch3 ];

    do{
      n = Math.floor(Math.random() * cschemes.length);
    }while( cschemes[n] === cscheme );

    return cschemes[n];
  }

  //Returns a string of a random color from the 'colors' array
  function getColor(){
    //var colors = [ "rgba(237, 106, 90, 1)", "rgba(247, 244, 205, 1)", "rgba(155, 193, 188, 1)", "rgba(92, 164, 169, 1)", "rgba(230, 235, 224, 1)"];
    var colors = cscheme;

    //generates random n to select a color from the array above
    //if new color (colors[n]) is equal to last color selected, it loops again to not repeat colors
    do{
      n = Math.floor(Math.random() * colors.length);
    }while( colors[n] === color );

    return colors[n];
  }

  // Deletes word with animation
  function deleteWord(n){
    $("span.little-box:nth-of-type(" + n + ")").fadeOut(400, function() { $(this).remove(); });
  }

  var word = '';
  var words = 0;
  var cscheme = getColorScheme();
  var color = '';
  var limit = 5;

  //Getting the topic
  getTopic();

  //This is not needed but i keep it for new functionalities
  $(".input-word").on( 'keypress', function( value ){
    //if input is an 'space' character, it doesn't show it
    if (value.keyCode == 32) {
      return false;
    }

  });

  //Submits word and adds it to a big box. When limit is reached, first in element is deleted (first out).
  $('input[type="submit"]').on( 'click', function(){

    word = $(".input-word").val();

    words++;

    if( word.length > 0 ){
      color = getColor();

      // deletes "first in" word if limit reached
      if( words > limit ){
        deleteWord(1);
      }

      // posts new word to process.php      
      postWord();

      $(".all-words").css("visibility", "visible");

      // shows new word in page
      $(".all-words").append('<span class="little-box border-radius" style="background-color:' + color + ';">' + word + '</span>').show(25000);

      $(".input-word").val("").focus();

      word = "";
    }

  });

  //Prevents refresh after form submit
  $("#word-form").submit(function(e) {
      e.preventDefault();
  });

  function postWord(){

    $.ajax({
        type: "POST",
        url: "process.php",
        data: $('form').serializeArray(),
        success: function(data) {
              console.log(data);
            }
      });
  
  }

  function getTopic(){
    $.ajax({
      async: "false",
      type: "GET",
      url: "get_topic.php",
      dataType: "json",
      success: function(data) {
            $(".topic").text(data);
            
            //Creo un input hidden con el valor de .topic, pero es una cagada esta solucion, porque si el visitante
            //modifica el input hidden desde su explorador, queda ese topic guardado. PESIMA SOLUCION. PROVISORIA.
            $('input[name="topic"]').val(data);
            console.log(data);
        }
    });
  }

});