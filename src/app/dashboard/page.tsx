import PostAlbum from "@/components/dashboardForm/PostAlbum";
import PostArtist from "@/components/dashboardForm/PostArtist";
import React from "react";
import styles from "./dashboard.module.scss";

const page = () => {
    return (
        <section className={styles.container}>
            <PostArtist />
            <PostAlbum />
        </section>
    );
};

export default page;
