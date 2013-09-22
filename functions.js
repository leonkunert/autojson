$( function () {
  var counter = new counter(),
    $lines = $('.lines');
  function line(selector, position, counter, level) {
    var html = '<div data-level="'+level+'" style="padding-left:'+(level*8)+'px;" class="clear">'
                +'<div class="linekey" id="linekey'+counter.count+'">Key'+counter.count+'</div>'
                +'<div><input id="linekey'+counter.count+'" /></div>'
                +'<div data-level="'+level+'" data-counter="'+counter.count+'" id="addSubline'+
                    counter.count+'" class="addSubline button">+</div>'
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

  $( '.addLine' ).on( 'click', function(event){
    line($lines, 'append', counter, 0);
    event.stopPropagation();
  });

  $lines.on('click', '.linevalue', function(event) {
      var $this = $(this),
        id = $(this).attr('id'),
        input = $('input#'+id);
      $this.hide();
      input.val($this.html()).fadeIn(400);
      event.stopPropagation();
  });

  $lines.on('click', '.linekey', function(event) {
      var $this = $(this),
        id = $(this).attr('id'),
        input = $('input#'+id);
      $this.hide();
      input.val($this.html()).fadeIn(400);
      event.stopPropagation();
  });

  $lines.on('click', '.addSubline', function(event) {
    var level = parseInt($(this).data('level'))+1,
      $clear = $(this).parent();
    $clear.children('.linevalue').hide();
    line($clear, 'after', counter, level);
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
    this.oneLess = function() {
      return (this.count-1);
    }
  }

  function inputToText(){
    $('input:visible').each(function(){
      var $this = $(this),
        text = $this.val();
      $this.hide();
      if(text == "") {
        text = 'undefined';
      }
      $( 'div#'+$this.attr('id') ).text(text).fadeIn(400);
    });
  }

  function constructJson() {
    console.log('Make Json');
    $lines.children().each(function(index, val) {
        console.log(val);
    });
    //console.log($lines.children());
    $('div.lines .clear')
  }

  $('html').on('keydown', function(event){
    if(event.keyCode == 13 || event.charCode == 13){
      $(this).click();
    }
    if(event.keyCode == 9) {
      $(this).click();
    }
  });

  $('.json').on('click', function(){
    constructJson();
  });

  $('input').on('click', function(event){
    event.stopPropagation();
  });

  $lines.on('click', function(event){
    event.stopPropagation();
  });

  $('html').on('click', function(){
    inputToText();
  });

})