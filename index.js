 "use strict";
 $(document).ready(function($) {
  $.getJSON("http://pb-api.herokuapp.com/bars", function(result) {
    $('.chooseBar').empty();
    console.log(result.limit);

    //Dynamic Bars
    $.each(result.bars, function(i, value) {
        $("<div id='progressBar"+(i+1)+"'></div><br/>").appendTo('.progressbar');
        $('#progressBar'+(i+1)+'').progressbar({
                value: value,
                max: result.limit
        })
        .children('.ui-progressbar-value')
        .html('<div class="progressText">'+value+'%</div>')
        $(".chooseBar").append('<option id="'+(i+1)+'">#Progress'+(i+1)+'</option>');
    });

    // Dynamic Buttons
    $.each(result.buttons, function(i, value) {
        $('<button id="'+i+'">'+value+'</button>').appendTo('.buttonsDiv');
    });

    // On Click Of Buttons
    $('.buttonsDiv > button').on('click', function() {
      var elemDiv = $('#progressBar'+$(".chooseBar option:selected").attr('id')+''),
          status = elemDiv.progressbar("value"),
          updatedValue = status+parseInt($(this).text());
      elemDiv.progressbar("value", updatedValue);
      elemDiv.progressbar().children('.ui-progressbar-value').children('.progressText').html(updatedValue+'%');
      if(updatedValue > result.limit) {
        elemDiv.children('.ui-widget-header').addClass('overLimitClass');
      }
      else {
        elemDiv.children('.ui-widget-header').removeClass('overLimitClass');
      }
    });

  });
});