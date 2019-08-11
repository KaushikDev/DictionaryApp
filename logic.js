var ID;
var headWord;
var baseUrlPearsonAPI;
var completeUrl;
var count;
var para;
var i;
var result;
var headword;
var soundSource;

var base = "https://api.pearson.com";

//========================================================================
$("document").ready(function() {
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  $("#cover").on("click", function(){
	  document.getElementById("cover").style.visibility = "hidden";
	  document.getElementById("main").style.visibility = "visible";

  });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  $("#closeBtn").on("click", function(){
	document.getElementById("cover").style.visibility = "visible";
	document.getElementById("main").style.visibility = "hidden";

});
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++Function which decides what happens on searchBtn click.
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  $("#searchBtn").on("click", function() {
    clean();
    //$( "#displayArea" ).empty();
    headWord = document.getElementById("searchBox").value;
    console.log("The value in the box is : " + headWord);

    if (headWord != "") {
      baseUrlPearsonAPI = base + "/v2/dictionaries/ldoce5/entries?headword=";
      completeUrl =
        baseUrlPearsonAPI +
        headWord +
        "&apikey=12nCr8Cz5m0wkpTgi3Pkh18Cd596Slga";

      //  console.log("The complete request URL is : " + completeUrl);

      $.getJSON(completeUrl, function(data) {
        count = data.results.length;
        console.log("Number of results nodes are : " + count);
        //	console.log("the data obtained from api is : "+ JSON.stringify(data));
        if (count != 0) {
          try {
            soundSource =
              "" + base + data.results[0].pronunciations[0].audio[0].url;
            $("#displayArea").append(
              "<button id='sound-btn' onclick='pronunciation(soundSource)'><i class='fa fa-volume-up'></i></button>"
            );
          } catch (e) {
            $("#displayArea").append(
              "<button id='sound-btn'><i class='fa fa-volume-off'></i></button>"
            );
          }

          try {
            $("#displayArea").append(
              "<label class='label-class'>Meaning :</label><br><p class='para-class'>" +
                data.results[0].senses[0].definition[0] +
                ".</p>"
            );
          } catch (e) {
            $("#displayArea").append(
              "<label class='label-class'>Meaning :</label><br><p class='para-class'>" +
                data.results[1].senses[0].definition[0] +
                ".</p>"
            );
          }

          if (count >= 2) {
            $("#displayArea").append(
              "<label class='label-class'>Related words and their meanings :</label>"
            );
            for (i = 1; i < count; i++) {
              try {
                result = data.results[i].senses[0].definition[0];
                headword = data.results[i].headword;
                $("#displayArea").append(
                  "<label class='label-class'>" +
                    headword +
                    "</label><p class='para-class'>" +
                    result +
                    ".</p>"
                );
              } catch (e) {
                console.log(e);
              }
            }
          }
        } else $("#displayArea").append("<label class='label-class'>Oops!! No meaning found for this word.</label>");
      });
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //document.getElementById("searchBtn").disabled = true;
    } else
      $("#displayArea").append(
        "<label class='label-class'>Please type a word to find its meaning.</label>"
      );
  });

  //=======================================================================
});

function clean() {
  $("#displayArea").empty();
}

function pronunciation(src) {
  var audio = new Audio(src);
  audio.play();
}
