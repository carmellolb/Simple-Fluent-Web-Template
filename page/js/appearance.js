$(document).ready(function($) {
	var mode = localStorage.getItem('mode');
  if (mode) 
  	$('*').addClass(mode);

  $(".darkmode").click(function() {
    $("*").addClass("darkclass");
    localStorage.setItem('mode', 'darkclass');
  });

  $(".normalmode").click(function() {
    $("*").removeClass("darkclass");
    localStorage.setItem('mode', null);
  });
});
