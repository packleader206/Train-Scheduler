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

      //displays current time in Jumbotron using moment function & sets time format
      $("#timeDisplay").text(moment().format("hh:mm A"));
  
  
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
          //resets form, clears out the form fields for next input
          $("#userInputForm").trigger("reset");
      });
  
      //firebase event listener for new data. When new data is added to the database, function runs accordingly
      database.ref().on("child_added", function(childSnapshot) {
        
        //set up variables for childSnapshot function of user inputs. Sets variables to reference the most recent child added to firebase.
        let newTrain = childSnapshot.val().trainName;
        let newDestination = childSnapshot.val().destination;
        let newFirstTrainTime = childSnapshot.val().firstTrainTime;
        let newFrequency = childSnapshot.val().frequency;

        console.log(newTrain);
        console.log(newDestination);
        console.log(newFirstTrainTime);
        console.log(newFrequency);

        //variable for current time using moment function
        let currentTime = moment();
        console.log(currentTime);

        //convert user input/child snapshot for newFirstTrainTime to exactly 1 year prior to ensure that entry is before the present day/time.
        let startTimeConverted = moment(newFirstTrainTime, "hh:mm").subtract(1, "years");
        console.log(startTimeConverted);
        
        //calculate the difference between the current time and the newFirstTrainTime in minutes
        let timeDifference = moment().diff(moment(startTimeConverted), "minutes");
        console.log(timeDifference);
        
        //take the timeDifference and calculate the remainder value using modulus(%). Once remainder value is achieved, I can use that and subtract it from the frequency to calculate the minutes away for the next train.
        let remainder = timeDifference % newFrequency;
        console.log(remainder);

        //subtracting the remainder value calculated above from the frequency value of the corresponding train will give me the minutes away for the next train arrival.
        let minutesAway = newFrequency - remainder;
        console.log(minutesAway);

        //adding minutesAway to the current time will give me the time the next train is due to arrive. Then convert it to a standard time format.  
        let nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
        console.log(nextArrival);

        //variable created to associate the delete button with corresponding data set in firebase
        let key = childSnapshot.key;
        console.log(key);

        //using the on child_added event listener, once new data is added to firebase, use JQuery below to add/append data to the HTML table based on corresponding logic above.
        $("#tableBody").append (
            "<tr><td class='text-center'>" + newTrain +
            "</td><td class='text-center'>" + newDestination +
            "</td><td class='text-center'>" + newFrequency +
            "</td><td class='text-center'>" + nextArrival +
            "</td><td class='text-center'>" + minutesAway +
            "</td><td class='text-center'><button class='delete btn btn-danger btn-xs' data-key='" + key + "'>X</button></td></tr>")
      },
        //standard error handler
        function (errorObject) {
        console.log("Errors handeled: " + errorObject.code);
      });

      //event listener for user click of any delete button, deletes corresponding data from firebase, then reloads firebase data (with the deleted record removed).
      $(document).on("click", ".delete", function() {
        keyRef = $(this).attr("data-key");
        database.ref().child(keyRef).remove();
        window.location.reload();
      });   
  });


