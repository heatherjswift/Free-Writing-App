//get prompts
var userPrompt = 0;
var promptArray = [
    "A houseplant is dying. Tell it why it needs to live.",
    "Write a social media status update for New Years 50 years from now.",
    "You're an astronaut. Describe your perfect day.",
    "How a cat sees the world.",
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

//save prompts
document.getElementById("savebutton").onclick = function () {saveText(), recallText()}

var saveText = function() {
    textToSave = document.getElementById("textarea").value;
    localStorage.setItem("savedtext", textToSave);
}

var recallText = function () {
    document.getElementById('recalledtext').innerHTML =
    localStorage.getItem("savedtext");
}


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
            document.querySelector(".gallery").appendChild(pic);
            
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
            document.querySelector(".gallery").appendChild(pic);
            
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

