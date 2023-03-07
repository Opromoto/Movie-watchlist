const searchBtn = document.getElementById("search-btn")
const mainEl = document.getElementById("main")
const searchText = document.getElementById("input-el")

const WatchlistTextArr = ["Add to Watchlist", "Added", "Remove"]
let text = WatchlistTextArr[0]
let movieArray = []


let placeholderString = `
        <div class="film">
            <i class="fa fa-film" aria-hidden="true"></i>
            <p>Unable to find what you're looking for. Please try another search.</p>
        </div>
    `


document.addEventListener('click', e => {
    if(e.target === searchBtn) {
        searchMovie()
    }
    else if(e.target.dataset) {
        if(e.target.dataset.add) {
            addToWatchlist(e)
        }
    }
})


async function searchMovie() {
    if (searchText.value){
        movieArray = []
        let response = await fetch(`https://www.omdbapi.com/?apikey=fa19907d&s=${searchText.value}`)
        let data = await response.json()
        if(data.Response == "False"){
            alert(data.Error)
        }
        
        movieArray = []    
        mainEl.innerHTML = ""
        for(let movie of data.Search) {
            let response = await fetch(`https://www.omdbapi.com/?apikey=fa19907d&t=${movie.Title}`)
            let data = await response.json()


            movieArray.push(data)
            // data)
        }
        renderMovie(movieArray)
        
    } else {
        mainEl.innerHTML = placeholderString
    }

}

function renderMovie(arr) {
    arr.forEach((movie) => {
        mainEl.innerHTML += `
            <div class="movie" id="movie">
                <img src="${movie.Poster}" alt="">
                <div class="details">
                    <div class="name">
                        <h3>${movie.Title}</h3>
                        <h5><i class="fa fa-star" aria-hidden="true"></i>${movie.imdbRating}</h5>
                    </div>
                    <div class="info">
                        <h3>${movie.Runtime}</h3>
                        <h3>"${movie.Genre}"</h3>
                        <h3 class="rate" data-add="${movie.imdbID}"><i class="fa fa-plus-circle" aria-hidden="true" ></i> ${text}</h3>
                    </div>
                    <div class="plot">
                        <p>${movie.Plot}</p>
                    </div>
                </div>
            </div>  `
    })
    
     
}


// FOR Watchlist

let watchlistArray = []


const addToWatchlist = event => {
    for(let movie of movieArray) {
        if(movie.imdbID === event.target.dataset.add) {
            if(watchlistArray.find(item => item.imdbID == movie.imdbID )){
            } else {
                watchlistArray.push(movie)
                text = WatchlistTextArr[1]
                
                document.getElementById(movie.imdbID).innerHTML = `<i class="fa fa-plus-circle" aria-hidden="true" data-name="${movie.imdbID}"></i> ${text}`
                

            }
        }
    }
    saveWatchlist(watchlistArray)
}




const getWatchlistFromStorage = () => {
    if(JSON.parse(localStorage.getItem("myWatchlist"))) {
        watchlistArray =  JSON.parse(localStorage.getItem("myWatchlist"))
    } else {}
    

}

const saveWatchlist = arr => {
    arr = JSON.stringify(arr)

    localStorage.setItem("myWatchlist", arr)

    arr = JSON.parse(arr)

}

getWatchlistFromStorage(watchlistArray)

export { getWatchlistFromStorage, saveWatchlist }