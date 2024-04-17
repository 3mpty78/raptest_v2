/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../../app/[artistId]/games/blindtest/blindtest.module.scss";
import illustration from "../../../public/img/illustrations/winner.svg";

interface Album {
    artist: string;
    title: string;
    cover: string;
}

const Answers = ({
    badAnswers,
    goodAnswer,
    projectData,
    artist,
}: {
    badAnswers: string[];
    goodAnswer: string;
    projectData: Album;
    artist: string;
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const shuffleAnswers = (answers: string[]) => {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    };

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
    };
    const shuffledAnswers = shuffleAnswers([...badAnswers, goodAnswer]);

    const handleGoBack = () => {
        window.location.reload();
    };

    return (
        <>
            <div className={styles.answersContainer}>
                {shuffledAnswers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
            {selectedAnswer === goodAnswer && (
                <div className={styles.answer}>
                    <figure>
                        <Image src={illustration} alt="" fill />
                    </figure>
                    <div className={styles.message}>
                        <h2 style={{ color: "#2ecc71" }}>Bien joué !</h2>
                        <div className={styles.correctAnswer}>
                            <figure>
                                <Image
                                    src={projectData.cover}
                                    alt={`${projectData.title}'s cover`}
                                    fill
                                />
                            </figure>
                            <h4>{artist}</h4>
                            <h5>{goodAnswer}</h5>
                            <p>{projectData.title}</p>
                        </div>
                        <button
                            className={styles.replayBtn}
                            onClick={handleGoBack}>
                            Rejouer !
                        </button>
                    </div>
                </div>
            )}
            {selectedAnswer && selectedAnswer !== goodAnswer && (
                <div className={styles.answer}>
                    <figure>
                        <Image src={illustration} alt="" fill />
                    </figure>
                    <div className={styles.message}>
                        <h2 style={{ color: "#c40000" }}>Aïe ! Dommage !</h2>
                        <div className={styles.correctAnswer}>
                            <figure>
                                <Image
                                    src={projectData.cover}
                                    alt={`${projectData.title}'s cover`}
                                    fill
                                />
                            </figure>
                            <h4>{artist}</h4>
                            <h5>{goodAnswer}</h5>
                            <p>{projectData.title}</p>
                        </div>
                        <button
                            className={styles.replayBtn}
                            onClick={handleGoBack}>
                            Rejouer !
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Answers;
