$( function () {
  var count = 0;
  $( ".addLine" ).on( "click", function(){
    $( ".lines" ).append(line(count));
    bindToClick(count);
    count++;
    event.stopPropagation();
  });

  function line(count) {
    return '<div class="clear">'
            +'<div class="linekey" id="linekey'+count+'">Key'+count+'</div>'
            +'<div><input id="linekey'+count+'" /></div>'
            +'<div class="linevalue" id="linevalue'+count+'">Value'+count+'</div>'
            +'<div><input class="linevalue" id="linevalue'+count+'" value="Hello"/></div>'
          +'</div>';
  }

  function bindToClick(count) {
    $( "#linekey"+count ).on("click", function(){
      var $this = $(this),
        input = $("input#linekey"+count);
      $this.hide();
      input.val($this.html()).fadeIn(400);
      event.stopPropagation();
    });
    $( "#linevalue"+count ).on("click", function(){
      var $this = $(this),
        input = $("input#linevalue"+count);
      $this.hide();
      input.val($this.html()).fadeIn(400);
      event.stopPropagation();
    });
  }

  function inputToText(){
    $('input:visible').each(function(){
      var $this = $(this);
      $this.hide();
      $( 'div#'+$this.attr('id') ).text($this.val()).fadeIn(400);
    });
  }

  /*  function nextField(){
    $this = $('input:visible');
    if($this.length == 1) {
      $this.each(function() {
        if($(this).attr('id').indexOf('linekey') != -1) {
          console.log($(this).next('.linevalue'));
        }
        if($(this).attr('id').indexOf('linevalue') != -1) {
          console.log($(this).next('.linekey'));
        }
      });
    }
  }*/

  $('input').click(function(){
    event.stopPropagation();
  });

  $('.lines').click(function(){
    event.stopPropagation();
  })

  $('html').on('keydown',function(e){
    if(e.keyCode == 13 || e.charCode == 13){
      $(this).click();
    }
    if(e.keyCode == 9) {
      $(this).click();
    }
 });

  $('html').click(function(){
    inputToText();
  });

})