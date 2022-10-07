var dayDisplayEl = $("#currentDay");
var saveBtn = $(".saveInfo");
var currentTime = moment().format();
var buttonIdToInputIdMap = {
    0: "9AM",
    1: "10AM",
    2: "11AM",
    3: "12PM",
    4: "1PM",
    5: "2PM",
    6: "3PM",
    7: "4PM",
    8: "5PM"
  };


function displayTime() {
    var today = moment().format("dddd, MMMM Do");
    dayDisplayEl.text(today);
} 

function renderColor(){
    var inputBoxes = $("input[name='plan']");

    for(var i = 0; i < inputBoxes.length; i++){
        var id = inputBoxes[i].id; 
        if (moment().isBefore(moment(id, 'hh:mm'))){
            $('#' + id).addClass("bg-success");
        } else if (moment().isAfter(moment(id, 'hh:mm'))){
            $('#' + id).removeClass("bg-danger").addClass("bg-secondary");
        } else{
            $('#' + id).removeClass("bg-success").addClass("bg-danger");
        }
    }
}

function saveNotes(event){
    event.preventDefault();
    var id = event.target.id;
    var inputBoxId = buttonIdToInputIdMap[id];
    var noteInfo = $('#' + inputBoxId).val(); 
    localStorage.setItem(id, noteInfo);
}

function renderNotes(){
    var inputBoxes = $("input[name='plan']");
    for (i = 0; i < inputBoxes.length; i++) {
        var element = inputBoxes[i];
        var storedNote = localStorage.getItem("" + i);
        if(storedNote !== null){
            $('#' + element.id).val(storedNote);  
        }
    }
}

displayTime();
renderNotes();
renderColor();

saveBtn.on("click", saveNotes);