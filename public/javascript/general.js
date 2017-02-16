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
	return {
		class: (function(){
			return{
				add: function(newClass){
					each(function(element){
						var classes = element.className.split(" ");
						if(classes.indexOf(newClass) < 0){
							classes.push(newClass);
							element.className = classes.join(' ');
						}
					})
				},
				remove: function(willBeRemovedClass){
					each(function(element){
						var classes = element.className.split(" ");
						var indexOf = classes.indexOf(willBeRemovedClass);
						if(indexOf > 0){
							classes.splice(indexOf, 1);
							element.className = classes.join(' ');
						}
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
		scrollY: function(target, duration, easeFunction){
			each(function(element){
				cancelAnimationFrame(_animation);
				var _animation;
				duration = duration || 300;
				easeFunction = easeFunction || "easeOutQuad";
				var initValue = element.scrollY || element.scrollTop;
				var difference = target - initValue;
				var start = null;
				var animate = function(timestamp){
					if(!start) start = timestamp;
  					var progress = timestamp - start;
					var timePercent = EasingFunctions[easeFunction](progress/duration);
					if(progress < duration){
						element.scrollTop = initValue + (timePercent*difference)
					}else{
						cancelAnimationFrame(_animation);
					}
					_animation = requestAnimationFrame(animate);
				}
				_animation = requestAnimationFrame(animate);
			});
		},
		scrollX: function(target, duration, easeFunction, callback){
			each(function(element){
				cancelAnimationFrame(_animation);
				var _animation = null;
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
					}else{
						if(callback) { 
							console.log(callback.toString())
							callback(); 
						}
						cancelAnimationFrame(_animation);
					}
					_animation = requestAnimationFrame(animate);
				}
				_animation = requestAnimationFrame(animate);
			});
		}
	}
};
window.$ = $;
