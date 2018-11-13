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

    let database = firebase.database();

    //event listener for user click of 'Add Train' button. Grabs user input values and adds data to firebase
    $("#addTrain").on("click", function (event) {
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
            frequency: frequency,
        });
    });

    


});


