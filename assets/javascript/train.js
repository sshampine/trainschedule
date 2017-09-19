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
 var time = moment();

 console.log(time);

$("#submit-data").on("click", function(event) {
	event.preventDefault();
	var trainName = $("#train").val().trim();
		//console.log(trainName);
	var trainDestination = $("#destination").val().trim();
		//console.log(trainDestination);
	var trainTime = $("#time").val().trim();
		//console.log(trainTime);
	var trainFrequency = $("#frequency").val().trim();
		//console.log(trainFrequency);

	var schedule = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	}

	database.ref().push(schedule);
	console.log(schedule.name)
	console.log(schedule.destination)
	console.log(schedule.time)
	console.log(schedule.frequency)
	//database.ref().set({
	//	train: trainName,
	//	destination: destination,
	//	time: trainTime,
	//	frequency: frequency
	//});
});
	database.ref().on("child_added", function(childSnapshot, prevChildKey){
		console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainFrequency = childSnapshot.val().frequency;
	var trainTime = childSnapshot.val().time;
	
	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFrequency);
	console.log(trainTime);

	var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
	console.log("first time: " + firstTimeConverted);

	var currentTime = moment();
	console.log("current time: " + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("different in time: " + diffTime);

	var tRemainder = diffTime % trainFrequency;
	console.log(tRemainder);

	var tMinuesTilTrain = trainFrequency - tRemainder;
	console.log("minutes til train: " + tMinuesTilTrain);

	var nextTrain = moment().add(tMinuesTilTrain, "minutes");
	console.log("arrival time", moment(nextTrain).format("hh:mm"));
	var nextTrainTime = moment(nextTrain).format("hh:mm");

	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" 
		+ trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + tMinuesTilTrain + "</td></tr>");

});

