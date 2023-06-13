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
        attachListeners(data) || deleteMovies(data);
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWFhOGJiMDI3NDlmZDMyMTIyM2M1YzQ0ZDM5MTZhNyIsInN1YiI6IjY0ODc1NDY3YzAzNDhiMDEwMjc5NGEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OD-DXdD7K1vycWb302wh353dxEIEoS-_0ymaQ8_GXZU'
        }
    };


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

    $('#refreshBtn').on('click', function (data) {
        data.preventDefault()
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
                    })
                    .catch(/* handle errors */);
            })
        })
    }

    function deleteMovies(data){
        console.log(data)
        data.forEach(function(movie){
            $(`#deleteBtn-${movie.id}`).on("click", function(e){
                e.preventDefault()
                console.log(document.getElementById(`movie-title-${movie.id}`).innerText);
                console.log(document.getElementById(`movie-rating-${movie.id}`).innerText);
                const url = `https://tartan-leaf-yumberry.glitch.me/movies/${movie.id}`;
                const options = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                };
                fetch(url, options)
                    .then(()=> fetch("https://tartan-leaf-yumberry.glitch.me/movies"))
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        document.getElementsByClassName('row')[0].innerHTML = renderMovies(data);
                    })
                    .catch(/* handle errors */);
            })
        })
    }

    function moviesRender(data) {
        let html = "";
        html = `<div id="${data.id}" class="card border-5 border-warning text-center m-3 p-3 col-12 col-md-2">`;
        html += `<img id="poster-${data.id}"  alt="">`
        html += `<div class=" title m-0" id="movie-title-${data.id}"><h2> ${data.title} <h2/></div>`;
        html += `<span class="fs-6" id="movie-rating-${data.id}">${data.rating}/5 Rating</span>
        <a href="#" id="editBtn-${data.id}" class="btn m-2 btn-success">Edit</a><a href="#" id="deleteBtn-${data.id}" class="btn m-2 btn-danger">Delete</a></div>`;
        html += '</div>';
        console.log(data)
        fetch(`https://api.themoviedb.org/3/search/movie?query=${data.title}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                response.results.forEach(function(movie) {
                    if (movie.title === data.title && movie.vote_count > 500 && movie.poster_path !== null) {
                        $(`#poster-${data.id}`).attr(`src`, `https://image.tmdb.org/t/p/original${movie.poster_path}`)
                        console.log(movie.title)
                        console.log(movie.poster_path)
                    }
                })
            })
            .catch(err => console.error(err));
        return html;
    }

    $(document).ready(function() {
            $('#loadingImg').show();
            $.ajax({
                url: "https://tartan-leaf-yumberry.glitch.me/movies",
                success: function(data) {
                    console.log(data);
                    $('#loadingImg').hide();
                }
            });
    });



    let userTitle = document.querySelector("#title");
    let userRating = document.querySelector("#rating");
    let userEditTitle = document.querySelector('#editTitle')
    let userEditRating = document.querySelector('#editRating')
})();