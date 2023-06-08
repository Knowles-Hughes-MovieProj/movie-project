(() => {
    fetch('https://tartan-leaf-yumberry.glitch.me/movies')
    .then(resp => resp.json())
    .then(data=>console.log(data))
    .catch(error => console.error(error));

    $.ajax({
        url: 'https://tartan-leaf-yumberry.glitch.me/movies',
        method: 'GET',
        success: function(response){
           var moviesHTML = '';
            for (var i = 0; i < response.length; i++) {
                var movie = response[i];
                moviesHTML += '<div><img src="..." class="card-img-top" alt="..."><h3>' + movie.title + '</h3><p>Rating: ' + movie.rating + '</p></div>';
            }

            $('#movies').html(moviesHTML);
        }
    })
})();




