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
		}
	}
};
window.$ = $;
