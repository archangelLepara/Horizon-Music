const songList = document.getElementById('songList');
const audioPlayer = document.getElementById('audioPlayer');
const playerDiv = document.getElementById('player');
const currentSong = document.getElementById('currentSong');

let songs = []; // This will hold songs fetched from backend

// Fetch songs from backend
async function fetchSongs() {
    try {
        const response = await fetch('http://localhost:5000/songs'); // Replace with your deployed backend URL
        songs = await response.json();
        displaySongs(songs);
    } catch (err) {
        console.error('Error fetching songs:', err);
    }
}

// Display songs
function displaySongs(list) {
    songList.innerHTML = '';
    list.forEach((song, index) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <button onclick="playSong(${index})">Play</button>
        `;
        songList.appendChild(card);
    });
}

// Play a song
function playSong(index) {
    audioPlayer.src = songs[index].url;
    audioPlayer.play();
    playerDiv.style.display = 'flex';
    currentSong.textContent = `Now Playing: ${songs[index].title} - ${songs[index].artist}`;

    // Increment play count
    fetch(`http://localhost:5000/song/play/${songs[index].id}`, { method: 'POST' })
    .catch(err => console.error('Error updating play count:', err));
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        song.artist.toLowerCase().includes(e.target.value.toLowerCase())
    );
    displaySongs(filtered);
});

// Initial fetch
fetchSongs();
