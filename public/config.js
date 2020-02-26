$(function() {
  // $.getJSON("/things/api", updateFeedback);
  $.ajax({
    dataType: "json",
    url: "/things",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    success: updateFeedback
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
      updateFeedback
    );
  }); //feedback messages

  $(".remove-gpio-form").submit(function(e) {
    e.preventDefault();
    $.post(
      "/things/delete",
      {
        thingID: $("#thing-id").val()
      },
      updateFeedback
    );
  }); //feedback messages

  $(".feedback-messages").on("click", function(e) {
    if (e.target.className == "btn btn-success btn-just-icon") {
      $.ajax({
        url: "/things/" + e.target.id + "/properties/on",
        dataType: "json",
        type: "PUT",
        data: { on: "true" }
      }); //ajax
    } // the target is a delete button
  }); //feedback messages

  $(".feedback-messages").on("click", function(e) {
    if (e.target.className == "btn btn-danger btn-just-icon") {
      $.ajax({
        url: "/things/" + e.target.id + "/properties/on",
        dataType: "json",
        type: "PUT",
        data: { on: "false" }
      }); //ajax
    } // the target is a delete button
  }); //feedback messages

  function updateFeedback(data) {
    console.log(data);
    var output = "";

    $.each(data, function(key, item) {
      console.log(key);
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
