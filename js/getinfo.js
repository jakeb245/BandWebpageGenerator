

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

async function showArtistInfo() {
    // run on 'search' button click
    const artist = document.getElementById('artist').value;
    const artistInfo = await getArtistInfo(artist).then((data) => {
        console.log(data.artists.items[0]);
        return data.artists.items[0];
    });
    // Band name
    document.getElementById("band_name").innerHTML = artistInfo.name;
    // Photo
    document.getElementById("photo").src = artistInfo.images[0].url;
    document.getElementById("photo").width = 300;
    document.getElementById("photo").height = 300;
    // Link to Spotify page
    document.getElementById("spotify_link").innerHTML = `View ${artistInfo.name} on Spotify`;
    document.getElementById("spotify_link").href = artistInfo.external_urls['spotify'];
}