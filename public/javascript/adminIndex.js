
var establishmentsData;
var audiographsData;

function updateData(){
  dataRequest('establishments', function(err, data){
    if(err){
      alert('Algo errado aconteceu :( \n \nTente novamente mais tarde.');
    }else{
      establishmentsData = data;
      renderListRemove(establishmentsData);
      renderListUpdate(establishmentsData);
    }
  })
}
updateData();

function updateAudioData(){
  dataRequest('audiographs', function(err, data){
    if(err){
      alert('Algo errado aconteceu :( \n \nTente novamente mais tarde.');
    }else{
      audiographsData = data;
      renderAudiosRemove(audiographsData);
      //renderAudiosUpdate(audiographsData);
    }
  })
}
updateAudioData();

// ADD

function addEstablishment(){
  var result = confirm('Adicionar estabelecimento? \n\nTenha certeza que já revisou todas as informações fornecidas.');
  if(result){
    var addForm = document.querySelector('.tabs-container .tab.add form');
    var inputs = addForm.querySelectorAll('input[type=text], textarea');
    var params = {};
    $(inputs).each(function(input, i){
      params[input.name] = input.value;
    });
    postData('/admin/add-establishment', params, function(err, response){
      if(err || response == 'error'){
        alert('Não foi possível completar a ação, tente novamente mais tarde.');
      }else{
        updateData()
        $(inputs).value('');
      }
    });
  }
}

// REMOVE SEARCH

var searchRemoveInput = document.querySelector('.tab.remove .search-name');
$(searchRemoveInput).on('input', function(){
  var val = this.value.parseToRegex();
  var regex = new RegExp(val, 'gi');
  var searchResult = establishmentsData.filter(function(el, i){
    return regex.test(el.name);
  });
  renderListRemove(searchResult);
});

function renderListRemove(data){
  var establishmentsList = document.querySelector('.tab.remove .establishments-list');
  var html = data.map(function(el, i){
    return '<li class="clearfix" >' +
              '<div class="list-header">'+
                '<span>'+ el.name +'</span>'+
                '<button data-id="' + el._id + '" class="remove-establishments"><i class="fa fa-trash"></i> Remover</button>'+
              '</div>'+
              '<div class="list-content" >'+
                '<hr>'+
                '<p><b>Nome</b>: ' + el.name + '</p>' +
                '<p><b>Site</b>: ' + el.site + '</p>' +
                '<p><b>Ramo</b>: ' + el.trading + '</p>' +
                '<p><b>Endereço</b>: ' + el.street + ", " + el.number + " - " + el.district + '</p>' +
                '<p><b>Lat e Lng</b>: ' + el.latLng.join(', ') + '</p><br>' +
              '</div>'+
            '</li>';
  }).join('');
  var ul = document.createElement('ul');
  ul.innerHTML = html;
  var fragment = document.createDocumentFragment();
  fragment.appendChild(ul);
  establishmentsList.innerHTML = '';
  establishmentsList.appendChild(fragment);

  var liHeaders = document.querySelectorAll('.tab.remove .establishments-list li .list-header');
  $(liHeaders).on('click', function(){
    var self = this;
    var li = self.parentNode;
    $(liHeaders).each(function(el){
      if(el != self)
      $(el.parentNode).class.remove('selected');
    });
    $(li).class.toggle('selected');
  });

  var deleteButtons = document.querySelectorAll('.tab.remove .remove-establishments');
  $(deleteButtons).on('click', function(){
    var deleteSure = confirm('Tem certeza que deseja remover esse estabelecimento?\n\nEssa ação é irreversível!');
    if(deleteSure){
      var id = this.getAttribute('data-id');
      postData('/admin/remove-establishment/'+id, {id: "id"}, function(err, response){
        if(err || response == "error"){
          alert('Não foi possível remover.\n\nTente novamente mais tarde.');
        }else{
          updateData()
        }
      }, 'DELETE');
    }
  });
}


// UPDATE SEARCH

var searchUpdateInput = document.querySelector('.tab.update .search-name');
$(searchUpdateInput).on('input', function(){
  var val = this.value.trim().parseToRegex();
  var regex = new RegExp(val, 'gi');
  var searchResult = establishmentsData.filter(function(el, i){
    return regex.test(el.name);
  });
  renderListUpdate(searchResult);
});

function renderListUpdate(data){
  var establishmentsList = document.querySelector('.tab.update .establishments-list');
  var html = data.map(function(el, i){
    return '<li class="clearfix" >' +
              '<div class="list-header">'+
                '<span>'+ el.name +'</span>'+
                '<button data-id="' + el._id + '" class="update-establishments"><i class="fa fa-refresh"></i> Atualizar</button>'+
              '</div>'+
              '<div class="list-content" >'+
                '<hr>'+
                '<p><b>Nome</b>: ' + el.name + '</p>' +
                '<p><b>Site</b>: ' + el.site + '</p>' +
                '<p><b>Ramo</b>: ' + el.trading + '</p>' +
                '<p><b>Endereço</b>: ' + el.street + ", " + el.number + " - " + el.district + '</p>' +
                '<p><b>Lat e Lng</b>: ' + el.latLng.join(', ') + '</p><br>' +
              '</div>'+
            '</li>';
  }).join('');
  var ul = document.createElement('ul');
  ul.innerHTML = html;
  var fragment = document.createDocumentFragment();
  fragment.appendChild(ul);
  establishmentsList.innerHTML = '';
  establishmentsList.appendChild(fragment);

  var liHeaders = document.querySelectorAll('.tab.update .establishments-list li .list-header');
  $(liHeaders).on('click', function(){
    var self = this;
    var li = self.parentNode;
    $(liHeaders).each(function(el){
      if(el != self)
      $(el.parentNode).class.remove('selected');
    });
    $(li).class.toggle('selected');
  });

  var updateButtons = document.querySelectorAll('.update-establishments');
  $(updateButtons).on('click', function(){
    var deleteSure = confirm('Tem certeza que deseja remover esse estabelecimento?\n\nEssa ação é irreversível!');
    if(deleteSure){
      var id = this.getAttribute('data-id');
      postData('/admin/remove-establishment/'+id, {id: "id"}, function(err, response){
        if(err || response == "error"){
          alert('Não foi possível remover.\n\nTente novamente mais tarde.');
        }else{
          updateData();
        }
      }, 'DELETE');
    }
  });
}



// UPDATE SEARCH

var searchRemoveAudio = document.querySelector('.audios-manage .tab.remove .search-name');
$(searchRemoveAudio).on('input', function(){
  var val = this.value.trim().parseToRegex();
  var regex = new RegExp(val, 'gi');
  var searchResult = audiographsData.filter(function(el, i){
    return regex.test(el.street_name);
  });
  console.log(searchResult);
  renderAudiosRemove(searchResult);
});

function renderAudiosRemove(data){
  var audiosList = document.querySelector('.tab.remove .audios-list');
  var html = data.map(function(el, i){
    return '<li class="clearfix" >' +
              '<div class="list-header">'+
                '<span>'+ el.street_name +'</span>'+
                '<button data-id="' + el._id + '" class="remove-audio"><i class="fa fa-trash"></i> Remover</button>'+
              '</div>'+
              '<div class="list-content" >'+
                '<hr>'+
                '<p><b>Nome da respectiva rua</b>: ' + el.street_name + '</p>' +
                '<p><b>Link do instagram</b>: ' + el.instagram_link + '</p>' +
                '<p><b>Visualizações</b>: ' + el.listen_count + '</p>' +
                '<p><b>Áudio</b>: <audio controls style="vertical-align: middle;" ><source src="/ag/' + el.audio_file + '" type="audio/mp3" ></audio></p>' +
              '</div>'+
            '</li>';
  }).join('');
  var ul = document.createElement('ul');
  ul.innerHTML = html;
  var fragment = document.createDocumentFragment();
  fragment.appendChild(ul);
  audiosList.innerHTML = '';
  audiosList.appendChild(fragment);

  var liHeaders = document.querySelectorAll('.tab.remove .audios-list li .list-header');
  $(liHeaders).on('click', function(){
    var self = this;
    var li = self.parentNode;
    $(liHeaders).each(function(el){
      if(el != self)
      $(el.parentNode).class.remove('selected');
    });
    $(li).class.toggle('selected');
  });

  var deleteButtons = document.querySelectorAll('.tab.remove .remove-audio');
  $(deleteButtons).on('click', function(){
    var deleteSure = confirm('Tem certeza que deseja remover essa audiografia?\n\nEssa ação é irreversível!');
    if(deleteSure){
      var id = this.getAttribute('data-id');
      postData('/admin/remove-audio/'+id, {id: "id"}, function(err, response){
        if(err || response == "error"){
          alert('Não foi possível remover.\n\nTente novamente mais tarde.');
        }else{
          updateAudioData();
        }
      }, 'DELETE');
    }
  });
}



var tabsTitle = document.querySelectorAll('.tab-title');
//var tabs = document.querySelectorAll('.tab');
var tabs;
$(tabsTitle).on('click', function(){
  var id = this.getAttribute('data-target');
  var tab = document.getElementById(id);
  tabs = tab.parentNode.children;
  $(tabs).class.remove('activated');
  $(tab).class.add('activated');
  $(this.parentNode.children).class.remove('activated');
  $(this).class.add('activated');
});
