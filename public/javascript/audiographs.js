

function loadAgInfo(){
  var containers = document.querySelectorAll('.audio-enclosure');

  var loader = function(){
    $(containers).each(function(container){
      var audioId = container.getAttribute('data-id');
      var audio = container.querySelector('audio');
      var rangeLine = container.querySelector('.range-line');
      var timelineContainer = container.querySelector('.time-line-container');
      var progressLine = container.querySelector('.range-line .progress');
      var leftControls = container.querySelector('.left-controls');
      var time = container.querySelector('.time');
      /*
      var stopDelay;
      $(audio).on('ended', function(){
          clearTimeout(stopDelay)
          stopDelay = setTimeout(function(){
          audio.currentTime = 0;
        }, 100);
      })
      */

      var ever_heard = false;
      $(audio).on('ended', function(){
        $(leftControls).html('<i class="fa fa-play fa-lg" ></i>');
      })
      $(audio).on('pause', function(){
        $(leftControls).html('<i class="fa fa-play fa-lg" ></i>');
        ever_heard = true;
      })
      $(audio).on('play', function(){
        $(leftControls).html('<i class="fa fa-pause fa-lg" ></i>');
        if(!ever_heard){
          postData('', {id: 'id'}, function(err, response){
            if(err || response == "error"){
              alert('Houve um problema.\n\nTente mais tarde.');
            }
          }, 'POST', '/admin/inc-audio-listen-count/' + audioId);
        }
      })
      function formatTime(seconds) {
        minutes = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
      }
      $(window).on('resize', function(){
        $(progressLine).css('width', calc.rngWidthByTime() + 'px');
      })
      var updateTime = function(){
        var formatedTime = formatTime(audio.currentTime)
        var formatedDuration = formatTime(audio.duration)
        $(time).html(formatedTime + " | " + formatedDuration)
      }
      $(audio).on('canplay', function(){
        updateTime();
      })
      $(audio).on('timeupdate', function(){
        $(progressLine).css('width', calc.rngWidthByTime() + 'px');
        updateTime();
      })
      var calc = {
        rngWidthByTime: function(){
          var duration = audio.duration;
          var currentTime = audio.currentTime;
          var rgLineWidth = $(rangeLine).width();
          return (currentTime*rgLineWidth)/duration;
        },
        timeByXPos: function(x){
          var xpos = x;
          var left = $(rangeLine).offset().left;
          var width = $(rangeLine).width();
          var range = (xpos-left) >= width ? width : (xpos-left);
          var duration = audio.duration;
          var currentTime = audio.currentTime;
          return (duration*range)/width;
        }
      }

      $(leftControls).on('click', function(){
        if(audio.paused){
          audio.play();
        }else{
          audio.pause();
        }
      })

      var dragging = false;

      var goTime = function(e){
        dragging = true;
        audio.volume = 0;
        audio.currentTime = calc.timeByXPos(e.pageX || e.changedTouches[0].pageX);
      }
      var grabbingTime = function(e){
        e.preventDefault();
        if(dragging){
          console.log(calc.timeByXPos(e.pageX || e.changedTouches[0].pageX));
          audio.currentTime = calc.timeByXPos(e.pageX || e.changedTouches[0].pageX);
        }
      }

      $(container).on('selectstart', function(e){
        e = e || widnow.event;
        e.preventDefault();
        return false;
      });
      $(timelineContainer).on('mousedown', goTime);
      $(timelineContainer).on('touchstart', goTime);
      $(window).on('mousemove', grabbingTime);
      $(timelineContainer).on('touchmove', grabbingTime);
      $(window).on('mouseup', function(e){
        dragging = false;
        audio.volume = 1;
      });
    })
  }
  if(containers){
    if(containers.length > 0){
      loader();
    }
  }
}

loadAgInfo();


var agSearchform  = document.querySelector('.audiographs-search-container form');
var searchInput  = agSearchform.querySelector('input');
var ag_list = document.querySelector('.audiographs-list-container');
var searchResult;

var doSearch = function(e){
  e.preventDefault();

  var lastSearchResult = searchResult;

  var value = searchInput.value.trim().parseToSearch().parseToRegex();
  searchResult = dataAudiographs.filter(function(el, i){
    var regex = new RegExp(value, 'gi');
    if(regex.test(el.street_name.parseToSearch())){
      return true;
    }
  });

  if(JSON.stringify(lastSearchResult) != JSON.stringify(searchResult)){

    var agContainertemplate = '<div class="audiograph-container">' +
                                '<figure class="audiograph-picture" >' +
                                  '<img src="{{instagram_image_url}}" alt="">' +
                                '</figure>' +
                                '<div class="audiograph-content">' +
                                  '<div class="audiograph-title" >' +
                                    '<span>' +
                                      '<i class="fa fa-instagram" ></i> ' +
                                      '<a target="_blank" href="{{instagram_link}}">{{street_name}}</a>' +
                                    '</span>' +
                                  '</div>' +
                                  '<div class="audiograph-counts" data-id="{{_id}}" >' +
                                    '<span class="listen-count" >' +
                                      '<i class="fa fa-headphones" ></i> ' +
                                      '<span>{{listen_count}}</span>' +
                                    '</span>' +
                                  '</div>' +
                                  '<div class="audio-enclosure"  data-id="{{_id}}">' +
                                    '<audio>' +
                                      '<source src="http://localhost:7000/ag/{{audio_file}}" type="audio/mp3">' +
                                    '</audio>' +
                                    '<div class="controls-container">' +
                                      '<div class="left-controls">' +
                                        '<i class="fa fa-play fa-lg" ></i>' +
                                      '</div>' +
                                      '<div class="time-line-container">' +
                                        '<div class="range-line">' +
                                          '<div class="progress"></div>' +
                                        '</div>' +
                                      '</div>' +
                                      '<div class="time">' +
                                        '<span></span>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                              '</div>';


    var notFoundTemplate = "<div class='ag-not-found' >" +
                              "<i class='fa fa-exclamation-circle' ></i> "+
                              "<span>Nenhuma audiografia encontrada.</span>"+
                            "</div>";

    ag_list.style.opacity = 0;
    setTimeout(function(){
      ag_list.innerHTML = jsonToHTML(searchResult, agContainertemplate, notFoundTemplate);
      setTimeout(function(){
        ag_list.style.opacity = 1;
      }, 10);
      loadAgInfo();
    }, 100);

  }


  return false;
}

agSearchform.addEventListener('submit', doSearch);
searchInput.addEventListener('input', doSearch);
