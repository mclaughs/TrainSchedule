var config = {
  apiKey: "AIzaSyB0vEDtC6OW-KPSzqyE5987kGuI3IgwO2c",
  authDomain: "trainschedule-f90f8.firebaseapp.com",
  databaseURL: "https://trainschedule-f90f8.firebaseio.com",
  projectId: "trainschedule-f90f8",
  storageBucket: "trainschedule-f90f8.appspot.com",
  messagingSenderId: "953756112484"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var dest = "";
var leaveTime = 0;
var frequency = 0;

$("#addTrain").on("click", function() {

    name      = $("#nameInput").val().trim();
    dest      = $("#destInput").val().trim();
    leaveTime = $("#leaveInput").val().trim();
    frequency = $("#freqInput").val().trim();

    database.ref().push({
        name: name,
        dest: dest,
        leaveTime: leaveTime,
        frequency: frequency,
        trainAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


database.ref().on("child_added", function(childSnapshot) {

    //time logic begins
    var firstTrain = childSnapshot.val().leaveTime;
    var frequency = childSnapshot.val().frequency;

    var firstTimeCoversion = moment(firstTrain, 'HH:mm').subtract(1, 'years');
    var current = moment();
    var diffTime = moment().diff(moment(firstTimeCoversion, 'HH:mm'), 'minutes');
    var timeRemaining = diffTime % parseInt(frequency);
    var minutesTillArr = parseInt(frequency) - timeRemaining;
    var nextTrain = moment().add(minutesTillArr, 'minutes').locale('en').format('HH:mm A')



    console.log('first time conv', firstTimeCoversion)
    console.log('current time', current)
    console.log('difference time', diffTime)
    console.log('time remaining', timeRemaining)

    a = $("<tr>")
    var b = $("<td>").html(childSnapshot.val().name);
    var c = $("<td>").html(childSnapshot.val().dest);
    // First train displayed only in testing.
    // var d = $("<td>").html(childSnapshot.val().leaveTime);
    var e = $("<td>").html(childSnapshot.val().frequency);
    var f = $("<td>").html(nextTrain)
    var g = $("<td>").html(minutesTillArr)
    a.append(b);
    a.append(c);
    // First train displayed only in testing.
    // a.append(d);
    a.append(e);
    a.append(f);
    a.append(g);
    $("#info").append(a)

});
