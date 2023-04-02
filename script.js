//Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=17d6162809196615584c8d136415c4fd&query=${movieName}&page=1`;
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((d) => {
        data = d.results[0]
        if (!!data) {
          result.innerHTML = `
            <div class="info">
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="poster">
                <div>
                    <h2>${data.title}</h2>
                    <div class="rating">
                        <img src="bxs-star.svg">
                        <h4>${data.vote_average}</h4>
                    </div>
                    <div class="details">
                        <span>${data.vote_count}</span>
                        <span>${data.release_date}</span>
                    </div>
                    <div class="genre" id="genre">
                    </div>
                </div>
            </div>
            <h3>Description:</h3>
            <p>${data.overview}</p>
        `;
        } else {
          result.innerHTML = `<h3 class="msg">Sorry, We coundn't find something</h3>`;
        }
      })
      //If error occurs
      .catch((e) => {
        console.log(e)
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);