export async function fetchAlbums() {
    try {
        const albumsResponse = await fetch("/api/albums");
        const albumsData = await albumsResponse.json();

        return { albumsData };
    } catch (error) {
        console.error(error);
        alert("Erreur lors des fetch");
        throw error;
    }
}
