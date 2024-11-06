const form = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inp = document.querySelector(".input-box");

const getmovienifo = async (movie) => {
  try{
    const myAPIkey = "ec790637";
  const APIurl = `https://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;
  const response = await fetch(APIurl);
  const data = await response.json();
  console.log(data);
  showmovie(data);
  }
  catch(error){
    showerror("no movie found !!")
  }
};
//function to show movie data on screen
showmovie = (data) => {
    movieContainer.innerHTML = ""
    movieContainer.classList.remove("no-bcg")
  //used objejet destructuring assignment to extract from data object
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info")
  movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>rating :&#11088</strong>${imdbRating}</p>`;

  const moviegenreelement = document.createElement("div");
  moviegenreelement.classList.add("genre-element");
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    moviegenreelement.appendChild(p);
  });
  movieElement.appendChild(moviegenreelement);
//   movieContainer.appendChild(movieElement);
  movieElement.innerHTML += `<p><strong>date :</strong> ${Released}</p>
                             <p><strong>duration :</strong> ${Runtime}</p>
                             <p><strong>cast :</strong> ${Actors}</p>
                             <p><strong>plot :</strong> ${Plot}</p>`;
                             

    const movieposter = document.createElement("div")
    movieposter.classList.add("movie-poster")
    movieposter.innerHTML = `<img src="${Poster}"/>`
    movieContainer.appendChild(movieposter)
    movieContainer.appendChild(movieElement);

};

//function to display error msg
const showerror = (messege) => {
  movieContainer.innerHTML = `<h2>${messege}</h2>`
  movieContainer.classList.add("no-bcg")
}

//handle form submission
const handleformsubmission = (e) => {
  e.preventDefault();
  const moviename = inp.value.trim();
  if (moviename !== "") {
    showerror("fetching movie name")
    getmovienifo(moviename);
  }

  else{
    showerror("please enter the movie name")
  }
}


form.addEventListener("submit", handleformsubmission)


