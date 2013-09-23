$( function () {
  var counter = new counter(),
    $lines = $('.lines');
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
    line($clear, 'append', counter, level); // maybe better after than append???
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
    var returnObj = {},
      level = 0,
      $val;
    $lines.children().each(function(index, val) {
      $val = $(val);
      var linekey,
        linevalue;
      if(level == $val.data('level')) {
        $.extend(returnObj, objectifyed($val, linevalue, linekey, returnObj));
      }
    });
    console.log(returnObj);
    //$('div.lines .clear')
  }

  function objectifyed(line, linevalue, linekey, returnObj) {
    var _returnObj = {};
    // If it has more Children
    console.log(returnObj);
    if(line.children('.clear').length) {
      console.log('has Children');
      for (var i = 0; i < line.children('.clear').length; i++) {
        linekey = $(line.children('.linekey')[i]).text();
        linevalue = $(line.children('.linevalue')[i]).text();
        console.log(linevalue);
        returnObj[linekey] = objectifyed($(line.children('.clear')[i]), linevalue, linekey, _returnObj);
      }
      console.log(returnObj);
      return returnObj;
    } else { //if it has a value that is not an other line
      linekey = line.children('.linekey').text();
      linevalue = line.children('.linevalue').text();
      _returnObj[linekey] = linevalue;
      console.log(linevalue);
      return _returnObj;
    }
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