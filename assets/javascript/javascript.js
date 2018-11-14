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

        let currentTime = moment();
        console.log(currentTime);

        //calculate the difference between the current time & 'newFirstTrainTime' using Unix timestamp & convert to minutes
        let timeDifference = moment().diff(moment().unix(newFirstTrainTime, "minutes"));
        console.log(timeDifference);

        //take the time difference & get the remainder value using modulus(%). Once remainder value is achieved, I can use that and subtract it from the frequency to calculate the minutes away for the next train.
        let remainder = timeDifference % newFrequency;
        console.log(remainder);

        //subracting the remainder value calculated above from the frequency value of the corresponding train will give me the minutes away for the next train arrival.
        let minutesAway = newFrequency - remainder;
        console.log(minutesAway);

        //adding minutesAway to the current time will give me the time the next train is due to arrive.  Then convert it to a standard time format.
        let nextArrival = moment().add(minutesAway, "m").format("hh:mm A");
        console.log(nextArrival);
        
        //on child_added event listener, once new data is added to firebase, script will add/append data to the HTML table based on corresponding logic above.
        $("#tableBody").append (
            "<tr><td>" + newTrain +
            "</td><td>" + newDestination +
            "</td><td>" + newFrequency +
            "</td><td>" + nextArrival +
            "</td><td>" + minutesAway +
            "</td><td>" + "x" + "</td></tr>");
      },
        //standard error handler
        function (errorObject) {
        console.log("Errors handeled: " + errorObject.code);
      });
  
      
  });


