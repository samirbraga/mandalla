(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
		|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame){
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame){
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
})();

var $ = function(elements){
	function each(callback){
		if(elements){
			if(elements.length){
				if(elements.length > 1){
					[].forEach.call(elements, callback);
				}else{
					callback(elements[0], 0);
				}
			}else{
				callback(elements, 0);
			}
		}
	}

	Math.linear = function (t) { return t },
	Math.easeInQuad = function (t) { return t*t },
	Math.easeOutQuad = function (t) { return t*(2-t) },
	Math.easeInOutQuad = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	Math.easeInCubic = function (t) { return t*t*t },
	Math.easeOutCubic = function (t) { return (--t)*t*t+1 },
	Math.easeInOutCubic = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	Math.easeInQuart = function (t) { return t*t*t*t },
	Math.easeOutQuart = function (t) { return 1-(--t)*t*t*t },
	Math.easeInOutQuart = function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	Math.easeInQuint = function (t) { return t*t*t*t*t },
	Math.easeOutQuint = function (t) { return 1+(--t)*t*t*t*t },
	Math.easeInOutQuint = function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }

	Math.roundTo = function(num, step, decrement) {
	  return Math.floor((num / step) + .5) * parseFloat(step) - (decrement || 0);
	}
	/*
	Math.easeInOutQuad = function (t, b, c, d) {
	  t /= d/2;
	  if (t < 1) {
	    return c/2*t*t + b
	  }
	  t--;
	  return -c/2 * (t*(t-2) - 1) + b;
	};

	Math.easeInCubic = function(t, b, c, d) {
	  var tc = (t/=d)*t*t;
	  return b+c*(tc);
	};

	Math.inOutQuintic = function(t, b, c, d) {
	  var ts = (t/=d)*t,
	  tc = ts*t;
	  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
	};
*/
	return {
		class: (function(){
			return{
				add: function(newClasses){
					each(function(element){
						var classes = element.className.split(" ");
						newClasses.split(' ').forEach(function(newClass){
							if(classes.indexOf(newClass) < 0){
								classes.push(newClass);
							}
						});
						element.className = classes.join(' ');
					})
				},
				toggle: function(toggleClass){
					each(function(element){
						var classes = element.className.split(" ");
						if(classes.indexOf(toggleClass) >= 0){
							var indexOf = classes.indexOf(toggleClass);
							classes.splice(indexOf, 1);
						}else{
							classes.push(toggleClass);
						}
						element.className = classes.join(' ');
					})
				},
				has: function(classVerify){
					var returned;
					each(function(element){
						var classes = element.className.split(" ");
						if(classes.indexOf(classVerify) >= 0){
							returned = true;
						}else{
							returned = false;
						}
					})
					return returned;
				},
				remove: function(willBeRemovedClasses){
					each(function(element){
						var classes = element.className.split(" ");
						willBeRemovedClasses.split(" ").forEach(function(willBeRemovedClass){
							var indexOf = classes.indexOf(willBeRemovedClass);
							if(indexOf > 0){
								classes.splice(indexOf, 1);
							}
						})
						element.className = classes.join(' ');
					})
				},
				replace: function(class1, class2){
					each(function(element){
						var classes = element.className.split(" ");
						var indexOf = classes.indexOf(class1);
						if(indexOf > 0){
							classes[indexOf] = class2;
							element.className = classes.join(' ');
						}
					});
				}
			}
		})(),
		on: function(_event, callback){
			each(function(element){
				element.addEventListener(_event, callback);
			});
		},
		html: function(html){
			var htmlRetured;
			each(function(element){
				if(html){
					element.innerHTML = html;
				}else{
					htmlRetured = element.innerHTML;
				}
			});
			return htmlRetured;
		},
		css: function(property, value){
			if(value){
				each(function(element){
					element.style[property] = value;
				});
			}else{
				var value;
				each(function(element){
					value = element.style[property];
				});
				return value;
			}
		},
		each: function(callback){
			each(callback);
		},
		offset: function() {
			var offset;
			each(function(el){
				el = el.getBoundingClientRect();
				offset =  {
					left: el.left,
					top: el.top
				};
			});
			return offset;
		},
		offset: function() {
			var offset;
			each(function(el){
				el = el.getBoundingClientRect();
				offset =  {
					left: el.left,
					top: el.top
				};
			});
			return offset;
		},
		height: function() {
			var height;
			each(function(el){
				height = el.offsetHeight;
			});
			return height;
		},
		width: function() {
			var width;
			each(function(el){
				width = el.offsetWidth;
			});
			return width;
		},
		value: function(value) {
			each(function(el){
				el.value = value || "";
			});
		},
		attr: function(attr, value) {
			var args = arguments;
			var returnedAttr = true;
			each(function(el){
				if(args.length > 1){
					el.setAttribute(attr, value);
				}else{
					returnedAttr = el.getAttribute(attr);
				}
			});
			return returnedAttr;
		},
		scrollY: function(target, duration, easeFunction, callback){
			each(function(element){
				cancelAnimationFrame(_animation);
			  var _animation = null;
			  var callbackExec = false;
			  duration = duration || 300;
			  easeFunction = easeFunction || "easeInOutQuad";
			  var initValue = element.scrollY || element.scrollTop;
			  var difference = target - initValue;
			  var start = null;
			  var animate = function(timestamp) {
			    if (!start) start = timestamp;
			    var progress = timestamp - start;
			    var timePercent = Math[easeFunction](progress / duration);
			    if (progress < duration) {
			      element.scrollTop = initValue + (timePercent * difference)
			      element. _animation = requestAnimationFrame(animate);
			    } else {
			      if (callback && !callbackExec) {
			        callback();
			        callbackExec = true;
			      }
			    }
			  }
			  element._animation = requestAnimationFrame(animate);
			});
		},
		scrollX: function(target, duration, easeFunction, callback){
			each(function(element){
				cancelAnimationFrame(_animation);
				var _animation = null;
				var callbackExec = false;
				duration = duration || 300;
				easeFunction = easeFunction || "easeOutQuad";
				var initValue = element.scrollX || element.scrollLeft;
				var difference = target - initValue;
				var start = null;
				var animate = function(timestamp){
					if(!start) start = timestamp;
  					var progress = timestamp - start;
					var timePercent = Math[easeFunction](progress/duration);
					if(progress < duration){
						element.scrollLeft = initValue + (timePercent*difference)
						_animation = requestAnimationFrame(animate);
					}else{
						if(callback && !callbackExec) {
							callback();
							callbackExec = true;
						}
					}
				}
				_animation = requestAnimationFrame(animate);
			});
		}
	}
};
window.$ = $;
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license


Math.getRandomFrom = function(n){
	return Math.round(Math.random()*n);
}

Number.prototype.formatDot = function(){
	return this.toString().split("").reverse().join("").match(/[0-9]{1,3}/g).map(function(part){
				 	  return part.split("").reverse().join("")
				 }).reverse().join('.');
}

String.prototype.parseToRegex = function(){
  return this.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\./g, '\\.').replace(/\*/g, '\\*').replace(/\+/g, '\\+').replace(/\-/g, '\\-').replace(/\//g, '\\/').replace(/\"/g, '\\"').replace(/\'/g, "\\'").replace(/\,/g, '\\,').replace(/\&/g, '\\&')
}

String.prototype.parseToUrl = function (){
	string = this;
	var translate = { "ç": "c", "é": "e", "õ": 'o', "á": "a", "ã": "a", "à": "a", "ű": "u", "ő": "o", "ú": "u", "ö": "o", "ï": "i", "ü": "u", "ó": "o", "í": "i", "É": "E", "Á": "A", "Ű": "U", "Ő": "O", "Ú": "U", "Ö": "O", "Ü": "U", "Ó": "O", "Í": "I" };
	var translate_re = new RegExp("[" + Object.keys(translate).join('') + "]", 'g');

	string = string.replace(/\s/g, '-')
				   .replace(/\?/g, '')
				   .replace(translate_re, function(letter){ return translate[letter] });
	return string.toLowerCase();
}

String.prototype.parseToSearch = function (){
	string = this;
	var translate = { "ç": "c", "é": "e", "õ": 'o', "á": "a", "ã": "a", "à": "a", "ű": "u", "ő": "o", "ú": "u", "ö": "o", "ï": "i", "ü": "u", "ó": "o", "í": "i", "É": "E", "Á": "A", "Ű": "U", "Ő": "O", "Ú": "U", "Ö": "O", "Ü": "U", "Ó": "O", "Í": "I" };
	var translate_re = new RegExp("[" + Object.keys(translate).join('') + "]", 'g');

	string = string.replace(translate_re, function(letter){ return translate[letter] });
	return string;
}


var animateCounting = function(target, begin, time, callback){
  var target = target;
  var value = begin || 0;
  var time = time || 3000;
  var change = target - value;
  var start = null;
  var ease = "easeOutQuart";

	var step = 1;
	if(target > 100){
		step = 10;
	}
	if(target > 1000){
		step = 100;
	}
	var animation;
  var animate = function(timestamp){
    if(!start) start = timestamp;

    var progress = timestamp - start;

    var percent = Math[ease](progress/time);

		var value = (Math.roundTo(target*percent, step)) >= target-step ? target : (Math.roundTo(target*percent, step))
		callback(value >= target ? target : value);

    if(progress < time){
      animation = requestAnimationFrame(animate)
    } else {
			callback(target);
			cancelAnimationFrame(animation);
		}
  }
  animation = requestAnimationFrame(animate)
}
/*

var parallax = function(){
  var introduceBackground = document.querySelectorAll('.parallax-background');

	if(introduceBackground){
		var scrollBg = function(){
			var scrollTop = document.scrollY || document.body.scrollTop;
			var rate = 0.7;
			$(introduceBackground).each(function(el){
				$(el).css('background-position', '0 ' + (scrollTop*rate) + "px")
			})
		}
		scrollBg();
		window.addEventListener('DOMMouseScroll', scrollBg);
		window.addEventListener('scroll', scrollBg);
		window.addEventListener('mousewheel', scrollBg);
		window.addEventListener('wheel', scrollBg);
	}
}
*/
var optimizedResize = (function() {
  var callbacks = [],
      running = false;
  function resize() {
    if (!running) {
      running = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }
  function runCallbacks() {
    callbacks.forEach(function(callback) {
        callback();
    });
    running = false;
  }
  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
  }
  return {
    add: function(callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    }
  }
}());

document.addEventListener('DOMContentLoaded', function(){
	setTimeout(function(){
		$(document.body).class.add('full-loaded');
	}, 10)


  var goDown = function(){
    var arrow = document.querySelector('.arrow-bottom');
    var roots = document.querySelectorAll('html, body');
    $(arrow).on('click', function(){
      $(roots).scrollY(window.innerHeight, 1000)
    });
  }
  goDown();


  var searchOverlay = function(){
    var searchIcon = document.querySelector('.topbar .search-icon');
    var searchContainer = document.querySelector('.search-container');
    var searchBgOverlay = document.querySelector('.search-container .search-background-overlay');
    var closeIcon = document.querySelector('.search-container .search-wrapper .close-icon');
    var searchInput = document.querySelector('.search-container .search-wrapper form input');
    var searchElements = searchContainer.querySelectorAll('*');

    var search = {
      open: function(){
        $(searchContainer).class.add('activated');
        searchInput.focus()
        setTimeout(function(){
          $(searchElements).class.add('activated');
        }, 30)
      },
      close: function(){
        $(searchContainer).class.remove('activated');
        setTimeout(function(){
          $(searchElements).class.remove('activated');
        }, 30)
      }
    }

    $(searchIcon).on('click', search.open);
    $(closeIcon).on('click', search.close);
    $(searchBgOverlay).on('click', search.close);
		$(searchInput).on('keyup', function(e){
			keycode = e.keycode || e.which;
			if(keycode == 27){
				search.close();
			}
		})
  }
  searchOverlay();

	if (!Modernizr.cssvwunit || !Modernizr.cssvhunit || !Modernizr.cssvmaxunit){
		//alert('ddd')
		/*
		var viewPortUnitsCss = {};
		for(i in document.styleSheets){
			var sheet = document.styleSheets[i];
			var href = sheet.href;
			if(href != undefined){
				if(href){
					var hrefDomain = href.match(/^(http|https):\/\/[^/]+/g);
					if(hrefDomain){
						hrefDomain = hrefDomain[0]
					}
					var hrefExtesion = href.match(/(\.min\.css)$/g);
				}
				if((href == null || hrefDomain == "http://localhost") && (!hrefExtesion)){
					var rulesLists = sheet.rules || sheet.cssRules
					for(index in rulesLists){
						var ruleList = rulesLists[index];
						var cssText = ruleList.cssText;
						console.log(cssText);
						if(cssText){
							cssText = cssText.toString()
							if(cssText.match(/\{.+\}/)){
								var rules = cssText.match(/\{.+\}/)[0].trim();
								rules = rules.substring(1, rules.length-1);
								var selector = cssText.match(/^.+\{/)[0].trim();
								selector = selector.substring(0, selector.length-1);
								var hasVpUnit = false;
								var vpUnitRules = {}
								rules.split(";").forEach( function(rule, ind) {
									var property = rule.split(":")[0];
									var value = rule.split(":")[1];
									//console.log(/(vmin|vmax|vh|vw)/g.test(value));
									//console.log(value);
									if(/(vmin|vmax|vh|vw)/.test(value)){
										hasVpUnit = true;
										vpUnitRules[property] = value;
									}
									if(hasVpUnit){
										viewPortUnitsCss[selector] = vpUnitRules;
									}
									if(ind == rules.split(";").length-1 && i == document.styleSheets.length-1){
										replaceVpUnites(viewPortUnitsCss);
									}
								});
							}
						}
					}
				}
			}
		}
		*/
		//function replaceVpUnites(cssSheet){


			//var fallElements = [];
			//var fallRules = [];
			/*
			for(selector in cssSheet){
				fallElements.push(document.querySelectorAll(selector));
				fallRules.push(viewPortUnitsCss[selector]);
			}
			*/
			var resizeElements = function(){
				//fallElements.forEach(function(nodeList, i){
					//if(nodeList.length > 0){
				var nodeList = document.querySelectorAll('.viewport-units');
						$(nodeList).each(function(el){
							var styles = el.getAttribute('data-properties');
							styles = styles.split(';');
								styles.forEach(function(style){
									if(style){
										console.log(style)
										var property = style.split(':')[0].trim();
										var value = style.split(':')[1].trim();

										var unit = value.match(/(vmin|vmax|vh|vw)$/)[0];
										var number = parseFloat(value);

										var vpW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
										var vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

										if(unit == "vh"){
											value = vpH;
										}else if(unit == "vw"){
											value = vpW;
										}else if(unit == "vmax"){
											value = Math.max(vpH, vpW);
										}else if(unit == "vmin"){
											value = Math.min(vpH, vpW);
										}

										el.style[property] = ((number*value)/100) + "px";
									}
								});
						});
					}
				//})
			//}
			resizeElements();
			optimizedResize.add(resizeElements);
			window.addEventListener('orientationchange', resizeElements);

		//}
	}
});

var jsonToHTML = function(json, html, fallbackHTML){
	var htmlresult = json.map(function(el, index){
  	return html.replace(/\{\{[^{}]+\}\}/g, function(match){
    	var key = match.replace(/(\{|\})/g, '');
    	return el[key];
    })
  }).join(' ');

  return htmlresult.length <= 0 ? fallbackHTML : htmlresult;
}


var dataRequest = function(code, callback, fullUrl){
	var xml = new XMLHttpRequest();
	var url = fullUrl || ("/data?q=" + code) ;
	xml.open("GET", url);
	xml.responseType = "text";
	xml.onload = function () {
			if(xml.readyState === 4){
					if(xml.status === 200 || xml.status == 0){
						var data = xml.response;
						callback(null, JSON.parse(data));
					}else{
						callback(xml.statusText, null);
					}
			}
	}
	xml.send();
}
function jsonToQueryString(json) {
	return Object.keys(json).map(function(key) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
				 }).join('&');
}


var postData = function(url, params, callback, method, fullUrl){
	var xml = new XMLHttpRequest();
	params = jsonToQueryString(params);
	xml.open((method || "POST"), (fullUrl || url), true);

	//Send the proper header information along with the request
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xml.onreadystatechange = function() {//Call a function when the state changes.
			if(xml.readyState == 4) {
				if(xml.status == 200){
					callback(null, xml.responseText);
				}else{
					callback(xml.statusText);
				}
			}
	}
	xml.send(params);
}


/*

var plugins = ['parser.js', 'tokenizer.js', 'vminpoly.js'];
plugins = plugins.map(function(plugin){
	return "/public/javascript/libs/viewport-units-polyfill/" + plugin
});

if (!Modernizr.cssvwunit || !Modernizr.cssvhunit || !Modernizr.cssvminunit || !Modernizr.cssvminunit) {
	plugins.forEach(function(plugin){
		var script = document.createElement('script');
		script.src = plugin;
		document.body.appendChild(script);
	})
}
*/
