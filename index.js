let b_url = `https://api.themoviedb.org/3/`;
let key = `?api_key=989e5b3786a1011309d985449bb65c5d`;
let d_endpoint = `discover/movie`;
let lang = "&la&with_original_language=hi"
let page = 1;
let api_url = b_url + d_endpoint + key + lang ;
let display = document.getElementById("movie_display");

getMovies(api_url, page);

function getMovies(api_url, page) {
  fetch(`${api_url}&page=${page}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      showall(data.results);
      pages(page);
    });
}

function changePage(p) {
  display.innerHTML = " ";
  getMovies(api_url, p);
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
  data.map((ele) => {
    display.innerHTML += `
      <div class="col-lg-3 col-md-6 col-sm-6" >
            <div class="card p-3" style="">
            <img src="https://image.tmdb.org/t/p/w500${ele.poster_path}" class="card-img-top img-fluid" alt="${ele.poster_path}">
            <div class="card-body">
                  <h5 class="card-title">${
                    ele.title || ele.original_title
                  }</h5>
                  <p class="card-text">🔥${ele.popularity}</p>
                  <a class="btn btn-primary">Download</a>
                </div>
              </div>
        </div>
  `;
  });
}
