

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
        const artistInfo = data.artists.items[0];
        return artistInfo;
    });
    document.getElementById("band_name").innerHTML = artistInfo.name;
    document.getElementById("photo").src = artistInfo.images[0].url;
}