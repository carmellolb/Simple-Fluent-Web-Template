$(document).ready(function($) {
	var mode = localStorage.getItem('mode');
  if (mode) 
  	$('*').addClass(mode);

  $(".shrink").click(function() {
    $("*").toggleClass("smallclass");
  });
});