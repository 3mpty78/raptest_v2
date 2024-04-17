import styles from "./artistList.module.scss";
import Link from "next/link";
import Image from "next/image";
import artistData from "../../../public/artistsData.json";

export const FetchArtists = () => {
    return (
        <div className={styles.grid}>
            {artistData.map((artist) => (
                <Link
                    href={`/${artist._id}/games`}
                    target="_top"
                    key={artist._id}
                    className={styles.card}>
                    <div className={styles.artistImage}>
                        <Image src={artist.picture} alt={artist.name} fill />
                    </div>
                    <p>{artist.name}</p>
                </Link>
            ))}
        </div>
    );
};

export default FetchArtists;
