/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-flexboxtweener-flexwrap-setclasses !*/
!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,s,l;for(var a in C)if(C.hasOwnProperty(a)){if(e=[],t=C[a],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],l=s.split("."),1===l.length?Modernizr[l[0]]=i:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=i),w.push((i?"":"no-")+l.join("-"))}}function o(e){var t=x.className,n=Modernizr._config.classPrefix||"";if(_&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?x.className.baseVal=t:x.className=t)}function s(e,t){return e-1===t||e===t||e+1===t}function l(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(){var e=t.body;return e||(e=l(_?"svg":"body"),e.fake=!0),e}function d(e,n,r,i){var o,s,d,f,u="modernizr",p=l("div"),c=a();if(parseInt(r,10))for(;r--;)d=l("div"),d.id=i?i[r]:u+(r+1),p.appendChild(d);return o=l("style"),o.type="text/css",o.id="s"+u,(c.fake?c:p).appendChild(o),c.appendChild(p),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=x.style.overflow,x.style.overflow="hidden",x.appendChild(c)),s=n(p,e),c.fake?(c.parentNode.removeChild(c),x.style.overflow=f,x.offsetHeight):p.parentNode.removeChild(p),!!s}function f(e,t){return!!~(""+e).indexOf(t)}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function p(e,t){return function(){return e.apply(t,arguments)}}function c(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?p(i,n||t):i);return!1}function h(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(h(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+h(t[i])+":"+r+")");return o=o.join(" or "),d("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function v(e,t,i,o){function s(){d&&(delete E.style,delete E.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var a=m(e,i);if(!r(a,"undefined"))return a}for(var d,p,c,h,v,g=["modernizr","tspan","samp"];!E.style&&g.length;)d=!0,E.modElem=l(g.shift()),E.style=E.modElem.style;for(c=e.length,p=0;c>p;p++)if(h=e[p],v=E.style[h],f(h,"-")&&(h=u(h)),E.style[h]!==n){if(o||r(i,"undefined"))return s(),"pfx"==t?h:!0;try{E.style[h]=i}catch(y){}if(E.style[h]!=v)return s(),"pfx"==t?h:!0}return s(),!1}function g(e,t,n,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+N.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?v(l,t,i,o):(l=(e+" "+T.join(s+" ")+s).split(" "),c(l,t,n))}function y(e,t,r){return g(e,n,n,t,r)}var w=[],C=[],S={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var x=t.documentElement,_="svg"===x.nodeName.toLowerCase(),z=S.testStyles=d;z("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).height,10);Modernizr.addTest("cssvhunit",r==n)}),z("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],r=t.childNodes[1],i=t.childNodes[0],o=parseInt((r.offsetWidth-r.clientWidth)/2,10),l=i.clientWidth/100,a=i.clientHeight/100,d=parseInt(50*Math.max(l,a),10),f=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);Modernizr.addTest("cssvmaxunit",s(d,f)||s(d,f-o))},3),z("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],r=t.childNodes[1],i=t.childNodes[0],o=parseInt((r.offsetWidth-r.clientWidth)/2,10),l=i.clientWidth/100,a=i.clientHeight/100,d=parseInt(50*Math.min(l,a),10),f=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);Modernizr.addTest("cssvminunit",s(d,f)||s(d,f-o))},3),z("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);Modernizr.addTest("cssvwunit",r==n)});var b="Moz O ms Webkit",N=S._config.usePrefixes?b.split(" "):[];S._cssomPrefixes=N;var T=S._config.usePrefixes?b.toLowerCase().split(" "):[];S._domPrefixes=T;var I={elem:l("modernizr")};Modernizr._q.push(function(){delete I.elem});var E={style:I.elem.style};Modernizr._q.unshift(function(){delete E.style}),S.testAllProps=g,S.testAllProps=y,Modernizr.addTest("flexboxtweener",y("flexAlign","end",!0)),Modernizr.addTest("flexwrap",y("flexWrap","wrap",!0)),i(),o(w),delete S.addTest,delete S.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);
