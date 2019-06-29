// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD4eyKZ8P7imXXM2SHnbX1Val76m0L47HA",
    authDomain: "sid-train-project.firebaseapp.com",
    databaseURL: "https://sid-train-project.firebaseio.com",
    projectId: "sid-train-project",
    storageBucket: "",
    messagingSenderId: "345094144537",
    appId: "1:345094144537:web:6fc4081663a0613b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding Employees
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start = moment($("#start-input")).format("HH:mm");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: name,
        destination: destination,
        start: start,
        frequency: frequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var startTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;

    var toYearsConvert = moment(startTime, "HH:mm").subtract(1, "years");
    var timing = (moment().diff(moment(toYearsConvert), "minutes"));
    var myNumer = (timing % frequency);
    var minutesAway = (frequency - myNumer);
    var nextArrival = (moment().add((minutesAway), "minutes"));

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});