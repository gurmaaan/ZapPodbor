// JavaScript Document for call window
//Очтка формы звонка 
function clearCallWindowForm() {
	'use strict';
	
	$('#callInputName').val('Имя ');
	$('#callInputTel').val('Телефон ');
}
//Нажатие на кнопку подтверждения обратного звонка
$(document).on('click', '#callBtnSubmit', function() {
	'use strict';
	
	clearCallWindowForm();
});

//Нажатие на кнопку закрытия окна обратного звонка 
$(document).on('click', '#callBtnClose', function() {
	'use strict';
	
	clearCallWindowForm();
});