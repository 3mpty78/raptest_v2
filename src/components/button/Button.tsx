import Link from "next/link";
import React from "react";
import styles from "./button.module.scss";

const Button = ({ link, text }: { link: string; text: string }) => {
    return (
        <Link className={styles.button} href={link} target="_top">
            {text}
        </Link>
    );
};

export default Button;
