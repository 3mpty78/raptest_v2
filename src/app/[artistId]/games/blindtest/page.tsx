import Punchline from "@/components/games/Punchline";

const page = ({ params }: { params: { artistId: string } }) => {
    const { artistId } = params;
    return (
        <section>
            <h2>Blindtest</h2>
            <Punchline artistId={artistId} />
        </section>
    );
};

export default page;
