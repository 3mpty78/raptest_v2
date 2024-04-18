import Punchline from "@/components/games/Punchline";
import styles from "../blindtest/blindtest.module.scss";
import Covers from "@/components/games/Covers";

const page = ({ params }: { params: { artistId: string } }) => {
    const { artistId } = params;
    return (
        <section className={styles.container}>
            <p className={styles.description}>
                A quel projet correspond <br />
                cette <span>cover</span> ?
            </p>
            <Covers artistId={artistId} />
        </section>
    );
};

export default page;
