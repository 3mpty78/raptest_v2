/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

const PostArtist: React.FC = () => {
    const [artistName, setArtistName] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setArtistName(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", artistName);
            if (imageFile) {
                formData.append("image", imageFile);
            }
            const response = await fetch("/api/artists", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Artiste ajouté");
                setArtistName("");
                setImageFile(null);
            } else {
                console.error(
                    "Erreur lors de l'ajout de l'artiste :",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Erreur lors de la requête POST :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="artistName">Nom de l'artiste</label>
            <input
                type="text"
                id="artistName"
                value={artistName}
                onChange={handleChange}
                required
            />
            <label htmlFor="image">Image</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
            />
            <button type="submit">POST</button>
        </form>
    );
};

export default PostArtist;
