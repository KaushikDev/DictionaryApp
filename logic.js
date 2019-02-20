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
 $("document").ready(function(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++Function which decides what happens on searchBtn click. 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   $("#searchBtn").on("click", function(){
     
	clean();
	//$( "#displayArea" ).empty();
	headWord = document.getElementById("searchBox").value;
	console.log("The value in the box is : " + headWord);
	
	if(headWord!=""){
	
	
		
	baseUrlPearsonAPI=  base + "/v2/dictionaries/ldoce5/entries?headword=";
    completeUrl = baseUrlPearsonAPI + headWord + "&apikey=12nCr8Cz5m0wkpTgi3Pkh18Cd596Slga";

  //  console.log("The complete request URL is : " + completeUrl);
   
    
   $.getJSON(completeUrl, function(data){
     
	count = data.results.length;
	console.log("Number of results nodes are : "+ count);
//	console.log("the data obtained from api is : "+ JSON.stringify(data));
	if(count!=0){
	
     try{
	soundSource = ""+base+(data.results[0].pronunciations[0].audio[0].url);
    $("#displayArea").append("<div class='col-xs-12'><button class='btn' style='height:40px;width:height;border-radius:50%;' onclick='pronunciation(soundSource)'><i class='fa fa-volume-up' aria-hidden='true'></i></button></div>");
	}
	catch(e){
	 $("#displayArea").append("<div class='col-xs-12' style='color:red'><p><i class='fa fa-volume-off' aria-hidden='true'></i> Sound not available</p></div>");
	}
	
	try{
	$("#displayArea").append("<div class='col-xs-12'><p><b><i>Meaning : </i></b>"+data.results[0].senses[0].definition[0]+" </p></div>");
	}
	catch(e){
	$("#displayArea").append("<div class='col-xs-12'><p><b><i>Meaning : </i></b>"+data.results[1].senses[0].definition[0]+" </p></div>");
	}
	
	
	if(count>=2){
	$("#displayArea").append("<div class='col-xs-12'><p><b><u>Related words and their meanings  :   </u></b></p></div>");
	for(i=1;i<count;i++){
	try{
	result = data.results[i].senses[0].definition[0];
	headword = data.results[i].headword;
	$("#displayArea").append("<div class='col-xs-12'><p><b><i>"+headword+". </i></b>"+result+" </p></div>");
	}
	catch(e){
	console.log(e);
	}
	}}
	
	
}
else 
	$("#displayArea").append("<div class='col-xs-12 text-center'><p><b>Oops!! No meaning found for this word </b></p></div>");
   
 });
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//document.getElementById("searchBtn").disabled = true; 
 }
 else
 $("#displayArea").append("<div class='col-xs-12 text-center'><p><b>Enter a word to find its meaning!!</b></p></div>");
 });


//=======================================================================
});


function clean(){
$( "#displayArea" ).empty();
}

function pronunciation(src){
var audio = new Audio(src);
audio.play();
}