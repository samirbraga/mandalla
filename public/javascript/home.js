
var sections = document.querySelectorAll('.uniform');


var passScroll = function(){
	var scrollTop = (document.body.scrollTop || window.scrollY);

	function getOffset(el) {
		el = el.getBoundingClientRect();
		return {
			left: el.left,
			top: el.top + scrollTop
		}
	}

	if(scrollTop > getOffset(sections[1]).top - 400){
		var section = sections[1];
		var services = section.querySelectorAll('.area-service');
		$(services).each(function(service, index){
			setTimeout(function(){
				$(service).class.add('passed');
			}, (index+1)*100);
		})
	}
	if(scrollTop > getOffset(sections[2]).top - 400){
		var section = sections[2];
		var selectionString = ".left-wrapper header h1, .left-wrapper article ul li, .main-content .content, .main-content .content hr";
		var selections = section.querySelectorAll(selectionString);
		$(selections).each(function(service, index){
			setTimeout(function(){
				$(service).class.add('passed');
			}, (index+1)*120);
		})
	}
}


window.addEventListener('scroll', passScroll);
window.addEventListener('DOMMouseScroll', passScroll);
window.addEventListener('mousewheel', passScroll);
window.addEventListener('wheel', passScroll);


var meetComponents = function(){
	var closeMeet = document.querySelector('.close-description');
	var pictures = document.querySelectorAll('.picture-container .picture-wrapper .picture-row .picture');
	var pictureOverlay = document.querySelector('.picture-container .picture-seleced-overlay');			
	var content = document.querySelector('.components .content');
	var selectedName = document.querySelector('.components .content .selected-name');
	var selectedDescription = document.querySelector('.components .content .selected-description');

	var id2Names = {
		"01": "samila",
		"02": "monique",
		"03": "edi",
		"04": "samir",
		"05": "felipe",
		"06": "roberta",
		"07": "manu"
	}

	var names2description = {
		"samila": {
			name: "Sâmila Braga",
			description: {
				title: 'Lorem ipsum Aliqua',
				content: 'Lorem ipsum Aliqua nulla mollit in exercitation sint ex veniam consequat elit esse adipisicing. Lorem ipsum Tempor.'
			}
		},
		"monique": {
			name: "Monique Oliveira",
			description: {
				title: 'Lorem ipsum Aliqua',
				content: 'Lorem ipsum Aliqua nulla mollit in exercitation sint ex veniam consequat elit esse adipisicing. Lorem ipsum Tempor.'
			}
		},
		"edi": {
			name: "Edi Santos",
			description: {
				title: 'Lorem ipsum Aliqua',
				content: 'Lorem ipsum Aliqua nulla mollit in exercitation sint ex veniam consequat elit esse adipisicing. Lorem ipsum Tempor.'
			}
		},
		"samir": {
			name: "Samir Braga",
			description: {
				title: 'Lorem ipsum Aliqua',
				content: 'Lorem ipsum Aliqua nulla mollit in exercitation sint ex veniam consequat elit esse adipisicing. Lorem ipsum Tempor.'
			}
		},
		"felipe": {
			name: "Felipe Lima",
			description: {
				title: 'Lorem ipsum Aliqua',
				content: 'Lorem ipsum Aliqua nulla mollit in exercitation sint ex veniam consequat elit esse adipisicing. Lorem ipsum Tempor.'
			}
		},
		"roberta": {
			name: "Roberta Tavares",
			description: {
				title: 'Lorem ipsum Aliqua',
				content: 'Lorem ipsum Aliqua nulla mollit in exercitation sint ex veniam consequat elit esse adipisicing. Lorem ipsum Tempor.'
			}
		},
		"manu": {
			name: "Manuela Sales",
			description: {
				title: 'Lorem ipsum Aliqua',
				content: 'Lorem ipsum Aliqua nulla mollit in exercitation sint ex veniam consequat elit esse adipisicing. Lorem ipsum Tempor.'
			}
		}
	};

	[].forEach.call(pictures, function(picture, i){
		var id = picture.getAttribute("data-id");
		var name = id2Names[id];
		picture.style.backgroundImage = "url('/public/Images/component-photos/" + name + ".jpg')"; 
	});

	$(pictures).on('click', function(){
		var id = this.getAttribute("data-id");
		var name = id2Names[id];
		selectedName.innerHTML = names2description[name].name.split(' ').join('<br>');
		selectedDescription.children[0].innerHTML = names2description[name].description.title;
		selectedDescription.children[1].innerHTML = names2description[name].description.content;

		pictureOverlay.style['background-image'] = this.style['background-image'];
		closeMeet.style.display = 'block';
		closeMeet.style.opacity = 1;
		pictureOverlay.style.height = '306px';
		pictureOverlay.style.width = '306px';
		pictureOverlay.style.display = 'block';
		pictureOverlay.style.opacity = 1;
		$(content).class.add('selected');
	});

	$(closeMeet).on('click', function(){
		closeMeet.style.opacity = 0;
		pictureOverlay.style.opacity = 0;
		$(content).class.remove('selected');
		setTimeout(function(){
			closeMeet.style.display = 'none';
			pictureOverlay.style.height = '0';
			pictureOverlay.style.width = '0';
		}, 300)
	});
}
meetComponents();

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
		clientsList.style.transform = "translateX(" + (scrollRate) + "%)";
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
clientsCarousel();

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
window.addEventListener('scroll', fixTopBar);
window.addEventListener('DOMMouseScroll', fixTopBar);
window.addEventListener('mousewheel', fixTopBar);
window.addEventListener('wheel', fixTopBar);

var backgroundUrls = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg'];

var dataImages = backgroundUrls.map(function(bg){
	return "/public/Images/welcome-slide/" + bg;
});

document.addEventListener('DOMContentLoaded', function(){
	
	var portfolio = document.querySelector('.portfolio');
	var portfolioServices = document.querySelectorAll('.portfolio .area-service');
	
	[].forEach.call(portfolioServices, function(service, i){
		service.addEventListener('mouseenter', function (e) {
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