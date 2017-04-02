//console.log('Script loading: ');
//Проверка подгрузки скрипта с моими плагинами TODO:разделение на модули 
//$.getScript( "js/my-plugins.js" )
//	.done(function( jqxhr ) {
//	'use strict';
//		console.info( jqxhr.status);
//	})
//	.fail(function( jqxhr ) {
//	'use strict';
//		console.error( jqxhr.status);
//});
//console.log('-------------------');

//Константы
var LARGE_DISPLAY_SIZE = 1291; // Когда боковые контакты сползают под меню 
var MIDDLE_DISPLAY_SIZE = 1030; //Когда меню сползает под логотип
var MID_SM_SIZE = 851;
var SMALL_DISPLAY_SIZE = 767; // Когда переходим на мобильную версию 
var SCROLL_TOP_MIN = 100; // Когда начинает появляться стрелка прокрутки вверх
var SLIDER_SCROLL_TIME = 150000;
var navH = 0; //глобальная переменная высоты верхнего меню

//Мои плагины 

//проверка - поддерживает ли браузер history api 
//function isHhistoryApiAvailable() {
//	'use strict';
//    return !!(window.history && history.pushState);
//}
//toConsole(output) - выводит в консоль output на новую строку 
function toConsole(object) {
	'use strict';
	if(object === 'devider'){
		console.log('-------------------');
	}
	else {
		console.log(object);
	}
}
function toConsoleGroup(groupName) {
	'use strict';
	console.group(groupName);
}
function toConsoleGroupEnd() {
	'use strict';
	console.groupEnd();
}

//showHard() - удаляет класс hidden у элемента из которого она вызывается 
(function( $ ){
	'use strict';
	$.fn.showHard = function() {  
    	return this.each( function(){	
      		var $this = $(this);
			$this.removeClass('hidden');
    	});
	};
})( jQuery );

//hideHard() - добавляет класс hidden у элемента из которого она вызывается 
(function( $ ){
	'use strict';
	$.fn.hideHard = function() {  
    	return this.each( function(){	
      		var $this = $(this);
			$this.addClass('hidden');
    	});
	};
})( jQuery );

//open() -  добавляет класс in к вызывателю 
(function( $ ){
	'use strict';
	$.fn.open = function() {  
    	return this.each( function(){	
      		var $this = $(this);
			$this.addClass('in');
    	});
	};
})( jQuery );

//isOpened() - проверяет есть ли в элементе класс in 
(function( $ ){
	'use strict';
	$.fn.isOpened = function() {  
		if ( $(this).hasClass('in') ) {
			return true;
		}
		else {
			return false;
		}
  };
})( jQuery );

//close() -  удаляет класс in у вызывателя
(function( $ ){
	'use strict';
	$.fn.close = function() {  
    	return this.each( function(){	
      		var $this = $(this);
			$this.removeClass('in');
    	});
	};
})( jQuery );

//isVisible() - возвращает thrue если нет класса hidden 
(function( $ ){
	'use strict';
	$.fn.isVisible = function() {  
		if ( $(this).hasClass('hidden') || $(this).is(':hidden') ) {
			return false;
		}
		else if ( !($(this).hasClass('hidden')) || $(this).is(':visible') ) {
			return true;
		}
  };
})( jQuery );

//isActive() - возвращает thrue если есть класс active 
(function( $ ){
	'use strict';
	$.fn.isActive = function() {  
		if ( $(this).hasClass('active') ) {
			return true;
		}
		else {
			return false;
		}
  };
})( jQuery );

//Рассчет ширины экрана 
function getWindowWidth() {
	'use strict';
	return $(window).width();
}

//Рассчет высоты верхней панели 
function getNavHeight() {
	'use strict';
	return $('.navbar').outerHeight();
}

//Маска ввода полей телефона и подсказка ввода
$(function setTelMask() {
	'use strict';
	
	$('.tel-input').mask('+7 (999) 999-99-99');
	$('.tel-input-helper').popover(
		{
			placement: 'top',
			content: 'Введите номер в формате +7(123)123-45-67',
			trigger: 'focus'
		});
});	

//Маска ввода полей e-mail и подсказка ввода
$(function setMailMask() {
	'use strict';
	
	$('.mail-input-helper').popover(
		{
			placement: 'top',
			content: 'Введите адрес в формате name@domain.ru',
			trigger: 'focus'
		});
});	

//Появления кнопки прокрутки вверх и телефона на мобилках 
function setFixedBtnVisible() {
	'use strict';
	if ( $('body').scrollTop() > SCROLL_TOP_MIN ) {
		$('.btn-fixed').show();
		$('#footerNavScrl').showHard();
	}
	else {
		$('.btn-fixed').hide();
		$('#footerNavScrl').hideHard();
	}
}

//Выравнивание отступов страницы снизу и сверху 
function setPageMargin(navHeight) {
	'use strict';
	if ((navHeight === 0) || ( typeof navHeight === 'undefined')) {
		navHeight = getNavHeight();
	}
	$('main').css( 'margin-top' , navHeight );
	$('body').attr( 'data-offset' , navHeight );
	
	var newMargin = 0,
		pricesTableMB = parseInt($('#pricesTable').css('margin-bottom')); 
	if(getWindowWidth() <= SMALL_DISPLAY_SIZE ) {
		newMargin = $(window).height() - $('#footerScrollBtn').position().top - pricesTableMB;
	}
	else {
		newMargin = $('#footerDesktopNavbar').height();
	}
	
	$('#footerCopyright').css('margin-bottom', newMargin);
}

//	Вспомогательные для setContactsPosition (чтобы не сильно говнокодить)

//Показать контакты справа + сделать из обычного навбара правый
function showRight() {
	'use strict';
	$('#headerContactsRight').showHard();
	$('#headerNavbarRight').addClass('navbar-right');
}
//Показать нижние контакты (слева или в центре)
function showBottom(position) {
	'use strict';
	
	var botContacts = $('#headerContactsBottom');
	botContacts.showHard();
	
	var sidePaddingLen = 0;
	if (position === 'center') {
		sidePaddingLen = (getWindowWidth() - botContacts.width()) / 2; 
	}else if (position === 'left') {
		sidePaddingLen = 0;
	}
	botContacts.css('padding-left', sidePaddingLen);
}
//Спрятать контакты саправа + сделать из правого навбара обычный
function hideRight() {
	'use strict';
	$('#headerContactsRight').hideHard();
	$('#headerNavbarRight').removeClass('navbar-right');
}
//Спрятать контакты снизу
function hideBottom() {
	'use strict';
	$('#headerContactsBottom').hideHard();
}
//Отступы пунктов основного меню 
function setNavMargin(val) {
	'use strict';
	$('.nav.navbar-nav li .toAnchor').each( function(i) {
		if ( $(this).attr('id') !== 'footerNavScrl') {
			if (i === 0) {
				$(this).css('padding-left', val);
			}
			$(this).css('padding-top', val);
		}
	});
}
//Позиционирование контактов внутри меню
function setContactsPosition (windowWidth, mobility) {
	'use strict';

	if (windowWidth > LARGE_DISPLAY_SIZE) {
		setNavMargin(15);
		showRight();
		hideBottom();
	}
	else if ( (windowWidth <= LARGE_DISPLAY_SIZE) && (windowWidth > MIDDLE_DISPLAY_SIZE)  ) {
		setNavMargin(15);
		hideRight();
		showBottom('left');
	}
	else if ( (windowWidth <= MIDDLE_DISPLAY_SIZE) && (windowWidth > SMALL_DISPLAY_SIZE)  ) { 
		showBottom('left');
		setNavMargin(0);
		hideRight();	
	}
	else if ( mobility || (windowWidth <= SMALL_DISPLAY_SIZE) ) { 
		showRight();
		hideBottom();
		setNavMargin(15);
	}
}

//Сворачивание/разворачивание списка в шапке зависимости от ширины окна 
function fadeTopList() {
	'use strict';
	
	var windowWidth = getWindowWidth();
	$('#topAccordion .panel.panel-default .panel-collapse.collapse').each(function( i ) {
		var item = $(this);
		if ( windowWidth >= MIDDLE_DISPLAY_SIZE ) {
			$('#topAccordion').css('margin-top', '36px');
			item.open();
		}
		else if ( (windowWidth < MIDDLE_DISPLAY_SIZE) && (windowWidth >= MID_SM_SIZE) ) { 
			if ( i === 1 ) {
				item.close();
			}
			else {
				item.open();
			}
		}
		else if ( (windowWidth < MID_SM_SIZE) && (windowWidth >= SMALL_DISPLAY_SIZE) ) {
			$('#topAccordion').css('margin-top', '10px');
			if ( i === 1 ) {
				item.open();
			}
			else {
				item.close();
			}
		}
		else if ( windowWidth < SMALL_DISPLAY_SIZE ) {
			$('#topAccordion').css('margin-top', '10px');
			item.close();
		}
	});
}

//[END]Вспомогательные для выравнивания отступов и высоты 

//Получение максимальной высоты слайда
function getSlidesMaxH(slidesArray) {
	'use strict';
	var maxHeigh = 0;
	for ( var i = 0; i < slidesArray.length; i++) {
		var curHeight = slidesArray[i].slideH;
		if(curHeight >= maxHeigh) {
			maxHeigh = curHeight;
		}
	}
	return maxHeigh;
}
//Установить min-height 
function setSlidesMinHeight(slidesArray, minHeightValue) {
	'use strict';

	for ( var i = 0; i < slidesArray.length; i++) {
		$(slidesArray[i].slideJQID).css('min-height', minHeightValue);
	}
}
//Установка у row margin-top&bottom
function setSlidesRowMargin(sliderID){
	'use strict';
	
	var carousel = $(sliderID),
		slides = carousel.find('.item.about-need-mh') || carousel.find('.item.example-need-mh'),
		row = 'undefined',
		
		sliderH = 0,
		headerH = 0,
		aboutPad = 0,
		field = 0,
		rowH = 0,
		newMargin = 0;
		
	slides.each(function() {
		if($(this).isActive()) { 
			row = $(this).find('.row').first();
			sliderH = carousel.height();
			headerH = $(this).find('h2').height();
			aboutPad = parseInt($('#about').css('padding-top'));
			field = sliderH - aboutPad - headerH;
			rowH = row.height();
			newMargin = (field - rowH) / 2;
			row.css('margin-top', newMargin);
			row.css('margin-bottom', newMargin);
		}
	});
}
//Рассчет высоты при ресайзе 
function resizeSlider(sliderID) {
	'use strict';
	var carousel = $(sliderID),
		slides = carousel.find('.item.about-need-mh') || carousel.find('.item.example-need-mh'),
		slidesH = 0,
		inner = carousel.find('.carousel-inner'),
		containerActive = 'undefined',
		containerActiveH = 0;
	
	slides.each( function() {
		if( $(this).isActive()) {
			containerActive = $(this).find('.container');
			containerActiveH = containerActive.height();
			slidesH = $(this).height();
		}
	});
	
	setSlidesMinHeight(slides, 0);
	inner.height(0);
	
	setSlidesUI(carousel);
	
	if ( containerActiveH <= slidesH) {
		inner.height(containerActiveH);
	}else {
		inner.height(slidesH);
	}
}
//Кто сейчас активна 
//function whoIsActive(sliderID) {
//	//slider.h (container.firstChild) - about.padding - header.h = row + marginx2 = field
//	
//	
//	'use strict';
//	var carousel = $(sliderID),
//		slides = carousel.find('.item.about-need-mh') || carousel.find('.item.example-need-mh');
//	slides.each(function() {
//		if($(this).isActive()) {
//			toConsole('Active is: ' + $(this).attr('id'));
//			return 	$(this);
//		}
//	});
//}
//Одинаковая высота слайдов + равный маргин по вертикали + анимация 
function setSlidesUI(sliderID) {
	'use strict';
	var carousel = $(sliderID),
		slides = carousel.find('.item.about-need-mh') || carousel.find('.item.example-need-mh'),
		buttons = carousel.find('.carousel-control'),
		//inner = carousel.find('.carousel-inner'),
		slidesArray = [];
	 
	slides.each(function(index) {
		var slide = 
		{
			slideID: '',
			slideJQID: '',
			slideH: 0,
			isActive: false,
			headerH: 0,
			fieldH: 0
		};
		
		slide.slideID = $(this).attr('id');
		slide.slideJQID = '#' + slide.slideID;
		slide.slideH = $(this).height();
		if ( $(this).hasClass('active')) {
			slide.isActive = true;
		} else {
			slide.isActive = false;
		}
		slide.headerH = $(this).find('h2').height();
		slide.fieldH = slide.slideH -  slide.headerH;
		
		slidesArray[index] = slide;
	});
	
	var maxSlidesHeight = getSlidesMaxH(slidesArray);
	setSlidesMinHeight(slidesArray, maxSlidesHeight);
	
	//Время анимации + видимость кнопок
	var windowWidth = getWindowWidth();
	if (windowWidth > SMALL_DISPLAY_SIZE) {
		carousel.attr('data-interval', SLIDER_SCROLL_TIME);
		buttons.each( function () {
			$(this).showHard();
		});
	}else {
		carousel.attr('data-interval', 'false');
		buttons.each (function () {
			$(this).hideHard();
		});
	}
}

//Выравнивание карточек example по высоте
function setEqualHeight(groupSelector) {
	'use strict';
	$(groupSelector).matchHeight();
}

//Анимирование прокрутки 
function animateScroll(scrollSender) {
	'use strict';
	var newDestination = $( $.attr(scrollSender, 'href') ).offset().top - getNavHeight();
	$('html, body').animate(
		{	scrollTop: newDestination	}, 
		600,
		setPageMargin()
	);
}

//Обработчик первого запуска и кнопок
$(document).ready(function() {
	'use strict';
	$('#container').load('/main.html');
	$('#container').pjax('.show-page');
	//Плавное появление 
	$("body").css("display", "none");
    $("body").fadeIn(500);
	

	
	//Инициализация каруселей
	$('#aboutCarousel').ready(function() {
		setSlidesUI($(this));
	});
	$('#examplesCarousel').ready(function() {
		setSlidesUI($(this));
		setEqualHeight('.example-need-mh');
	});
//	//Обработчик свайпов карусели
	$('.carousel').swiperight(function() {
		$(this).carousel('prev');
	});
	$('.carousel').swipeleft(function() {
		$(this).carousel('next');
	});
	
	//Дпействие по началу смены слайдов
	$('#aboutCarousel').on('slide.bs.carousel', function () {
		setSlidesRowMargin($(this));
	});
	//Действие по завершению смены слайда 
	$('#aboutCarousel').on('slid.bs.carousel', function () {
		setSlidesRowMargin($(this));
	});
	$('#examplesCarousel').on('slid.bs.carousel', function () {
//		setSlidesUI($(this));
//		setEqualHeight('.example-need-mh');
	});
	
	//Нажатие на фиксированные нижние кнопки
	$('.footer-btns').click( function() {
		$(this).css('background-color', '#197262');
	});
	
	//Нажатие на мобильные фиксированные кнопки
	$('.btn-fixed').click( function(event) {
		event.preventDefault();
	});
	
});

$('#top').ready(function() {
	'use strict';
	//fadeTopList();
	setPageMargin();
});
//Ресайз или поворот экрана
$(window).bind('resize orientationchange', function(event) { 
	'use strict';
	
	fadeTopList();
	
	var mobileMenuBtnStatus = $('#headerMenuBtn').isVisible();
	if( !$('.navbar-collapse').isOpened() &&  mobileMenuBtnStatus ) {
		navH = getNavHeight();
	}
	setContactsPosition (getWindowWidth(), mobileMenuBtnStatus);

	setPageMargin();
	
	setEqualHeight('.example-card-need-mh');
	
	resizeSlider('#aboutCarousel');
	resizeSlider('examplesCarousel');
	setSlidesRowMargin('#aboutCarousel');
	
	event.preventDefault();
});
//Обаботчик загрузки окна
$(window).load( function(event) {
	'use strict';
	//fadeTopList();
	//Для фикса верхнего отступа когда мобильное меню открыто - костыль
	var mobileMenuBtnStatus = $('#headerMenuBtn').isVisible();
	if( !$('.navbar-collapse').isOpened() &&  mobileMenuBtnStatus ) {
		navH = getNavHeight();
	}
	setContactsPosition ( getWindowWidth(), mobileMenuBtnStatus );
	setPageMargin();
	
	setEqualHeight('.example-card-need-mh');
	
	event.preventDefault();
});

//Обработчик пролистывания окна 
$(window).scroll ( function() {
	'use strict';
	setFixedBtnVisible();
});

//Обработчик нажатия на мобильную кнопку меню (поправление отступа сверху когда мобильное меню открыто) 
$(document).on('click', '#headerMenuBtn', function (event) {
	'use strict';
	setPageMargin(navH);
	event.preventDefault();
});

//Обработчик нажатия на ссылку "Якорь" 
$(document).on('click', '.toAnchor', function(event, scrollSender) {
	'use strict';
	scrollSender = this;
	$('.navbar-collapse').close();
	animateScroll(scrollSender); //эта строка должна идти до смены хэша
	event.preventDefault();
});

//Сетап тумблера формы заказа
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

//Cетап слайдера в форме заказа 
$(function setUpOrderSlider() {
	'use strict';
	
	var handle = $('#orderSlideEngineHandle');
	
	$('#orderSliderEngine').slider({
    	value:5.0,
    	min: 0.8,
    	max: 12.0,
    	step: 0.2,
    	create: function() {
        	handle.text( $( this ).slider( "value" ) );
      	},
      	slide: function( event, ui ) {
        	handle.text( ui.value );
			$( "#orderInputEngine" ).val(ui.value );
      }
    });
    
	$( "#orderInputEngine" ).val( "$" + $( "#orderSliderEngine" ).slider( "value" ) );
});
