const apiKey = "acVRxcc3hiyp0QNk1r94euGobPaAc3mAq5GyNmzCTkI"
const formEl= document.querySelector("form")
const inputEl = document.querySelector("#search-input")
const resultsEl = document.querySelector(".search-results")
const buttonPlusEl = document.querySelector("#more-button")

let inputData="";
let page = 1;

async function search(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`
    const reponse = await fetch(url);
    const data = await reponse.json();

    if(page === 1){
        resultsEl.innerHTML = "";
    }

    let results = data.results;
    results.map((result) =>{
        const immageWrapper = document.createElement("div");
        immageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        immageWrapper.appendChild(image);
        immageWrapper.appendChild(imagelink);
        resultsEl.appendChild(immageWrapper);
    })
    page++;
    if(page>1){
        buttonPlusEl.style.display = "block";
    }
    
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    search();
   
});

buttonPlusEl.addEventListener("click", () => {
    search();
});