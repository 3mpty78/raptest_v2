"use client";
import React, { useEffect, useState } from "react";
import styles from "./installBtn.module.scss";

const InstallBtn = () => {
    const [showInstallBtn, setShowInstallBtn] = useState(false);

    useEffect(() => {
        const isPwaSupported = () => {
            return (
                "beforeinstallprompt" in window &&
                window.matchMedia("(display-mode: standalone)").matches
            );
        };

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setShowInstallBtn(true);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        // Vérification de la prise en charge PWA lors de l'initialisation
        if (isPwaSupported()) {
            setShowInstallBtn(true);
        }

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = async () => {
        const deferredPrompt = (window as any).deferredPrompt;
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            (window as any).deferredPrompt = null;
        }
    };

    return (
        <div className={styles.btn}>
            <button
                id="install"
                hidden={!showInstallBtn}
                onClick={handleInstallClick}>
                Installer
            </button>
        </div>
    );
};

export default InstallBtn;
