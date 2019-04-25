var content = $('.site-content'),
    header = $('.soft_shadow');
               
$(content).clone().prependTo(header).addClass('blurred');

var blur = 'blur(30px)';
$('.blurred').css({
  'background': '#e0e0e0',
  '-webkit-filter': blur,
  'filter': blur
});

$(document).scroll(function(){
  var scroll = $(this).scrollTop();
  $('.blurred').css({
    '-webkit-transform' : 'translateY(-'+scroll+'px)',
    'transform' : 'translateY(-'+scroll+'px)'
  });
})