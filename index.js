let fix_genre = JSON.parse(localStorage.getItem("fix_genre")) || [];
let modal = JSON.parse(localStorage.getItem("each"));

let b_url = `https://api.themoviedb.org/3/`;
let key = `?api_key=989e5b3786a1011309d985449bb65c5d`;
let d_endpoint = `discover/movie`;
let search = "e.target.value";
let lang = "&la&with_original_language=hi";
let e_gen = `&with_genres=${fix_genre.join(",")}`;
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

function changePage(p) {
  let page_url = b_url + d_endpoint + key + e_gen + lang + e_page + p;
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
          <p class="card-text"> 💖${ele.popularity} | ${ele.release_date}</p>
                  <a class="btn btn-primary" onclick="each_movie(${
                    ele.id
                  })">more</a>
                  </div>
                  </div>
                  </div>
                  `;
  });
}

function each_movie(id) {
  localStorage.setItem("each", JSON.stringify(id));
  document.getElementById("modal").innerHTML = `
  
  `;
}

function genremenu(genres) {
  fetch(genres)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.genres);
      filt(data.genres);
    });
}

function filt(cata) {
  cata.map((ele) => {
    let filt = document.getElementById("filters");
    filt.innerHTML += ` <button class="btn btn-sm ${
      fix_genre.includes(ele.id) ? `btn-light` : `btn-outline-light`
    } my-2 gen"   onclick="catagory(${ele.id})">${ele.name}</button>`;
  });
}

document.getElementById("search").addEventListener("keyup", function (e) {
  let search = e.target.value;
  console.log(search);
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=989e5b3786a1011309d985449bb65c5d&query=${search}&page=${p}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      showall(data.results);
      pages(data.page);
    });
});

function catagory(id) {
  console.log(id);
  if (fix_genre.includes(id)) {
    fix_genre.splice(fix_genre.indexOf(id), 1);
  } else {
    fix_genre.push(id);
  }
  let g_url = b_url + d_endpoint + key + `&with_genres=${id}` + lang;
  console.log(g_url);

  localStorage.setItem("fix_genre", JSON.stringify(fix_genre));
  getMovies(g_url);

  location.reload();
}
