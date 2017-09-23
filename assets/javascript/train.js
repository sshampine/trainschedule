//Initial Firebase 

var config = {
    apiKey: "AIzaSyAhK6DkACOw69gKV-4rCYccDSJ4996MD8g",
    authDomain: "trainschedule-16945.firebaseapp.com",
    databaseURL: "https://trainschedule-16945.firebaseio.com",
    projectId: "trainschedule-16945",
    storageBucket: "",
    messagingSenderId: "887709715298"
  };
 firebase.initializeApp(config);

 var database = firebase.database();
 

//onClick event listening and capturing values from text field

$("#submit-data").on("click", function(event) {
	event.preventDefault();
	var trainName = $("#train").val().trim();
	var trainDestination = $("#destination").val().trim();
	var trainTime = $("#time").val().trim();
	var trainFrequency = $("#frequency").val().trim();

	//Schedule object that contacts train info
	var schedule = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	};

	//Pushes schedule objct to database
	database.ref().push(schedule);

	//Clears field values
	$("#train").val("");
	$("#destination").val("");
	$("#time").val("");
	$("#frequency").val("");

});

//Establishes connection to database
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	//Gets child snapshots from firebase and assigns to variables
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainFrequency = childSnapshot.val().frequency;
	var trainTime = childSnapshot.val().time;
	
	
	//Calculates time using moment.js
	var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % trainFrequency;
	var tMinuesTilTrain = trainFrequency - tRemainder;
	var nextTrain = moment().add(tMinuesTilTrain, "minutes");
	var nextTrainTime = moment(nextTrain).format("hh:mm A" );

	//Writes data to HTML
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" 
		+ trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + tMinuesTilTrain + "</td></tr>");

});

