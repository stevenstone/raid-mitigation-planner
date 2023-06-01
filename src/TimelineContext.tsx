import React, { createContext, useState, FC, useEffect, useRef } from "react";
import { PlayerMitigation, SavedMitigation } from "./utility/constants";
import { players as playerMitigationData } from "./data/players";
import { convertTimeStringToSeconds } from "./utility/timeCalculations";

interface MitigationOptions {
    [key: string]: PlayerMitigation[];
}

export interface SavedMitigationsByJob {
    [key: string]: SavedMitigation[];
}

export enum CurrentView {
    AddBossAction,
    AddMitigation,
    AddPlayer,
    DeletePlayer,
    EditMitigation,
    Timeline,
}

interface TimelineContextState {
    selectedBossFile: string;
    playerMitigationOptions: MitigationOptions;
    savedMitigations: SavedMitigationsByJob;
    saveToLocalStorage: () => void;
    lastSavedToStorage: string;

    totalSeconds: number;
    pixelsPerSecond: number;
    rowHeight: string;
    rowWidth: string;

    currentView: CurrentView;
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentView>>;
    selectedMitigation: string;
    setSelectedMitigation: React.Dispatch<React.SetStateAction<string>>;

    setSelectedBossFile: React.Dispatch<React.SetStateAction<string>>;
    setPlayerMitigationOptions: React.Dispatch<React.SetStateAction<MitigationOptions>>;
    setSavedMitigations: React.Dispatch<React.SetStateAction<SavedMitigationsByJob>>;

    setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
    setPixelsPerSecond: React.Dispatch<React.SetStateAction<number>>;
    setRowWidth: React.Dispatch<React.SetStateAction<string>>;
}

const initialTime = "9:58";
const totalSeconds = convertTimeStringToSeconds(initialTime);
const pixelsPerSecond = 10;

const initialValues = {
    selectedBossFile: "p9s",
    playerMitigationOptions: {},
    savedMitigations: {},
    saveToLocalStorage: () => { },
    lastSavedToStorage: "",

    totalSeconds,
    pixelsPerSecond: 10,
    rowHeight: "30px",
    rowWidth: `${totalSeconds * pixelsPerSecond}px`,

    currentView: CurrentView.Timeline,
    setCurrentView: () => { },
    selectedMitigation: "",
    setSelectedMitigation: () => { },

    setSelectedBossFile: () => { },
    setPlayerMitigationOptions: () => { },
    setSavedMitigations: () => { },

    setTotalSeconds: () => { },
    setPixelsPerSecond: () => { },
    setRowWidth: () => { },
};

export const TimelineContext = createContext<TimelineContextState>(initialValues);

export const TimelineProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const localStorageKey = useRef("raid-timeline-storage").current;

    const [selectedBossFile, setSelectedBossFile] = useState(initialValues.selectedBossFile);
    const [playerMitigationOptions, setPlayerMitigationOptions] = useState<MitigationOptions>(initialValues.playerMitigationOptions);
    const [savedMitigations, setSavedMitigations] = useState<SavedMitigationsByJob>(initialValues.savedMitigations);
    const [lastSavedToStorage, setLastSavedToStorage] = useState<string>("");

    const [totalSeconds, setTotalSeconds] = useState(initialValues.totalSeconds);
    const [pixelsPerSecond, setPixelsPerSecond] = useState(initialValues.pixelsPerSecond);
    const [rowHeight, setRowHeight] = useState(initialValues.rowHeight);
    const [rowWidth, setRowWidth] = useState(initialValues.rowWidth);

    const [currentView, setCurrentView] = useState(initialValues.currentView);
    const [selectedMitigation, setSelectedMitigation] = useState(initialValues.selectedMitigation);

    useEffect(() => {
        readFromLocalStorage();
    }, [selectedBossFile]);

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

    const saveToLocalStorage = () => {
        // get what's currently in storage and update the current boss file entry with the current object
        const updatedStorage = JSON.parse(window.localStorage.getItem(localStorageKey) || "{}");
        updatedStorage[selectedBossFile] = savedMitigations;
        const updatedString = JSON.stringify(updatedStorage);
        window.localStorage.setItem(localStorageKey, updatedString);
        setLastSavedToStorage(updatedString);
    }

    const readFromLocalStorage = () => {
        const newString = window.localStorage.getItem(localStorageKey) || "{}";
        // parse the string to get the right fight
        const allData = JSON.parse(newString);
        const thisFightMits: SavedMitigationsByJob = allData[selectedBossFile] || {};
        setSavedMitigations(thisFightMits);
        setLastSavedToStorage(JSON.stringify(thisFightMits));
    }

    return (
        <TimelineContext.Provider
            value={{
                selectedBossFile,
                playerMitigationOptions,
                savedMitigations,
                saveToLocalStorage,
                lastSavedToStorage,

                totalSeconds,
                pixelsPerSecond,
                rowHeight,
                rowWidth,

                currentView,
                setCurrentView,
                selectedMitigation,
                setSelectedMitigation,

                setSelectedBossFile,
                setPlayerMitigationOptions,
                setSavedMitigations,

                setTotalSeconds,
                setPixelsPerSecond,
                setRowWidth,
            }}
        >
            {children}
        </TimelineContext.Provider>
    );
};
