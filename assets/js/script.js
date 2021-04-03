var userPrompt = 0;
var promptArray = [
    "A houseplant is dying. Tell it why it needs to live.",
    "Write a social media status update for New Years 50 years from now.",
    "You're an astronaut. Describe your perfect day.",
    "How a cat sees the world",
    "You're a fortune teller. Tell your favorite protagonist or villian their future."
];

document.getElementById("nextPrompt").onclick = function () {nextPromptBtn()}

var nextPromptBtn = function() {
    document.getElementById('prompt').innerHTML = promptArray[userPrompt];
    
    //document.getElementById.InnerConnect = promptArray[userPrompt].prompt;
    userPrompt++
    if (userPrompt === 5) {
      userPrompt=0;
    } 
};

var saveBtnEl = document.querySelector("#saveBtn");
var savedEntriesEl = document.querySelector("#savedEntries");
// var dateEl = document.querySelector("#date");
// var today = new(Date);
// var dateVar = today.toString();

// var saveEntry = function() {
//   localStorage.setItem(dateVar, JSON.stringify(userEntry));
// };

var createEntry = function(entryDiv, entryHead, entryP) {
  // get the user entry and make it into string object
  var userEntry = document.getElementById("userEntry").value.toString();
  
  // create div element in the saved entries section 
  var entryDiv = $("<div>").addClass("card col");
  savedEntriesEl.append(entryDiv);

  var entryHead = $("<h4>").addClass("card-title left col-9");
  var entryP = $("<p>").addClass("card-text left").text(userEntry);
  entryDiv.append(entryHead, entryP);
  console.log(entryHead);
  console.log(entryP);
  console.log(entryDiv);
  
  // saveEntry();
};

saveBtnEl.addEventListener("click", createEntry);

// var saveButtonHandler = function() {
//   // get the user entry and make it into string object
//   var userEntry = document.getElementById("userEntry").value.toString();