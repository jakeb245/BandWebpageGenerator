

async function getArtistInfo(artist) {

    let url = `https://api.spotify.com/v1/search?type=artist&q=${artist}&limit=1`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.json();
}

function showArtistInfo() {
    // run on 'search' button click
    const artist = document.getElementById('artist').value;
    console.log(artist);
    document.getElementById("band_name").innerHTML = artist;
    getArtistInfo(artist).then((data) => {
        console.log(data);
    });
    //document.getElementById('artist_image').src = img;
}