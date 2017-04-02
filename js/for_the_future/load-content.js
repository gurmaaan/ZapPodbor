// JavaScript Document

$(document).ready( function(){
	'use strict';
	
	var links = $(document).find('link[rel=import]'); 
	
	links.each( function() {
		if ($(this).attr('id') === 'topLink') {
			$('#topSection').load('top.html #top');
		}
	});
});