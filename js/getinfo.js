
let artistInfo;

async function getArtistInfo(artist) {
    // FIXME: Limit this to ~3 and pick whichever matches the query best
    // Otherwise, typing "Rainbow" gives "Rainbow Kitten Surprise"...
    const url = `https://api.spotify.com/v1/search?type=artist&q=${artist}&limit=1`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.json();
}

function toSpotifyPage() {
    const url = artistInfo.external_urls['spotify'];
    window.open(url);
}

async function getAlbums(artist_id) {
    // FIXME: fix case where number of albums is greater than the default limit (20)
    const url = `https://api.spotify.com/v1/artists/${artist_id}/albums?include_groups=single,album,compilation`
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
    artistInfo = await getArtistInfo(artist).then((data) => {
        console.log(data.artists.items[0]);
        return data.artists.items[0];
    });
    // Band name
    document.getElementById("band_name").innerHTML = artistInfo.name;
    document.getElementById("band_name").href = artistInfo.external_urls['spotify'];
    // Photo
    document.getElementById("photo").src = artistInfo.images[0].url;
    document.getElementById("photo").width = 300;
    document.getElementById("photo").height = 300;
    const albums = await getAlbums(artistInfo.id).then((data) => {
        console.log(data);
        return data.items;
    });
}

