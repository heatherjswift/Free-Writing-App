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

var entries = [];

document.getElementById("savebutton").onclick = function() {saveEntry(), recallEntry()};

//save entry into localstorage
var saveEntry = function() {
    //moment js to determine current date and time
    var date = moment().format("MMMM Do YYYY, h:mm a");
    //setting the entries date, text value and prompt used
    entryDate = date;
    entryText = document.getElementById("textarea").value.trim();
    entryPrompt = document.getElementById("prompt").innerHTML.trim();

    //saving to localstorage as a nested array
    entryInfo = {date: entryDate, text: entryText, prompt: entryPrompt};
    entries.push(entryInfo);
    localStorage.setItem("entries", JSON.stringify(entries));

    //recalling the entry onto the screen
    document.getElementById("recalledtext").innerHTML = entryText;
    var dateEl = document.getElementById("date");
    var dateNode = document.createTextNode(date);
    dateEl.appendChild(dateNode);
    document.getElementById("prompt-used").innerHTML = entryPrompt;
};

//display saved entry
// var recallEntry = function() {
//     var entries = JSON.parse(localStorage.getItem("entries"));
//     console.log(entries);

//     //if nothing in localstorage
//     if (!entryKey) {
//         entryInfo = {
//             date: [],
//             text: [],
//             prompt: [],
//         };
//     }
// };

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
        pic.innerHTML = `<img src=${photo.src.medium}>
            <p>Photo by: ${photo.photographer}</p>
            <a href=${photo.src.medium}>Download</a>        
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
        pic.innerHTML = `<img src=${photo.src.medium}>
            <p>Photo : ${photo.photographer}</p>
            <a href=${photo.src.medium}>Download</a>        
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
    console.log("hello")
});

function clear() {
    input.value="";
    document.querySelector(".gallery").innerHTML = "";
    pagenr = 1;
    console.log("hello 2")
}

curatedPhotos(pagenr);
