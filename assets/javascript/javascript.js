//Javascript for Train-Scheduler - Week 7 Homework Assignment - UW Coding Bootcamp

$(document).ready(function(){


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAlFrxfNwtynGE24GyHzh3g_WT7P_cpng4",
    authDomain: "train-scheduler-6d7f0.firebaseapp.com",
    databaseURL: "https://train-scheduler-6d7f0.firebaseio.com",
    projectId: "train-scheduler-6d7f0",
    storageBucket: "train-scheduler-6d7f0.appspot.com",
    messagingSenderId: "867039645149"
  };

    firebase.initializeApp(config);
    console.log(firebase);

    let database = firebase.database();


    //event listener for user click of 'Add Train' button. Grabs user input values and adds data to firebase
    $("#addTrain").on("click", function(event) {
    event.preventDefault();

        //grab input values
        let trainName = $("#trainName").val().trim();
        let destination = $("#destination").val().trim();
        let firstTrainTime = $("#firstTrainTime").val().trim();
        let frequency = $("#frequency").val().trim();

        //create firebase variables, push data to firebase
        database.ref().push ({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });
        $("#userInputForm").trigger("reset");
    });

    //firebase event listener for new data. When new data is added to the database, function runs accordingly
    database.ref().on("child_added", function(childSnapshot) {

        let newTrain = childSnapshot.val().trainName;
        let newDestination = childSnapshot.val().destination;
        let newFirstTrainTime = childSnapshot.val().firstTrainTime;
        let newFrequency = childSnapshot.val().frequency;

        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        $("#tableBody").append (
            "<tr><td>" + newTrain +
            "</td><td>" + newDestination +
            "</td><td>" + newFrequency +
            "</td><td>" + "" +
            "</td><td>" + "" +
            "</td><td>" + "x" + "</td></tr>");
    },
    function (errorObject) {
        console.log("Errors handeled: " + errorObject.code);
    });

    
});


