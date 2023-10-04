const accessKey="gDDKyzo45ADGYCqMDtplVIslcTEOekURIr0pbkzaaXA";

const forms = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");
let inputData="";
let page=1;
async function showImages(){
    inputData=searchInput.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    var response= await fetch(url);
    var data= await response.json();
    var results = data.results;
    if (page==1){
        searchResults.innerHTML=" "
    }
    results.map((result) => {
        const imagewrapper=document.createElement("div");
        imagewrapper.classList.add("search-result");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imagelink=document.createElement("a");
        imagelink.href=result.links.html;
        imagelink.target="_blank"
        imagelink.textContent=result.alt_description;

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imagelink);
        searchResults.appendChild(imagewrapper);

    });
    page++;
    if(page>1){
        showMoreBtn.style.display="block";
    }
}
forms.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    showImages();
  });
showMoreBtn.addEventListener("click", () => {
    showImages();
  });
