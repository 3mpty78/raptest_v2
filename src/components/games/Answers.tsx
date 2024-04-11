/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Album {
    artist: string;
    title: string;
    imageUrl: string;
}

const Answers = ({
    badAnswers,
    goodAnswer,
    projectData,
}: {
    badAnswers: string[];
    goodAnswer: string;
    projectData: Album;
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
    return (
        <>
            {shuffledAnswers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswerClick(answer)}>
                    {answer}
                </button>
            ))}
            <button onClick={() => handleAnswerClick(goodAnswer)}>
                {goodAnswer}
            </button>
            {selectedAnswer === goodAnswer && (
                <>
                    <div>C'EST BON !</div>
                    <div>
                        <Image
                            src={projectData.imageUrl}
                            alt={`${projectData.title}'s cover`}
                            width={200}
                            height={200}
                        />
                        <h4>{projectData.artist}</h4>
                        <h5>{goodAnswer}</h5>
                        <p>{projectData.title}</p>
                    </div>
                </>
            )}
            {selectedAnswer && badAnswers.includes(selectedAnswer) && (
                <>
                    <h1>NON !</h1>
                </>
            )}
        </>
    );
};

export default Answers;
