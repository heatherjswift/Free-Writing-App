//get prompts
var userPrompt = 0;
var promptArray = [
    "Five things that always get you into trouble.",
    "A houseplant is dying. Tell it why it needs to live.",
    "Write a social media status update for New Years 50 years from now.",
    "You're an astronaut. Describe your perfect day.",
    "How a cat sees the world.",
    "You're a fortune teller. Tell your favorite protagonist or villian their future."
];

document.getElementById('prompt').innerHTML = promptArray[userPrompt];
document.getElementById("nextPrompt").onclick = function () {nextPromptBtn()}

var nextPromptBtn = function() {
    userPrompt++;
    document.getElementById('prompt').innerHTML = promptArray[userPrompt];
    
    if (userPrompt === 5) {
      userPrompt=-1;
    } 
};

//word api
function fetchWords() {
    $.get( "https://api.datamuse.com/words?rel_jjb=emotion&topics=self&max=10", {mode:"no-cors"}, function( data ) {
        $( ".result" ).html( data );
        console.log(data);
    })
};
fetchWords();

//saved entries functionality: localstorage + dynamically created DOM
var entries = [];
var savedEntriesWrapperEl = document.querySelector("#savedEntriesWrapper");
// moment js to determine current date and time
var date = moment().format("MMMM Do YYYY, h:mm a");

var createEntry = function(entryDate, entryText, entryPrompt) {  
    // creating entry card container div element
    var entryCardEl = document.createElement("div");
    $(entryCardEl)
        .addClass("card col")
        .attr("id", "saved-stories");
    savedEntriesWrapperEl.append(entryCardEl);    
    
    // creating date and another nester container element
    var dateEl = document.createElement("div");
    $(dateEl)
        .addClass("card-header left")
        .attr("id", "date")
        .attr("type", "date")
        .text(entryDate);
    var entryTextWrapEl = document.createElement("div");
    $(entryTextWrapEl).addClass("card-body left");
    entryCardEl.append(dateEl, entryTextWrapEl);

    // creating heading and text entry elements
    var promptEl = document.createElement("h4");
    $(promptEl)
        .addClass("card-title left col-9")
        .attr("id", "prompt-used")
        .text(entryPrompt);
    var entryTextEl = document.createElement("p");
    $(entryTextEl)
        .addClass("card-text left col-12")
        .attr("id", "recalledtext")
        .text(entryText);
    entryTextWrapEl.append(promptEl, entryTextEl);
};

// save entry into localstorage
var saveEntry = function() {
    localStorage.setItem("entries", JSON.stringify(entries));
};

// display saved entries
var recallEntry = function() {
    var savedEntries = JSON.parse(localStorage.getItem("entries"));
    //if nothing in localstorage, create placeholder element, if else create elements with saved entries
    if (!savedEntries) {
        var entryInfo = {
            date: ["Your Date of Last Entry"],
            text: ["Your saved entries will be stored here. You can come back to see them anytime :)"],
            prompt: ["Your Prompt Used"],
        };
        createEntry(entryInfo.date, entryInfo.text, entryInfo.prompt);
    } else {
        entries = [];
        for (var i = 0; i < savedEntries.length; i++) {
            entries.push(savedEntries[i]);
        }
        for (var i = 0; i < entries.length; i++) {
            createEntry(entries[i].date, entries[i].text, entries[i].prompt);
        };
    }
    console.log(savedEntries);
    console.log({entries});
};

// eventListener for save button
document.getElementById("savebutton").onclick = function() {
    //setting the entries date, text value and prompt used
    var entryDate = date;
    var entryText = document.getElementById("textarea").value.trim();
    var entryPrompt = document.getElementById("prompt").innerHTML.trim();
    var entryInfo = {date: entryDate, text: entryText, prompt: entryPrompt}
    entries.push(entryInfo);
    saveEntry();
    console.log(entries);
    $("#savedEntriesWrapper").empty();
    recallEntry();
};
recallEntry();

//image api
const auth = "563492ad6f917000010000010f961d1f70664d678d52b8dfdfbf0c08";
const input = document.querySelector('input')
const searchbutton = document.querySelector('.searchbutton');

let pagenr= 1;
let search = false;
let query="";

input.addEventListener("input",(e)=> {
    e.preventDefault();
    query=e.target.value;
});

async function curatedPhotos(pagenr) {
    const data= await fetch(`https://api.pexels.com/v1/curated?per_page=10&page=${pagenr}`, {
        method:"GET", 
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    } );
    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML = `<a href=${photo.src.medium}><img src=${photo.src.medium}></a>
            <p>Photo by: ${photo.photographer}</p>       
            `;
            document.querySelector("#inspImgs").appendChild(pic);
            
    });
}

async function searchPhotos(query, pagenr) {
    const data= await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${pagenr}`, {
        method:"GET", 
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    } );
    const result = await data.json();
    result.photos.forEach((photo) => {
        const pic = document.createElement("div");
        pic.innerHTML = `<a href=${photo.src.medium}><img src=${photo.src.medium}></a>
            <p>Photo by: ${photo.photographer}</p>      
            `;
            document.querySelector("#inspImgs").appendChild(pic);
            
    });
}

searchbutton.addEventListener("click", () => {
    if(input.value === "")return;
    clear();
    search = true;
    searchPhotos(query, pagenr);
    pagenr++;
});

function clear() {
    input.value="";
    document.querySelector(".gallery").innerHTML = "";
    pagenr = 1;
}

curatedPhotos(pagenr);

//timer(s)

function startTimer() {
    var fiveMinute = 60 * 5,
    display = document.querySelector('#time');
    beginTime(fiveMinute, display);
    startFiveBtn.classList.add('hide')
}

function beginTime(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}
var startFiveBtn = document.getElementById('5-min-btn');

startFiveBtn.addEventListener('click', startTimer);
