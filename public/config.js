$(function() {
  // $.getJSON("/things/api", updateThings);
  $.ajax({
    dataType: "json",
    url: "/things",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    success: updateThings
  });

  var suggest;
  $(".feedback-messages", function(e) {
    if (e.target.className == "text-center") {
      $.ajax({
        type: "GET",
        url: "/things/" + e.target.id + "/properties/temperature",
        cache: false,
        success: function(data) {
          suggest = JSON.parse(data);
        }
      });
    }
  });

  $(".gpio-form").submit(function(e) {
    e.preventDefault();
    $.post(
      "/things",
      {
        pin: $("#pin").val(),
        name: $("#name").val(),
        type: $("#type").val()
      },
      updateThings
    );
  }); //add things

  $(".remove-gpio-form").submit(function(e) {
    e.preventDefault();
    $.post(
      "/things/delete",
      {
        thingID: $("#thing-id").val()
      },
      updateThings
    );
  }); //remove things

  $(".feedback-messages").on("click", function(e) {
    if (e.target.className == "btn btn-success btn-just-icon") {
      $.ajax({
        url: "/things/" + e.target.id + "/properties/on",
        type: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({ on: true })
      }); //ajax
    } // the target is a ON button
  });

  $(".feedback-messages").on("click", function(e) {
    if (e.target.className == "btn btn-danger btn-just-icon") {
      $.ajax({
        url: "/things/" + e.target.id + "/properties/on",
        type: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({ on: false })
      }); //ajax
    } // the target is a OFF  button
  });

  //

  function updateThings(data) {
    console.log(data);

    var output = "";

    $.each(data, function(key, item) {
      console.log(key);

      if (item.thingType == "onoff") {
        output += '<div class="column" id="' + item.thingID + '">';
        output += '<div class="card">';
        output += "<h3>" + item.thingID + "</h3>";
        output += "<p>" + item.name + "</p>";
        output +=
          '<div><button class="btn btn-success btn-just-icon" id="' +
          item.thingID +
          '"  >On</button></div>';
        output +=
          '<div><button class="btn btn-danger btn-just-icon" id="' +
          item.thingID +
          '"  >Off</button></div>';
        output += "</div>";
        output += "</div>";
      } else {
        // $.getJSON(
        //   "/things/" + item.thingID + "/properties/temperature",
        //   { data },
        //   processMyJson
        // );
        function test() {
          return $.getJSON(
            "/things/" + item.thingID + "/properties/temperature"
          );
        }
        output += '<div class="column" id="' + item.thingID + '">';
        output += '<div class="card">';
        output += "<h3>" + item.thingID + "</h3>";
        output += "<p>" + item.name + "</p>";
        output +=
          '<p class="text-center" id ="' +
          item.thingID +
          '">' +
          suggest +
          "</p>";

        output += "</div>";
        output += "</div>";
      }
      // output += '     <div class="feedback-item item-list media-list">';
      // output += '       <div class="feedback-item media">';
      // output += '         <div class="feedback-info media-body">';
      // output += '           <div class="feedback-head">';
      // output +=
      //   '             <div class="feedback-title">' +
      //   item.pin +
      //   ' <small class="feedback-name label label-info">' +
      //   item.name +
      //   "</small></div>";
      // // output += "           </div>";
      // // output += "<table>";
      // // output += "<tr>";
      // output +=
      //   '<div><button class="btn btn-success btn-just-icon" id="' +
      //   key +
      //   '"  >On</button></div>';
      // output +=
      //   '<div><button class="btn btn-danger btn-just-icon" id="' +
      //   key +
      //   '"  >Off</button></div>';
      // // output += "</tr>";
      // // output += "</table>";
      // output += "         </div>";
      // output += "       </div>";
      // output += "     </div>";
    });
    $(".feedback-messages").html(output);
  }
});
