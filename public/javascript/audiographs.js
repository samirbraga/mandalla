function loadAgInfo(){var e=document.querySelectorAll(".audio-enclosure");e&&e.length>0&&function(){$(e).each(function(e){function a(e){return minutes=Math.floor(e/60),minutes=minutes>=10?minutes:"0"+minutes,e=Math.floor(e%60),e=e>=10?e:"0"+e,minutes+":"+e}var t=e.getAttribute("data-id"),n=e.querySelector("audio"),i=e.querySelector(".range-line"),o=e.querySelector(".time-line-container"),r=e.querySelector(".range-line .progress"),s=e.querySelector(".left-controls"),c=e.querySelector(".time"),u=!1;$(n).on("ended",function(){$(s).html('<i class="fa fa-play fa-lg" ></i>')}),$(n).on("pause",function(){$(s).html('<i class="fa fa-play fa-lg" ></i>'),u=!0}),$(n).on("play",function(){$(s).html('<i class="fa fa-pause fa-lg" ></i>'),u||postData("",{id:"id"},function(e,a){(e||"error"==a)&&alert("Houve um problema.\n\nTente mais tarde.")},"POST","/admin/inc-audio-listen-count/"+t)}),$(window).on("resize",function(){$(r).css("width",d.rngWidthByTime()+"px")});var l=function(){var e=a(n.currentTime),t=a(n.duration);$(c).html(e+" | "+t)};$(n).on("canplay",function(){l()}),$(n).on("timeupdate",function(){$(r).css("width",d.rngWidthByTime()+"px"),l()});var d={rngWidthByTime:function(){var e=n.duration;return n.currentTime*$(i).width()/e},timeByXPos:function(e){var a=e,t=$(i).offset().left,o=$(i).width(),r=a-t>=o?o:a-t,s=n.duration;n.currentTime;return s*r/o}};$(s).on("click",function(){n.paused?n.play():n.pause()});var f=!1,p=function(e){f=!0,n.volume=0,n.currentTime=d.timeByXPos(e.pageX||e.changedTouches[0].pageX)},m=function(e){e.preventDefault(),f&&(console.log(d.timeByXPos(e.pageX||e.changedTouches[0].pageX)),n.currentTime=d.timeByXPos(e.pageX||e.changedTouches[0].pageX))};$(e).on("selectstart",function(e){return e=e||widnow.event,e.preventDefault(),!1}),$(o).on("mousedown",p),$(o).on("touchstart",p),$(window).on("mousemove",m),$(o).on("touchmove",m),$(window).on("mouseup",function(e){f=!1,n.volume=1})})}()}loadAgInfo();var agSearchform=document.querySelector(".audiographs-search-container form"),searchInput=agSearchform.querySelector("input"),ag_list=document.querySelector(".audiographs-list-container"),searchResult,doSearch=function(e){e.preventDefault();var a=searchResult,t=searchInput.value.trim().parseToSearch().parseToRegex();if(searchResult=dataAudiographs.filter(function(e,a){if(new RegExp(t,"gi").test(e.street_name.parseToSearch()))return!0}),JSON.stringify(a)!=JSON.stringify(searchResult)){ag_list.style.opacity=0,setTimeout(function(){ag_list.innerHTML=jsonToHTML(searchResult,'<div class="audiograph-container"><figure class="audiograph-picture" ><img src="{{instagram_image_url}}" alt=""></figure><div class="audiograph-content"><div class="audiograph-title" ><span><i class="fa fa-instagram" ></i> <a target="_blank" href="{{instagram_link}}">{{street_name}}</a></span></div><div class="audiograph-counts" data-id="{{_id}}" ><span class="listen-count" ><i class="fa fa-headphones" ></i> <span>{{listen_count}}</span></span></div><div class="audio-enclosure"  data-id="{{_id}}"><audio><source src="http://localhost:7000/ag/{{audio_file}}" type="audio/mp3"></audio><div class="controls-container"><div class="left-controls"><i class="fa fa-play fa-lg" ></i></div><div class="time-line-container"><div class="range-line"><div class="progress"></div></div></div><div class="time"><span></span></div></div></div></div></div></div>',"<div class='ag-not-found' ><i class='fa fa-exclamation-circle' ></i> <span>Nenhuma audiografia encontrada.</span></div>"),setTimeout(function(){ag_list.style.opacity=1},10),loadAgInfo()},100)}return!1};agSearchform.addEventListener("submit",doSearch),searchInput.addEventListener("input",doSearch);