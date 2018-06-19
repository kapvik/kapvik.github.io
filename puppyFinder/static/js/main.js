$(document).ready(function () {

// Custom range
	$("#slider-range").slider({
    range: true,
    min: 0,
    max: 1000,
    step: 10,
    values: [10, 780],
    slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
	});
	
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );

// Aside menu displaying
$('.icon-hamburger').click(function() {
  $('.side-menu').toggle();
});

$('.filter-nav__link').click(function() {
  $(this).children('.sub-nav').toggle();
})

// Set responsive mobile input field placeholder text
  if ($(window).width() < 375) {
    $('.filter-top__item-center input[type="text"]').attr('placeholder', 'City, State, Code');
  } else {
    $('.filter-top__item-center input[type="text"]').attr('placeholder', 'City, State, Postal Code');
  }
  $(window).resize(function () {
    if ($(window).width() < 375) {
      $('.filter-top__item-center input[type="text"]').attr('placeholder', 'City, State, Code');
    } else {
      $('.filter-top__item-center input[type="text"]').attr('placeholder', 'City, State, Postal Code');
    }
  });
});