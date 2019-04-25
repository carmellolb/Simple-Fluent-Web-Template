function taker(step, sort) {
  $.ajax({ type: 'POST', url: '/hunt.php', dataType: "html", data: { step: step, sort: sort },
    success: function(data) {
      $("#jscode").html(data);
      run_items();
    }
  });
}

function run_items() {
  for (var i = 0; i < arr.length; i++){
    var obj = arr[i];
    itemer(i, obj['id'],obj['code'],obj['date'],obj['likes']);
  }
}

function itemer(order, id, code, date, likes) {
  var newitem = $('#bank .item').clone().appendTo('#feed').attr('data-order', order).attr('data-id', id).attr('data-code', code);
  var c1 = code.substring(0,6);
  var c2 = code.substring(6,12);
  var c3 = code.substring(12,18);
  var c4 = code.substring(18,24);
  newitem.find('.palette a').attr('href', '/like-color-palette/'+id);
  newitem.find('.c1').css('background-color', '#'+c1).find('span').text('#'+c1);
  newitem.find('.c2').css('background-color', '#'+c2).find('span').text('#'+c2);
  newitem.find('.c3').css('background-color', '#'+c3).find('span').text('#'+c3);
  newitem.find('.c4').css('background-color', '#'+c4).find('span').text('#'+c4);
  newitem.find('.like span').text(formatThousands(likes));
  newitem.find('.like').attr('onclick','like('+id+', "'+code+'")');
  if ( localStorage.getItem(code) != null ) { $('.item[data-id=' + id +']').addClass('liked'); }
  time = moment(date, "MM/DD/YYYY").fromNow();
  newitem.find('.date').text(time);
  newitem.css('animation-delay', order*50+"ms");
}

function like(id, code) {
  if ( localStorage.getItem(code) == null ) {
    localStorage.setItem(code, id);
    $('.item[data-id=' + id +']').addClass('liked');
    $.post("/ajax-love.php",  { act: 'addlike', id: id }, function(data, status){  });
    var curlikes = $('.item[data-id=' + id + ']:last').find('.like span').text().replace(',','');
    curlikes++;
    curlikes = formatThousands(curlikes);
    $('.item[data-id=' + id + ']').find('.like span').text(curlikes);
    $('.item[data-id=' + id + ']').find('a.like').attr('onclick','').css('cursor','default');
    place_like(id, code);
    $('.palette[data-id=' + id + ']').css('animation-name','liked_palettes');
  }
  else {
    localStorage.removeItem(code);
    $('.item[data-id=' + id +']').removeClass('liked');
    $('.palette[data-id=' + id +']').remove();
    $('#likes .title span').html(localStorage.length);
    var curlikes = $('.item[data-id=' + id + ']:last').find('.like span').text().replace(',','');
    curlikes--;
    curlikes = formatThousands(curlikes);
    $('.item[data-id=' + id + ']').find('.like span').text(curlikes);
    if ( localStorage.length == 0 ) { $('#likes').hide() } else { $('#likes').show() }
  }
}

function list_likes() {
  for(var j=0, len=localStorage.length; j<len; j++) {
    key = localStorage.key(j);
    code = key;
    id = localStorage.getItem(key);
    if ( localStorage.getItem(key) != null ) {
      place_like(id,code);
    }
  }
}

function place_like(id, code) {
  var newitem = $('#bank .palette').clone();
  $('#likes .list').prepend(newitem);
  var c1 = code.substring(0,6); var c2 = code.substring(6,12); var c3 = code.substring(12,18); var c4 = code.substring(18,24);
  newitem.attr('data-id', id);
  newitem.attr('data-code', code);
  newitem.find('a').attr('href', '/like-color-palette/'+id);
  newitem.find('.place span').remove();
  newitem.find('.c1').css('background-color', '#'+c1);
  newitem.find('.c2').css('background-color', '#'+c2);
  newitem.find('.c3').css('background-color', '#'+c3);
  newitem.find('.c4').css('background-color', '#'+c4);
  $('#likes .title span').html(localStorage.length);
  if ( localStorage.length == 0 ) { $('#likes').hide() } else { $('#likes').show() }
  new_remove_button = $('#bank .remove').clone().appendTo(newitem);
  new_remove_button.attr('onclick','like('+id+', "'+code+'")');
}

function formatThousands(n, dp) {
  var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
  while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
  return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
}

function select_sort_button(current) {
  $('#header').find('[data-button='+current+']').addClass('selected');
  $('#header').find('#sort span').html($('#sort_menu a[data-button='+current+']').text());

}

function select_menu_button(current) {
  $('#header').find('[data-button='+current+']').addClass('selected');
}

function success() {
    $('#loader').hide();
    $('#subscribe input').addClass('success');
    $('#subscribe input').prop( "disabled", true );
    $('.thanks').show();
    report();
}

function already() {
    $('#loader').hide();
    $('#subscribe .button').show();
    $('#error').show();
    $('#error').text('Seems like this email address is already on the list...')
}

function toomuch() {
    $('#loader').hide();
    $('#error').show();
    $('#error').text('Ouch! Too many requests. Please try again tomorrow.')
}

function notvalid() {
    $('#loader').hide();
    $('#subscribe .button').show();
    $('#error').show();
    $('#error').text("Please enter a valid email address")
}

function report() {
    var email = $('#subscribe input').val();
    var i = document.createElement("img");
    i.src = "https://maker.ifttt.com/trigger/ch_subscribe/with/key/diCgU8X1N4yKU3P7-bnKil?value1="+email;
}
