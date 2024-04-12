/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./credits.module.scss";
import Link from "next/link";
import Image from "next/image";

import empty from "../../../public/img/3mpty.png";
import loz from "../../../public/img/loz.jpg";
import insta from "../../../public/img/instagram.svg";
import twitter from "../../../public/img/x.svg";

const page = () => {
    return (
        <section className={styles.container}>
            <h1>Raptest team</h1>

            <p className={styles.description}>
                Si l'app te plait, hésite pas à nous follow ! Je te laisse nos{" "}
                <span>réseaux</span> juste en dessous
            </p>
            <p className={styles.description}>
                Et si t'as des idées pour des améliorations, corrections ou
                quoi, mentionne moi sur <span>Insta ou twitter</span> !
            </p>
            <p className={styles.description}>Bisous !</p>
            <div className={styles.category}>
                <h2>Dev & design</h2>
                <div className={styles.card}>
                    <Image
                        className={styles.bgImage}
                        src={empty}
                        alt="3mpty's profile pic"
                        fill
                    />
                    <Link
                        href={"https://www.instagram.com/3mpty.dev/"}
                        target="_blank">
                        <figure>
                            <Image
                                src={insta}
                                alt="Instagram Icon"
                                width={60}
                                height={60}
                            />
                        </figure>
                        <figcaption>@3mpty.dev</figcaption>
                    </Link>
                    <Link
                        href={"https://www.twitter.com/just_3mpty"}
                        target="_blank">
                        <figure>
                            <Image
                                src={twitter}
                                alt="Twitter Icon"
                                width={60}
                                height={60}
                            />
                        </figure>
                        <figcaption>@just_3mpty</figcaption>
                    </Link>
                </div>
            </div>
            <div className={styles.category}>
                <h2>Illustrations & logo</h2>
                <div className={styles.card}>
                    <Image
                        className={styles.bgImage}
                        src={loz}
                        alt="LOZ's profile pic"
                        fill
                    />
                    <Link
                        href={"https://www.instagram.com/loz.csc/"}
                        target="_blank">
                        <figure>
                            <Image
                                src={insta}
                                alt="Instagram Icon"
                                width={60}
                                height={60}
                            />
                        </figure>
                        <figcaption>@loz.csc</figcaption>
                    </Link>
                    <Link href={"https://twitter.com/LOZ_csc"} target="_blank">
                        <figure>
                            <Image
                                src={twitter}
                                alt="Twitter Icon"
                                width={60}
                                height={60}
                            />
                        </figure>
                        <figcaption>@loz.csc</figcaption>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default page;
