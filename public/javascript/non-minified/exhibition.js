
var body = document.body;
var sections = document.querySelectorAll('section, .introduce, .welcome');

var passedChecker = {};

$(sections).each(function(section, si){
  passedChecker[section.className.split(' ')[0]] = false;
})

var passScroll = function () {

	var scrollTop = (body.scrollTop || window.scrollY);
  function getOffset(el) {
		el = el.getBoundingClientRect();
		return {
			left: el.left,
			top: el.top + scrollTop
		};
	}

  $(sections).each(function(section, si){
    var passed = passedChecker[section.className.split(' ')[0]]
    var offset = parseFloat(section.getAttribute('data-animation-offset')) || 250;

    if (scrollTop > getOffset(section).top - offset && !passed){
      var delay = parseFloat(section.getAttribute('data-animation-delay')) || 100;
      passedChecker[section.className.split(' ')[0]] = true;

      var services = section.querySelectorAll('.animation-point');
      if(services){
        if(services.length> 0){
          $(services).each(function(service, index){
            setTimeout(function(){
              $(service).class.add('passed');
            }, (index+1)*delay);
          })
        }
      }
    }
  })
}

window.addEventListener('scroll', passScroll);
window.addEventListener('DOMMouseScroll', passScroll);
window.addEventListener('mousewheel', passScroll);
window.addEventListener('wheel', passScroll);
window.addEventListener('DOMContentLoaded', passScroll);
