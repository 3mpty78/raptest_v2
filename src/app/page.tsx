/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/button/Button";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
    return (
        <main className={styles.main}>
            <h1>RAPTEST</h1>
            <p className={styles.slogan}>
                A quel point connais-tu tes rappeurs <span>préférés</span> ?
            </p>
            <Button link="/artists" text="Découvrir !" />
            <Link href="/infos" target="_top">
                Plus d'infos
            </Link>
            {/* ILLUSTRATION */}
        </main>
    );
}
