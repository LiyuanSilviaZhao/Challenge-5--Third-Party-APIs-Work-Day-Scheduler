var dayDisplayEl = $("#currentDay");
var saveBtn = $(".saveInfo");
var planNoteInfo =$(".input-box");
var currentTime = moment().format();

function displayTime() {
    var today = moment().format("dddd, MMMM Do");
    dayDisplayEl.text(today);
} 

function renderColor(){
    var inputBoxes = $("input[name='plan']");
    console.log("printing inputBoxes");
    console.log(inputBoxes);


    for(var i = 0; i < inputBoxes.length; i++){
        var id = inputBoxes[i].id; 
        console.log(id)
        if (moment().isBefore(moment(id, 'hh:mm'))){
            console.log('in is before')
            $('#' + id).addClass("bg-success");
        } else if (moment().isAfter(moment(id, 'hh:mm'))){
            console.log('in is after')
            $('#' + id).removeClass("bg-danger").addClass("bg-secondary");
        } else{
            console.log('in is else')
            $('#' + id).removeClass("bg-success").addClass("bg-danger");
        }
    }
}

function determineTimeString(id) {
    if (id < 12 && id > 8) {
        return id + 'AM';
    }
    return id + 'PM';
}

function saveNotes(event){
    event.preventDefault();
    var id = event.target.id;
    console.log('save event id' + id);
    var noteInfo = $('input[name = "plan"]').val(); 
    localStorage.setItem(id, noteInfo);
}

function renderNotes(){
    var inputBoxes = $("input[name='plan']");
    for (i = 0; i < inputBoxes.length; i++) {
        var element = inputBoxes[i];
        console.log(element);
        var storedNote = localStorage.getItem("" + i);
        console.log('stored note: ' + storedNote)
        if(storedNote !== null){
            // element.text(storedNote);    
        }
    }
}

displayTime();
renderNotes();
renderColor();

saveBtn.on("click", saveNotes);