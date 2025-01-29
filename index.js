let b_url = `https://api.themoviedb.org/3/`;
let key = `?api_key=989e5b3786a1011309d985449bb65c5d`;
let d_endpoint = `discover/movie`;
let lang = "&la&with_original_language=hi";
let e_gen = `&with_genres=`;
let genre = "genre/movie/list";
let p1 = 1;
let e_page = `&page=`;
let api_url = b_url + d_endpoint + key + e_gen + lang + e_page + p1;
let display = document.getElementById("movie_display");

getMovies(api_url);
function getMovies(api_url) {
  fetch(api_url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    showall(data.results);
    pages(data.page);
  });
}
genremenu(b_url + genre + key);
filt(`${ele.id}`)


function changePage(p) {
  let page_url = b_url + d_endpoint + key + lang + e_page + p;
  getMovies(page_url);
  console.log(p);
}

function pages(page) {
  document.getElementById("pagin").innerHTML = `
       <ul class="pagination mx-auto" style="width:fit-content">
        <li class="page-item"><a class="page-link" onclick="changePage(${
          page - 1
        })">Prev</a></li>
        <li class="page-item"><a class="page-link active">${page}</a></li>
    
        <li class="page-item"><a class="page-link" onclick="changePage(${
          page + 1
        })">Next</a></li>
      </ul>
  `;
}

function showall(data) {
  display.innerHTML = " ";
  data.map((ele) => {
    display.innerHTML += `
      <div class="col-lg-3 col-md-6 col-sm-6" >
            <div class="card p-3" style="">
            <img src="https://image.tmdb.org/t/p/w500${
              ele.poster_path
            }" class="card-img-top img-fluid" alt="${ele.poster_path}">
            <div class="card-body">
                  <h5 class="card-title">${ele.title || ele.original_title}</h5>
                  <p class="card-text">🔥${ele.popularity}</p>
                  <a class="btn btn-primary">Download</a>
                </div>
              </div>
        </div>
  `;
  });
}

function genremenu(genres) {
  fetch(genres)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.genres);
    });
}

function filt(id) {
  console.log(id)
  data.map((ele) => {
    filt.innerHTML += `
    <button class="btn btn-warning"></button>
`;
  });
}
