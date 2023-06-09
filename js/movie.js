(() => {
    fetch('https://tartan-leaf-yumberry.glitch.me/movies')
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    // $.ajax({
    fetch("https://tartan-leaf-yumberry.glitch.me/movies")
        .then(resp => resp.json()).then(data => {
        console.log(data);
        document.getElementsByClassName('row')[0].innerHTML = renderMovies(data)
    });

    function moviesRender(data) {
        let html = "";
        let htmlCSSClassesStr = `font-color-${data.id}`;
        html = '<div class="container d-flex justify-content-center col-12"></div>'
        html = '<div class="card text-center m-2 p-3 col-12 col-md-2">';
        html += `<div class=" title m-0"><h2> ${data.title} <h2/></div>`;
        html += `<span class="fs-6"> this is the rated ${data.rating} out of 5 stars </span>
        <a href="#" id= "editBtn" class="btn m-2 btn-success">Edit</a><a href="#" id="deleteBtn" class="btn m-2 btn-danger">Delete</a></div>`;
        html += '</div>';

        return html;
    }

    function renderMovies(dataSet) {
        let html = '';
        for (let i = 0; i < dataSet.length; i++) {
            html += moviesRender(dataSet[i]);
        }
        return html;
    }


    let userTitle = document.querySelector("#title");
    let userRating = document.querySelector("#rating");

   $('#refreshBtn').on('click', function (data){
       const movieEntry = {title: `${userTitle.value}`, rating: `${userRating.value}`};
       const url = "https://tartan-leaf-yumberry.glitch.me/movies";
       const options = {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(movieEntry),
       };
       fetch(url, options)
           .then(response => response.json())
           .then(data => document.getElementsByClassName('row')[0].innerHTML += moviesRender(data))
           .catch(/* handle errors */);
   })





})();




