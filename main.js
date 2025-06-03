let Buttons = document.querySelector(".filterContainer");
let grid = document.querySelector(".gridContainer");
let page = document.querySelector(".SinglePageInfo");



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 6631e5f1dc96088e0d26b86da29b5b6a'
  }
};

async function getData(filter){
    
    try{
    let response = await fetch(`https://api.themoviedb.org/3/tv/${filter}?api_key=6631e5f1dc96088e0d26b86da29b5b6a`,options);
    let data =response.json();
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

    let img = await getImg(serie.poster_path);
    if(img == undefined){
        img = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-300x450.jpg';
    }
     
    div.innerHTML = `<h2>${serie.name}</h2>
            <img src="${img}" alt="img">`;
    grid.append(div);
}

async function getImg(img_path) {
    try{
    let response = await fetch(`https://image.tmdb.org/t/p/w500${img_path}?api_key=6631e5f1dc96088e0d26b86da29b5b6a`,options);
    let data =response.json();
    return data
    }
    catch(err){
        console.log(err);
    }
}

Buttons.addEventListener("click",async function(e){
    e.preventDefault();

    let filter = e.target.id;
    let data = await getData(filter);
    grid.innerHTML = "",
    data.results.forEach((element) => {
        createPoster(element);
    })

});





