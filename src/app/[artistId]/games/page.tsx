import GameCard from "@/components/games/gameCard/GameCard";
import styles from "./games.module.scss";
import Link from "next/link";

const page = ({ params }: { params: { artistId: string } }) => {
    const { artistId } = params;
    return (
        <section className={styles.container}>
            <p className={styles.description}>
                Choisi sur quoi tu veux tester tes <span>connaissances</span> !
            </p>
            <GameCard
                title="Blindtest"
                link="blindtest"
                artistId={artistId}
                description="Pas de sons, que des mots. A toi de trouver le titre !"
            />
            <Link href={""} aria-disabled>
                <h2>COMING SOON</h2>
            </Link>
        </section>
    );
};

export default page;
