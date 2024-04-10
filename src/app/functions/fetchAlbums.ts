export async function fetchAlbums() {
    try {
        const response = await fetch("/api/albums");
        const albumsData = await response.json();
        return { albumsData };
    } catch (error) {
        console.error(error);
    }
}
