
var sections = document.querySelectorAll('.uniform');

var passScroll = function () {
    'use strict';

	var scrollTop = (document.body.scrollTop || window.scrollY);

	function getOffset(el) {
		el = el.getBoundingClientRect();
		return {
			left: el.left,
			top: el.top + scrollTop
		};
	}

	if (scrollTop > getOffset(sections[1]).top - 400) {
		var section = sections[1];
		var services = section.querySelectorAll('.area-service');
		$(services).each(function(service, index){
			setTimeout(function(){
				$(service).class.add('passed');
			}, (index+1)*100);
		})
	}
	if (scrollTop > getOffset(sections[3]).top - 400) {
		var section = sections[3];
		var selectionString = ".left-wrapper header h1, .left-wrapper article ul li, .main-content .content, .main-content .content hr";
		var selections = section.querySelectorAll(selectionString);
		$(selections).each(function(service, index){
			setTimeout(function(){
				$(service).class.add('passed');
			}, (index+1)*120);
		})
	}
	if (scrollTop > getOffset(sections[5]).top - 400) {
		var section = sections[5];
		var selectionString = "header, .content .picture-container .picture";
		var selections = section.querySelectorAll(selectionString);
		$(selections).each(function(service, index){
			setTimeout(function(){
				$(service).class.add('passed');
			}, (index+1)*120);
		})
	}
}

//window.addEventListener('scroll', passScroll);
//window.addEventListener('DOMMouseScroll', passScroll);
//window.addEventListener('mousewheel', passScroll);
//window.addEventListener('wheel', passScroll);



var meetComponents = function(){
	var pictureWrappers = document.querySelectorAll('.components .content .row .wrapper');
  var componentsObj = {};
  componentsJson.forEach(function(el, i) {
    componentsObj[el.src] = el;
  });
  $(pictureWrappers).on('click', function(){
    var src = this.getAttribute('data-src');
    var name = componentsObj[src].name;
    var description = componentsObj[src].description.content;

    alert(name + "\n" + description)

  });
}
meetComponents();



var depositionsCarousel = function(){
	var arrowLeft = document.querySelector('.depositions .arrow-scroll-left');
	var arrowRight = document.querySelector('.depositions .arrow-scroll-right');
	var depositionsContainer = document.querySelector('.depositions .depositions-container');
	var depositions = document.querySelectorAll('.depositions .depositions-container .depositions-wrapper');

	var firstDeposition = depositions[0];
	var lastDeposition = depositions[depositions.length-1];

	depositionsContainer.innerHTML = lastDeposition.outerHTML + depositionsContainer.innerHTML;
	depositionsContainer.innerHTML = depositionsContainer.innerHTML + firstDeposition.outerHTML;

	depositions = document.querySelectorAll('.depositions .depositions-container .depositions-wrapper');

	var module = function(int){
		return (int < 0 ? int*-1 : int);
	}

	var step = function(){
		return depositions[0].offsetWidth;
	}

	var index = 1;
	var setIndex = function(n){
		index = n;
		depositionsContainer.setAttribute("data-index", index);
	}
	var getIndex = function(){
		return parseFloat(depositionsContainer.getAttribute("data-index"));
	}
	setIndex(1);

	var getScroll = function(){
		return (getIndex())*step();
	}

	var updateScroll = function(){
		scrollLeft = depositionsContainer.scrollLeft;
	}

	var scrollTo = function(target){
		target = target || getScroll();
		$(depositionsContainer).scrollX(target, 400);
	}

	var length = depositions.length - 2;

	scrollTo();

	var x = null;
	var _x = null;
	var scrollLeft;
	var dragging = false;

	/*
	var handle = function (delta) {
		if (delta < 0)
			next();
		else
			prev();
	};

	var wheel = function (event){
		var delta = 0;
		if (!event) event = window.event;
		if (event.wheelDelta) {
			delta = event.wheelDelta/120;
		} else if (event.detail) {
			delta = -event.detail/3;
		}
		if (delta)
			handle(delta);
	        if (event.preventDefault)
	                event.preventDefault();
	        event.returnValue = false;
	}

	if (window.addEventListener){
		window.addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = document.onmousewheel = wheel;
	}

	$(depositionsContainer).on('mouseenter', function(e){
		wheel = function (delta) {
			if (delta < 0)
				next();
			else
				prev();
		}
	})
	$(depositionsContainer).on('mouseleave', function(e){
		wheel = function (delta) {
		};
	})
	*/

	$(depositionsContainer).on('mousedown', function(e){
		x = e.pageX;
		dragging = true;
		updateScroll();
	})

	$(window).on('mouseup', function(e){
		dragging = false;
		scrollTo();
	})

	$(depositionsContainer).on('mouseup', function(e){
		e.preventDefault();
		e.stopPropagation()
		dragging = false;
		var difference = (x - _x);
		if(module(difference) > step()/3){
			if(difference > 0){
				next();
			}else{
				prev();
			}
		}else{
			scrollTo();
		}
	});

	$(depositionsContainer).on('mousemove', function(e){
		_x = e.pageX;
		if(dragging){
			var difference = (x - _x);
			this.scrollLeft = scrollLeft + (x - _x);
		}
	});
	var nextTimeout;
	var next = function(){
		updateScroll();
		clearTimeout(nextTimeout);
		if(getIndex() >= length){
			scrollTo(getScroll() + step());
			nextTimeout = setTimeout(function(){
				setIndex(1);
				depositionsContainer.scrollLeft = getScroll();
			}, 500);
		}else{
			setIndex(getIndex() + 1);
			$(depositionsContainer).scrollX(getScroll(), 500);
		}
	}
	var prevTimeout;
	var prev = function(){
		updateScroll();
		clearTimeout(prevTimeout);
		if(getIndex() > 1){
			setIndex(getIndex() - 1);
			$(depositionsContainer).scrollX(getScroll(), 500);
		}else{
			$(depositionsContainer).scrollX(getScroll()-step(), 400);
			prevTimeout = setTimeout(function(){
				setIndex(length);
				depositionsContainer.scrollLeft = getScroll();
			}, 500);
		}
	}

	$(arrowRight).on('click', next);
	$(arrowLeft).on('click', prev);
}
depositionsCarousel();



var clientsCarousel = function(){
	var automaticScroll;
	var buttons = {
		left: document.querySelector('.clients .clients-list-container .arrow-scroll-left'),
		right: document.querySelector('.clients .clients-list-container .arrow-scroll-right')
	}
	var clientsListContainer = document.querySelector('.clients .clients-list-container');
	var clientsList = document.querySelector('.clients .clients-list');
	var clientsLinks = document.querySelectorAll('.clients-list .client');

	var rate = 100/clientsLinks.length;

	var selected = 0;
	var scrollRate = Math.floor(clientsLinks.length/2)*rate;

	clientsList.style.transform = "translateX(" + (scrollRate) + "%)";

	var increaseScroll = function(){
		if(scrollRate > -(((clientsLinks.length-2)-Math.floor(clientsLinks.length/2))*rate)){
			scrollRate -= rate;
			selected += 1;
		}else{
			scrollRate = Math.floor(clientsLinks.length/2)*rate;
			selected = 0;
		}
	}
	var decreaseScroll = function(){
		if(scrollRate < (((clientsLinks.length-2)-Math.floor(clientsLinks.length/2))*rate)){
			scrollRate += rate;
			selected -= 1;
		}else{
			scrollRate = -(((clientsLinks.length-1)-Math.floor(clientsLinks.length/2))*rate);
			selected = clientsLinks.length-1;
		}
	}

	clientsLinks[selected].className += " selected";

	var scroll = function(){
		var windowWidth = window.innerWidth;
		if(selected == clientsLinks.length-1){
			clientsList.style.transform = "translateX(" + (-(+scrollRate+windowWidth/2)) + "pz)";
		}else{
			clientsList.style.transform = "translateX(" + (scrollRate) + "%)";
		}
		[].forEach.call(clientsLinks, function(clientLink){
			clientLink.className = "client";
		});
		clientsLinks[selected].className += " selected";
	}

	buttons.left.addEventListener('click', function(){
		decreaseScroll();
		scroll();
	})
	buttons.right.addEventListener('click', function(){
		increaseScroll();
		scroll();
	});

	clientsListContainer.addEventListener('mouseenter', function(){
		clearInterval(automaticScroll);
	});

	clientsListContainer.addEventListener('mouseleave', setAutomatic);

	function setAutomatic(){
		automaticScroll = setInterval(function(){
			increaseScroll();
			scroll();
		}, 2000)
	}
	setAutomatic();
}
//clientsCarousel();

var fixTopBar = function(){
	var scrollTop = (document.body.scrollTop || window.scrollY);
	var topbar = document.querySelector('.topbar');

	if(scrollTop > 0){
		topbar.className = "topbar fixed";
	}else{
		topbar.className = "topbar static";
		//color = "#" + topbarBgsColor[Math.round(Math.random()*topbarBgsColor.length)];
	}
}
//window.addEventListener('scroll', fixTopBar);
//window.addEventListener('DOMMouseScroll', fixTopBar);
//window.addEventListener('mousewheel', fixTopBar);
//window.addEventListener('wheel', fixTopBar);

var backgroundUrls = ['slide3.jpg', 'slide3.jpg', 'slide3.jpg', 'slide3.jpg'];

var dataImages = backgroundUrls.map(function(bg){
	return "/public/Images/welcome-slide/" + bg;
});

document.addEventListener('DOMContentLoaded', function(){

	var randomTopbarLineColor = function(){
		var colors = ['#f3765e', '#00afcc', '#987bb8', '#999999'];
		var softLine = document.querySelector('.topbar .soft-line');

		softLine.style.background = colors[Math.getRandomFrom(colors.length-1)];
	}
	randomTopbarLineColor();

	var portfolioHover = function(){
		var portfolio = document.querySelector('.portfolio');
		var portfolioServices = document.querySelectorAll('.portfolio .area-service');

		[].forEach.call(portfolioServices, function(service, i){
			service.addEventListener('mousemove', function (e) {
				e.preventDefault();
				[].forEach.call(portfolioServices, function(serv, i){
					serv.style.width = "16.6666666%";
				})
				this.style.width = "50%";
			});
		})
		portfolio.addEventListener('mouseleave', function (e) {
			[].forEach.call(portfolioServices, function(serv, i){
				serv.style.width = "25%";
			})
		});
	}
	//portfolioHover();

	// Infinite slide loop
	function passSlide(){
		var bg1 = document.querySelector('#introduce-background1');
		var bg2 = document.querySelector('#introduce-background2');
		var radios = document.querySelectorAll('.introduce .services input[type=radio]');
		var index = 0;
		var delay = 5000;
		var transition = 2000;

		[].forEach.call(radios, function(radio, i){
			radio.addEventListener('change', function (e) {
				e.preventDefault();
			})
			document.querySelectorAll('.introduce .services label')[i].addEventListener('click', function(e){
				e.preventDefault();
			}, false);
		})

		var increaseIndex = function(){
			if(index >= dataImages.length-1){
				index = 0;
			}else{
				index++;
			}
			return index;
		}

		function fadeOut(){
			bg1.style['background-image']  = 'url("' + dataImages[index] + '")';
			bg2.style['background-image']  = 'url("' + dataImages[increaseIndex()] + '")';
			setTimeout(function(){
				bg1.style.opacity = 0;
				setTimeout(fadeIn, transition);
				radios[index].checked = true;
			}, delay);
		}
		function fadeIn(){
			bg2.style['background-image']  = 'url("' + dataImages[index] + '")';
			bg1.style['background-image']  = 'url("' + dataImages[increaseIndex()] + '")';
			setTimeout(function(){
				bg1.style.opacity = 1;
				setTimeout(fadeOut, transition);
				radios[index].checked = true;
			}, delay);
		}
		fadeOut();
	}
	passSlide();
});
