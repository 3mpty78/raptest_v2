export async function fetchArtists() {
    try {
        const artistsResponse = await fetch("/api/artists");
        const artistsData = await artistsResponse.json();

        return { artistsData };
    } catch (error) {
        console.error(error);
        alert("Erreur lors des fetch");
        throw error;
    }
}
