import { useState, useEffect } from 'react';

/**
 * Custom hook to manage PWA installation logic.
 * Handles the beforeinstallprompt event, persistence, and platform detection.
 */
const usePWAInstall = () => {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // 1. Detect if the app is already installed/running in standalone mode
        const checkStandalone = () => {
            const standalone = window.matchMedia('(display-mode: standalone)').matches 
                || window.navigator.standalone 
                || document.referrer.includes('android-app://');
            setIsStandalone(standalone);
        };

        // 2. Detect iOS platform
        const checkIOS = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            const ios = /iphone|ipad|ipod/.test(userAgent);
            setIsIOS(ios);
        };

        // 3. Check if the user previously dismissed the prompt (with a 7-day cooldown)
        const checkDismissed = () => {
            const dismissedUntil = localStorage.getItem('pwa_install_dismissed_until');
            if (dismissedUntil && new Date().getTime() < parseInt(dismissedUntil, 10)) {
                setIsDismissed(true);
            } else {
                setIsDismissed(false);
            }
        };

        checkStandalone();
        checkIOS();
        checkDismissed();

        // 4. Capture the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the default browser prompt
            e.preventDefault();
            // Store the event so it can be triggered later
            setInstallPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', () => {
            setInstallPrompt(null);
            setIsStandalone(true);
            console.log('PWA was installed');
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;

        // Show the install prompt
        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await installPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, so discard it
        setInstallPrompt(null);

        if (outcome === 'accepted') {
            setIsStandalone(true);
        } else {
            // If dismissed, we might want to treat it like a temporary dismissal
            handleDismiss();
        }
    };

    const handleDismiss = (days = 7) => {
        const until = new Date().getTime() + days * 24 * 60 * 60 * 1000;
        localStorage.setItem('pwa_install_dismissed_until', until.toString());
        setIsDismissed(true);
    };

    // The banner should be shown if:
    // 1. App is not in standalone mode
    // 2. Not previously dismissed (within cooldown)
    // 3. Either we have the install prompt (Android/Chrome) OR it's iOS (for fallback)
    const showBanner = !isStandalone && !isDismissed && (installPrompt !== null || isIOS);

    return {
        showBanner,
        isIOS,
        handleInstall,
        handleDismiss,
        isInstalled: isStandalone
    };
};

export default usePWAInstall;
