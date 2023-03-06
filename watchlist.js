import { getWatchlistFromStorage, saveWatchlist } from "./index.js"

const listEl = document.getElementById("list")

let watchlistArray = []
getWatchlistFromStorage()

watchlistArray = JSON.parse(localStorage.getItem("myWatchlist"))


document.addEventListener('click', e => {
    if(e.target.dataset) {
       if(e.target.dataset.remove) {
            removeFromWatclist(e)
        }
    } 
})

const renderToWatchlist = arr => {
    if(watchlistArray.length) {
        listEl.innerHTML = ""
        arr.forEach(movie => {
            listEl.innerHTML += `
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
                            <h3 class="rate" id="remove${movie.imdbID}"><i class="fa fa-minus-circle" aria-hidden="true" data-remove="${movie.imdbID}"></i> Remove</h3>
                        </div>
                        <div class="plot">
                            <p>${movie.Plot}</p>
                        </div>
                    </div>
                </div>  `
        })
    }

    
     
}

const removeFromWatclist = event => {

    watchlistArray = watchlistArray.filter(item => item.imdbID !== event.target.dataset.remove)
   
    renderToWatchlist(watchlistArray)
    saveWatchlist(watchlistArray)
}

renderToWatchlist(watchlistArray)