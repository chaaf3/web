(function ($) {
    // Let's start writing AJAX calls!
    
    var myNewTaskForm = $('#new-item-form'),
      searchTerm = $('#search_term'),
      searchForm = $('#searchForm'),
      todoArea = $('#showList');
      show = $('#show');
      homelink= $('#homeLink');
  


    // function bindEventsTo(inject, url) {
    //   inject.find('#show').on('click', function (event) {
    //     event.preventDefault();
  searchForm.submit(function (event) {
    event.preventDefault();

    var newName = searchTerm.val();
    if (newName == null || typeof newName == "undefined" || newName.trim().length == 0) {
      alert("your input is invalid");
    }
    else {
    var holder = 'http://api.tvmaze.com/search/shows?q=' + newName;
        var requestConfig3 = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      url: holder,
      contentType: 'application/json',
    }
    $.ajax(requestConfig3).then(function (res) {
      todoArea.empty();
      show.empty();
      show.addClass('hidden');
      todoArea.removeClass('hidden');
      homelink.removeClass('hidden');
      for(let i = 0; i < res.length; i++) { 
        let newElement = (res[i].show);
        let name = newElement.name;
        let url = newElement._links.self.href;
        let inject = "<li><a href=" +url + ">"+name+"</a></li>";
        todoArea.append(inject);

        // bindEventsTo(inject, url);
        // todoArea.append(newElement);
      }
      
    });
  }
  })
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   method: 'GET',
        //   url: url,
        //   contentType: 'application/json',
        // };
  
    //     $.ajax(requestConfig2).then(function (responseMessage) {
    //       // let x = responseMessage.genres.map((y) => {
    //       //   return $(`<li>${y}</li>`);
    //       // })
    //     let fill = "";

    //     for (var i = 0; i < responseMessage.genres.size; i++) {
    //       fill += "<li>${" + responseMessage.genres[i] + "}<li>"
    //     };

    //       let name = $(`<h1>${responseMessage.name}</h1>
    //       <img src="${responseMessage.image.medium}"/>
    //       <dl>
    //       <li>${responseMessage.language}</li>
    //       <li><ul>${fill}</ul></li>
    //       <li>${responseMessage.rating.average}</li>
    //       <li>${responseMessage.network.name}</li>
    //       <li>${responseMessage.summary}</li>
    //       </dl>`);
    //   });
    //   });
    // }

      var newContent = $('#new-content');
      var requestConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        url: 'http://api.tvmaze.com/shows',
        contentType: 'application/json',
      };
      $.ajax(requestConfig).then(function (responseMessage) {
        for(let i = 0; i < responseMessage.length; i++) { 
          let newElement = (responseMessage[i]);
          let name = newElement.name;
          let url = newElement._links.self.href;
          let inject = "<li><a href=" +url + ">"+name+"</a></li>";
          todoArea.append(inject);
          show.empty();
          show.addClass('hidden');
          todoArea.removeClass('hidden');
          homelink.addClass('hidden');

          // bindEventsTo(inject, url);
          // todoArea.append(newElement);
        }
        
      });
      todoArea.on("click", function(event){
        event.preventDefault();
        
        //console.log(event.target.href)
        var requestConfig2 = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          url: event.target.href,
          contentType: 'application/json',
        };

        var fill = "";
        show.removeClass('hidden');
        todoArea.addClass('hidden');
        homelink.removeClass('hidden');
  

        $.ajax(requestConfig2).then(function (responseMessage) {
          //console.log("are these checks running");
          //console.log(responseMessage);
          if (responseMessage.name == null || typeof responseMessage.name == "undefined") {
            responseMessage.name = "N/A"
          }
          if (responseMessage.image == null || responseMessage.image.medium == null || typeof responseMessage.image.medium == "undefined") {
            responseMessage.image = {medium: "/public/no_image.jpeg"}
          }
          if (responseMessage.language == null || typeof responseMessage.language == "undefined") {
            responseMessage.language = "N/A"
          }
          if (responseMessage.genres == null || typeof responseMessage.genres == "undefined") {
            fill = "N/A"
          }
          else {
          for (var i = 0; i < responseMessage.genres.length; i++) {
            fill += "<li>" + responseMessage.genres[i] + "<li>"
          }
        }
        if (responseMessage.rating == null || typeof responseMessage.rating == "undefined" || responseMessage.rating.average == null || typeof responseMessage.rating.average == "undefined") {
          responseMessage.rating = {average: "N/A"};
        }
        if (responseMessage.network == null || typeof responseMessage.network == "undefined" || responseMessage.network.name == null || typeof responseMessage.network.name == "undefined") {
          responseMessage.network = {name: "N/A"};
        }
        if (responseMessage.summary == null || typeof responseMessage.summary == "undefined") {
          responseMessage.summary = "N/A"
        }
        //console.log(responseMessage);
          let vals = $(`<h1>${responseMessage.name}</h1>
          <img src="${responseMessage.image.medium}"/>
          <dl>
          <li class="bold">Language</li>
          <li>${responseMessage.language}</li>
          <li class="bold">Genres</li>
          <li>
          <ul>
          ${fill}
          </ul>
          </li>
          <li class="bold">Average Rating</li>
          <li>${responseMessage.rating.average}</li>
          <li class="bold">Network</li>
          <li>${responseMessage.network.name}</li>
          <li class="bold">Summary</li>
          <li>${responseMessage.summary}</li>
          </dl>`);
          //console.log(vals);
          show.append(vals);
      });
      })
  })(window.jQuery);



  


  // searchForm.on("submit", function(){
  //     console.log("hello there")
  //     var requestConfig2 = {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     method: 'GET',
  //     url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm,
  //     contentType: 'application/json',
  //   }
  // })