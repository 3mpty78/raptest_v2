/* eslint-disable react/no-unescaped-entities */
import FetchArtists from "@/components/artists/FetchArtists";
import styles from "./artists.module.scss";

const page = () => {
    return (
        <div className={styles.container}>
            <p className={styles.description}>
                Dans un premier temps, <br />
                choisi <span>l'artiste</span> !
            </p>
            <FetchArtists />
        </div>
    );
};

export default page;
