//Обработчик тумблера формы заказа
$(document).on('click', '#orderTumblerMask', function(event){
	'use strict';
	
	event.preventDefault();
	
	var tumblerState = !$('#orderTumbler').prop('checked');
	$('#orderTumbler').prop('checked', tumblerState);
	
	$('#orderRowVendorAndModel .form-control').each( function() {
		var input = $(this);
		if( tumblerState ) {
			if( input.hasClass('select-wrapper') ) {
				input.hideHard();
			}else {
				input.showHard();
			}
		} else {
			if( input.hasClass('select-wrapper') ) {
				input.showHard();
			}else {
				input.hideHard();
			}
		}
	});
});


