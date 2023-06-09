(() => {
    fetch('https://tartan-leaf-yumberry.glitch.me/movies')
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    let userEditTitle = document.querySelector('#editTitle')
    let userEditRating = document.querySelector('#editRating')

    // $.ajax({
    fetch("https://tartan-leaf-yumberry.glitch.me/movies")
        .then(resp => resp.json()).then(data => {
        console.log(data);
        document.getElementsByClassName('row')[0].innerHTML = renderMovies(data)
        attachListeners(data);
    });

    function attachListeners(data){
        console.log(data)
        data.forEach(function(movie){
            $(`#editBtn-${movie.id}`).on("click", function(e){
                e.preventDefault()
                console.log(document.getElementById(`movie-title-${movie.id}`).innerText);
                console.log(document.getElementById(`movie-rating-${movie.id}`).innerText);
                const url = `https://tartan-leaf-yumberry.glitch.me/movies/${movie.id}`;
                const options = {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title: `${userEditTitle.value}`, rating: `${userEditRating.value}`}),
                };
                fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        $(`#${data.id}`).replaceWith(updateMovies(data))
                        // document.getElementsByClassName('row')[0].innerHTML += updateMovies(data)
                    })
                    .catch(/* handle errors */);
            })
        })
    }

    function moviesRender(data) {
        let html = "";
        html = `<div id="${data.id}" class="card text-center m-2 p-3 col-12 col-md-2">`;
        html += `<div class=" title m-0" id="movie-title-${data.id}"><h2> ${data.title} <h2/></div>`;
        html += `<span class="fs-6" id="movie-rating-${data.id}"> this is the rated ${data.rating} out of 5 stars </span>
        <a href="#" id="editBtn-${data.id}" class="btn m-2 btn-success">Edit</a><a href="#" id="deleteBtn-${data.id}" class="btn m-2 btn-danger">Delete</a></div>`;
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

    function updateMovies(data){
        return moviesRender(data);
    }


    let userTitle = document.querySelector("#title");
    let userRating = document.querySelector("#rating");

    $('#refreshBtn').on('click', function (data) {
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