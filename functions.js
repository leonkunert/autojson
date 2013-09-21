$( function () {
  var counter = new counter();

  function line(selector, position, counter, level) {
    var html = '<div data-level="'+level+'" style="padding-left:'+(level*8)+'px;" class="clear">'
                +'<div class="linekey" id="linekey'+counter.count+'">Key'+counter.count+'</div>'
                +'<div><input id="linekey'+counter.count+'" /></div>'
                +'<div data-level="'+level+'" data-counter="'+counter.count+'" id="addSubline'+counter.count+'" class="addSubline button">+</div>'
                +'<div class="linevalue" id="linevalue'+counter.count+'">Value'+counter.count+'</div>'
                +'<div><input class="linevalue" id="linevalue'+counter.count+'" value="Hello"/></div>'
              +'</div>';
    if(position == 'append') {
      selector.append(html);
    }
    if(position == 'after') {
      selector.after(html);
    }
    counter.increment();
  }

  $( '.addLine' ).on( 'click', function(){
    line($('.lines'), 'append', counter, 0);
    event.stopPropagation();
  });

  $('.lines').on('click', '.linevalue', function() {
      var $this = $(this),
        id = $(this).attr('id'),
        input = $('input#'+id);
      $this.hide();
      input.val($this.html()).fadeIn(400);
      event.stopPropagation();
  });

  $('.lines').on('click', '.linekey', function() {
      var $this = $(this),
        id = $(this).attr('id'),
        input = $('input#'+id);
      $this.hide();
      input.val($this.html()).fadeIn(400);
      event.stopPropagation();
  });

  $('.lines').on('click', '.addSubline', function() {
    $('#linevalue'+counter.count).hide(); 
    var level = parseInt($(this).data('level'))+1;
    line($(this).parent(), 'after', counter, level);
    event.stopPropagation();
  });

  function counter(){
    this.count = 0;
    this.increment = function() {
      this.count++;
    }
    this.incrmentByValue = function(value) {
      this.count = this.count + (value);
    }
  }

  function inputToText(){
    $('input:visible').each(function(){
      var $this = $(this),
        text = $this.val();
      $this.hide();
      if(text == "") {
        text = 'undefiened';
      }
      $( 'div#'+$this.attr('id') ).text(text).fadeIn(400);
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

  function constructJson() {

  }

  $('html').on('keydown',function(e){
    if(e.keyCode == 13 || e.charCode == 13){
      $(this).click();
    }
    if(e.keyCode == 9) {
      $(this).click();
    }
  });

  $('.json').on('click', function(){
    console.log('Make Json');
  });

  $('input').on('click', function(){
    event.stopPropagation();
  });

  $('.lines').on('click', function(){
    event.stopPropagation();
  });

  $('html').on('click', function(){
    inputToText();
  });

})