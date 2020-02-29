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
      var type = item.thingType;
      switch (type) {
        case "onoff":
          output += '<div class="column">';
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
          break;

        case "dht-sensor":
          $(document).ready(
            //#A
            function doPollTemp() {
              $.getJSON(
                "/things/" + item.thingID + "/properties/temperature", //#B
                function(data) {
                  //#C
                  console.log(data);
                  $("#t-" + item.thingID + "").html("Temp:" + data.Temperature); //#D
                  setTimeout(doPollTemp, 5000); //#E
                }
              );
            }
          );
          $(document).ready(function doPollHumid() {
            $.getJSON(
              "/things/" + item.thingID + "/properties/humidity", //#B
              function(data) {
                //#C
                console.log(data);
                $("#h-" + item.thingID + "").html("Humid:" + data.Humidity); //#D
                setTimeout(doPollHumid, 5000); //#E
              }
            );
          });

          output += '<div class="column">';
          output += '<div class="card">';
          output += "<h3>" + item.thingID + "</h3>";
          output += "<p>" + item.name + "</p>";
          output +=
            '<div><p font size="6" style="line-height:10px;"  id="t-' +
            item.thingID +
            '"><b></b></p></div>';
          output +=
            '<div><p font size="6" style="line-height:10px;"  id="h-' +
            item.thingID +
            '"></p><b></b></div>';
          output += "</div>";
          output += "</div>";
          break;

        // $.getJSON(
        //   "/things/" + item.thingID + "/properties/temperature",
        //   { data },
        //   processMyJson
        // );
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
