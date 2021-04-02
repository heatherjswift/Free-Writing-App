var userPrompt = 0;
var promptArray = [
    "A houseplant is dying. Tell it why it needs to live.",
    "Write a social media status update for New Years 50 years from now.",
    "You're an astronaut. Describe your perfect day.",
    "A man giving a speech to a crowd of thousands is suddenly caught in a bald-faced lie. What does he do?",
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
