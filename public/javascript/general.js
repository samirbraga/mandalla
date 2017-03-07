var $ = function(elements){
	function each(callback){
		if(elements.length){
			if(elements.length > 1){
				[].forEach.call(elements, callback);
			}else{
				callback(elements, 0);
			}
		}else{
			callback(elements, 0);
		}
	}

	var EasingFunctions = {
		linear: function (t) { return t },
		easeInQuad: function (t) { return t*t },
		easeOutQuad: function (t) { return t*(2-t) },
		easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
		easeInCubic: function (t) { return t*t*t },
		easeOutCubic: function (t) { return (--t)*t*t+1 },
		easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
		easeInQuart: function (t) { return t*t*t*t },
		easeOutQuart: function (t) { return 1-(--t)*t*t*t },
		easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
		easeInQuint: function (t) { return t*t*t*t*t },
		easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
		easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	}

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
							console.log(indexOf, classes);
							classes.splice(indexOf, 1);
							console.log(indexOf, classes);
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
		on: function(event, callback){
			each(function(element){
				element.addEventListener(event, callback);
			});
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
				var _animation = null;
				duration = parseFloat(duration) || 300;
				easeFunction = easeFunction || "easeInOutQuad";
				target = parseFloat(target);
				var initValue = element.scrollY || element.scrollTop;
				var difference = target - initValue;
				var start = null;
				var progress = 0;
				var animate = function(){
  				progress += 20;
					var value = Math[easeFunction](progress, initValue, difference, duration);
					element.scrollTop = value;

					if(progress < duration){
						_animation = requestAnimationFrame(animate);
					}else{
						if(callback) callback();
					}
				}
				_animation = requestAnimationFrame(animate);
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
					var timePercent = EasingFunctions[easeFunction](progress/duration);
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
}());

Math.getRandomFrom = function(n){
	return Math.round(Math.random()*n);
}
Number.prototype.formatDot = function(){
	return this.toString().split("").reverse().join("").match(/[0-9]{1,3}/g).map(function(part){
				 	  return part.split("").reverse().join("")
				 }).reverse().join('.');
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
