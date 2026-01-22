import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface FeatureSettings {
    rankingSystem: boolean;
    specialRoles: boolean;
    exclusiveBots: boolean;
    globalLeaderboard: boolean;
    hiddenRoleNames: string[];
}

const DEFAULT_SETTINGS: FeatureSettings = {
    rankingSystem: true,
    specialRoles: true,
    exclusiveBots: true,
    globalLeaderboard: true,
    hiddenRoleNames: [],
};

export function useFeatureSettings() {
    const [settings, setSettings] = useState<FeatureSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Subscribe to real-time updates
        const settingsRef = doc(db, 'settings', 'features_page');

        const unsubscribe = onSnapshot(settingsRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setSettings({ ...DEFAULT_SETTINGS, ...docSnapshot.data() } as FeatureSettings);
            } else {
                // If it doesn't exist, we might want to create it with defaults, 
                // but for now, just using defaults locally is safer to avoid auto-writes on load.
                // However, creating it ensures admin sees the correct initial state if they try to edit.
                setSettings(DEFAULT_SETTINGS);
            }
            setLoading(false);
        }, (err) => {
            console.error("Error fetching feature settings:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateSettings = async (newSettings: Partial<FeatureSettings>) => {
        setLoading(true);
        try {
            const settingsRef = doc(db, 'settings', 'features_page');
            // We use setDoc with merge: true to handle creating the doc if it doesn't exist
            // and updating it if it does.
            await setDoc(settingsRef, newSettings, { merge: true });
        } catch (err: any) {
            console.error("Error updating feature settings:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { settings, loading, error, updateSettings };
}
