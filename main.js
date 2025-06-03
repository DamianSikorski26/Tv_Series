let Buttons = document.querySelector(".filterContainer");
let grid = document.querySelector(".gridContainer");
let page = document.querySelector(".SinglePageInfo");
let pagination = document.querySelector(".pagination");



let pageNumber = 1;
let currentFilter;
let maxPages;

async function getData(filter){
    
    try{
    
    let response = await fetch(`https://api.themoviedb.org/3/tv/${filter}?api_key=6631e5f1dc96088e0d26b86da29b5b6a&page=${pageNumber}`);
    let data = await response.json();
    maxPages = data.total_pages;
    console.log("maxPages: " + maxPages);
    console.log(data);

    return data
    }
    catch(err){
        console.log(err);
    }
    
}

async function createPoster(serie){
    let div = document.createElement("div");
    div.classList.add('serieContainer');
    div.setAttribute('id',serie.id);

    let img = getImg(serie.poster_path);
    if(img == undefined){
        img = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-300x450.jpg';
    }
     
    div.innerHTML = `<h4>${serie.name}</h4>
            <div><img src="${img}" alt="img"></div>
            <div class=note >${serie.vote_average.toFixed(2)}/10</div>
            <div class=favoriteButton >add to favorite</div>
            `;
    grid.append(div);
}

function getImg(img_path) {
    
    return `https://image.tmdb.org/t/p/w500${img_path}?api_key=6631e5f1dc96088e0d26b86da29b5b6a`;
 
}

Buttons.addEventListener("click",async function(e){
    e.preventDefault();
    localStorage.clear();
    if (e.target.id == "Your_favorites"){

    }

    console.log(`New category : ${currentFilter != e.target.id}`);

    console.log("Before Page Number :" + pageNumber)
    if (currentFilter != e.target.id){
        currentFilter = e.target.id;
        pageNumber = 1;
        console.log("currentfilter :" + currentFilter);
        document.getElementById("Previous").disabled = true;
        document.getElementById("Previous").classList.add("disabledButton");
    }
    console.log("Current Page Number :" + pageNumber);

    

    
    let filter = e.target.id;
    let data = await getData(filter);
    grid.innerHTML = "";
    
    Buttons.querySelectorAll("button").forEach((e)=>{
        e.classList.remove("active");
    })
    e.target.classList.add("active");
    
    
    data.results.forEach((element) => {
        createPoster(element);
        storeObject(element);
       
        
    })
     

});

function storeObject(object){

    let content = JSON.stringify({
        img : object.poster_path,
        name: object.name,
        overview: object.overview,

    })
    localStorage.setItem(object.id,content);
}

grid.addEventListener("click",(e) => {
    e.preventDefault();
    if(e.target.closest(".serieContainer")){
        let id = e.target.closest(".serieContainer").id;
        console.log(id);
        let dataJson = localStorage.getItem(id);
        let data = JSON.parse(dataJson);
        page.innerHTML = "";
        createPage(data);
        page.classList.add("Move");
    
    
        }
   
})

function createPage(object){
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src",getImg(object.img));
    div.innerHTML = `
            <h4>${object.name}</h4>
            <p>${object.overview}</p>
            <span class=del>❌</span> `
    page.append(img,div);
}

page.addEventListener("click",(e) => {
    e.preventDefault();
    if(e.target.classList.contains("del")){
        
        page.classList.remove("Move");
    }
})


document.getElementById("airing_today").click();
     

pagination.addEventListener("click",(e) => {
    e.preventDefault();
    if (e.target.id == "Next"){
       pageNumber += 1;
    }

    if (e.target.id == "Previous"){
        pageNumber -= 1;
    }

    if (pageNumber == 1){
        document.getElementById("Previous").disabled = true;
        document.getElementById("Previous").classList.add("disabledButton");
    }
    else {
        document.getElementById("Previous").removeAttribute("disabled");
        document.getElementById("Previous").classList.remove("disabledButton");
    }

    if(pageNumber == maxPages){
        document.getElementById("Next").disabled = true;
        document.getElementById("Next").classList.add("disabledButton");
    }
    else {
        document.getElementById("Next").removeAttribute("disabled");
        document.getElementById("Next").classList.remove("disabledButton");
    }

    document.getElementById(currentFilter).click();
})







