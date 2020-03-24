$(document).ready(function($) {
	var mode = localStorage.getItem('mode');
  if (mode) 
  	$('*').addClass(mode);

  $(".backarrow12").click(function() {
    $(".12").removeClass("active");
  });

  $(".backarrow12").click(function() {
    $(".11").addClass("active");
  });

  $(".backarrow13").click(function() {
    $(".13").removeClass("active");
  });

  $(".backarrow13").click(function() {
    $(".12").addClass("active");
  });

  $(".backarrow14").click(function() {
    $(".14").removeClass("active");
  });

  $(".backarrow14").click(function() {
    $(".13").addClass("active");
  });

  $(".backarrow15").click(function() {
    $(".15").removeClass("active");
  });

  $(".backarrow15").click(function() {
    $(".14").addClass("active");
  });

  $(".backarrow32").click(function() {
    $(".32").removeClass("active");
  });

  $(".backarrow32").click(function() {
    $(".31").addClass("active");
  });

  $(".backarrow33").click(function() {
    $(".33").removeClass("active");
  });

  $(".backarrow33").click(function() {
    $(".32").addClass("active");
  });

  $(".backarrow34").click(function() {
    $(".34").removeClass("active");
  });

  $(".backarrow34").click(function() {
    $(".33").addClass("active");
  });

  $(".backarrow35").click(function() {
    $(".35").removeClass("active");
  });

  $(".backarrow35").click(function() {
    $(".34").addClass("active");
  });
});
