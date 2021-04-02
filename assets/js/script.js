document.getElementById("nextPrompt").onclick = function () {nextPromptBtn()}

var nextPromptBtn = function() {

    for (var i=0; i < promptArray.length; i++)   
    promptArray();
};

var promptArray = [
    {
        prompt: "A houseplant is dying. Tell it why it needs to live."
    },
    {
        prompt: "Write a social media status update for New Years 50 years from now."
    },
    {
        prompt: "You're an astronaut. Describe your perfect day."
    },
    {
        prompt: "A man giving a speech to a crowd of thousands is suddenly caught in a bald-faced lie. What does he do?"
    },
    {
        prompt: "You're a fortune teller. Tell your favorite protagonist or villian their future."
    }
];
