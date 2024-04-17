/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./infos.module.scss";
import instaIcon from "../../../public/img/icons/instagram.svg";
import twitterIcon from "../../../public/img/icons/x.svg";
import Image from "next/image";
import Link from "next/link";

const SocialNetworks = [
    {
        instaIcon: instaIcon,
        instaLink: "https://instagram.com/3mpty.dev/",
        twitterIcon: twitterIcon,
        twitterLink: "https://twitter.com/just_3mpty",
    },
];

const page = () => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.rules}>
                    <h2>
                        C'est simple, y'a <span>2 jeux</span> :
                    </h2>
                    <ul>
                        <li>
                            Blindtest Lyrics : une punchline apparait, à toi de
                            trouver de quel <span>morceau</span> elle provient;
                        </li>
                        <li>
                            Devine la cover : Une cover floutée apparait, tu
                            dois trouver à quel <span>projet</span> elle
                            correspond;
                        </li>
                    </ul>
                </div>
                <div className={styles.report}>
                    <h2>
                        Pour me <span>soutenir</span> :
                    </h2>
                    <ul>
                        <li>
                            Hésites pas à me suivre sur <span>Insta</span> et{" "}
                            <span>Twitter</span> ! <br />
                            L'app est destinée à évoluer, donc si t'as des{" "}
                            <span>suggestions</span>, je suis preneur !
                        </li>
                        <li>
                            Si tu vois des erreurs, mentionne moi sur Insta ou
                            Twitter pour que je corrige.
                        </li>
                    </ul>
                </div>
                <div className={styles.socials}>
                    <h2>
                        Mes <span>réseaux</span>
                    </h2>
                    {SocialNetworks.map((hito, index) => (
                        <div key={index} className={styles.networks}>
                            <div>
                                <Link href={hito.instaLink} target="_blank">
                                    <Image
                                        src={hito.instaIcon}
                                        alt="Instagram Icon"
                                        width={30}
                                        height={30}
                                    />
                                </Link>
                                <Link href={hito.twitterLink} target="_blank">
                                    <Image
                                        src={hito.twitterIcon}
                                        alt="Instagram Icon"
                                        width={30}
                                        height={30}
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <p>A toi de jouer maintenant !</p>
                <Link href={"/artists"} target="_top" className={styles.btn}>
                    Découvrir !
                </Link>
            </section>
        </>
    );
};

export default page;
