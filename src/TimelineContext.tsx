import React, { createContext, useState, FC, useEffect, useRef } from "react";
import { BossAttacks, PlayerMitigation, SavedMitigation } from "./utility/constants";
import p8sData from "./data/p8s-dog-first.json";
import { players as playerMitigationData } from "./data/players";
import { convertTimeStringToSeconds } from "./utility/timeCalculations";

interface MitigationOptions {
    [key: string]: PlayerMitigation[];
}

interface SavedMitigationsByJob {
    [key: string]: SavedMitigation[];
}

export enum CurrentView {
    AddBossAction,
    AddMitigation,
    AddPlayer,
    Timeline,
}

interface TimelineContextState {
    bossData: BossAttacks[];
    playerMitigationOptions: MitigationOptions;
    savedMitigations: SavedMitigationsByJob;

    time: string;
    totalSeconds: number;
    pixelsPerSecond: number;
    rowHeight: string;
    rowWidth: string;

    currentView: CurrentView;
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentView>>;

    setBossData: React.Dispatch<React.SetStateAction<BossAttacks[]>>;
    setPlayerMitigationOptions: React.Dispatch<React.SetStateAction<MitigationOptions>>;
    setSavedMitigations: React.Dispatch<React.SetStateAction<SavedMitigationsByJob>>;

    setTime: React.Dispatch<React.SetStateAction<string>>;
    setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
    setPixelsPerSecond: React.Dispatch<React.SetStateAction<number>>;
    setRowWidth: React.Dispatch<React.SetStateAction<string>>;
}

const initialTime = "7:51";
const totalSeconds = convertTimeStringToSeconds(initialTime);
const pixelsPerSecond = 10;

const initialValues = {
    bossData: [],
    playerMitigationOptions: {},
    savedMitigations: {},

    time: initialTime,
    totalSeconds,
    pixelsPerSecond: 10,
    rowHeight: "30px",
    rowWidth: `${totalSeconds * pixelsPerSecond}px`,

    currentView: CurrentView.Timeline,
    setCurrentView: () => { },

    setBossData: () => { },
    setPlayerMitigationOptions: () => { },
    setSavedMitigations: () => { },

    setTime: () => { },
    setTotalSeconds: () => { },
    setPixelsPerSecond: () => { },
    setRowWidth: () => { },
};

export const TimelineContext = createContext<TimelineContextState>(initialValues);

export const TimelineProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const localStorageKey = useRef("raid-timeline-storage").current;
    const [storedMitigationString, setStoredMitigationString] = useState("[]");

    const [bossData, setBossData] = useState<BossAttacks[]>(initialValues.bossData);
    const [playerMitigationOptions, setPlayerMitigationOptions] = useState<MitigationOptions>(initialValues.playerMitigationOptions);
    const [savedMitigations, setSavedMitigations] = useState<SavedMitigationsByJob>(initialValues.savedMitigations);
    const [time, setTime] = useState(initialValues.time);
    const [totalSeconds, setTotalSeconds] = useState(initialValues.totalSeconds);
    const [pixelsPerSecond, setPixelsPerSecond] = useState(initialValues.pixelsPerSecond);
    const [rowHeight, setRowHeight] = useState(initialValues.rowHeight);
    const [rowWidth, setRowWidth] = useState(initialValues.rowWidth);

    const [currentView, setCurrentView] = useState(initialValues.currentView);

    useEffect(() => {
        readFromLocalStorage();
    }, []);

    useEffect(() => {
        setBossData(p8sData.attacks as BossAttacks[]);
    }, []);

    useEffect(() => {
        const selectedJobs = Object.keys(savedMitigations);
        let newMitigationOptions = Object.entries(playerMitigationData).reduce((result, current) => {
            if (selectedJobs.includes(current[0])) {
                result[current[0]] = current[1];
            }
            return result;
        }, {});
        setPlayerMitigationOptions(newMitigationOptions);
    }, [savedMitigations]);

    useEffect(() => {
        saveToLocalStorage();
    }, [savedMitigations]);

    useEffect(() => {
        const parsedMits = JSON.parse(storedMitigationString) as SavedMitigation[];
        const newMits = {};
        Object.entries(parsedMits).forEach(([job, mits]) => {
            newMits[job] = (mits || []);
        });
        setSavedMitigations(newMits);
    }, [storedMitigationString]);

    const saveToLocalStorage = () => {
        const newString = JSON.stringify(savedMitigations);
        window.localStorage.setItem(localStorageKey, newString);
    }

    const readFromLocalStorage = () => {
        const newString = window.localStorage.getItem(localStorageKey) || "[]";
        setStoredMitigationString(newString);
    }

    return (
        <TimelineContext.Provider
            value={{
                bossData,
                playerMitigationOptions,
                savedMitigations,

                time,
                totalSeconds,
                pixelsPerSecond,
                rowHeight,
                rowWidth,

                currentView,
                setCurrentView,

                setBossData,
                setPlayerMitigationOptions,
                setSavedMitigations,

                setTime,
                setTotalSeconds,
                setPixelsPerSecond,
                setRowWidth,
            }}
        >
            {children}
        </TimelineContext.Provider>
    );
};
