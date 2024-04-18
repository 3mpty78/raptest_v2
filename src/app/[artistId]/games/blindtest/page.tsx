import Punchline from "@/components/games/Punchline";
import styles from "./blindtest.module.scss";

const page = ({ params }: { params: { artistId: string } }) => {
    const { artistId } = params;
    return (
        <section className={styles.container}>
            <p className={styles.description}>
                De quel morceau <br />
                proviennent ces <span>lyrics</span> ?
            </p>
            <Punchline artistId={artistId} />
        </section>
    );
};

export default page;
