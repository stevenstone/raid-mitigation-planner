import React, { createContext, useState, FC, useEffect, useRef } from "react";
import { Mitigation, MitigationOptions, SavedMitigation, SingleFightMitigations, SinglePlayerMitigations } from "./utility/constants";
import { players as playerMitigationData } from "./data/players";
import { convertTimeStringToSeconds } from "./utility/timeCalculations";
// import { db } from "./firebase";
// import { onValue, ref } from "firebase/database";
import { bossFiles } from "./data/bossFiles";

export enum CurrentView {
    AddBossAction,
    AddMitigation,
    AddPlayer,
    DeletePlayer,
    EditMitigation,
    Export,
    Import,
    Timeline,
}

interface TimelineContextState {
    selectedBossFile: string;
    playerMitigationOptions: MitigationOptions;
    savedMitigations: SingleFightMitigations;
    saveToLocalStorage: () => void;
    lastSavedToStorage: string;

    totalSeconds: number;
    pixelsPerSecond: number;
    rowHeight: string;
    rowWidth: string;

    currentView: CurrentView;
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentView>>;
    selectedMitigation: string;
    selectedJob: string;
    importToLocalStorage: (input: string) => void;
    setSelectedMitigation: React.Dispatch<React.SetStateAction<string>>;
    setSelectedJob: React.Dispatch<React.SetStateAction<string>>;

    setSelectedBossFile: React.Dispatch<React.SetStateAction<string>>;
    setSavedMitigations: React.Dispatch<React.SetStateAction<SingleFightMitigations>>;

    // setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
    setPixelsPerSecond: React.Dispatch<React.SetStateAction<number>>;
    setRowWidth: React.Dispatch<React.SetStateAction<string>>;
}

// const initialTime = "9:58";
// const totalSeconds = convertTimeStringToSeconds(initialTime);
const totalSeconds = 0;
const pixelsPerSecond = 10;
const defaultBoss = "ketuduke";

const initialValues = {
    selectedBossFile: defaultBoss,
    playerMitigationOptions: {},
    savedMitigations: { fight: defaultBoss, mitigations: [] },
    saveToLocalStorage: () => { },
    lastSavedToStorage: "",

    totalSeconds,
    pixelsPerSecond: 10,
    rowHeight: "30px",
    rowWidth: `${totalSeconds * pixelsPerSecond}px`,

    currentView: CurrentView.Timeline,
    setCurrentView: () => { },
    selectedMitigation: "",
    selectedJob: "",
    setSelectedJob: () => { },
    importToLocalStorage: (input: string) => { },
    setSelectedMitigation: () => { },

    setSelectedBossFile: () => { },
    setSavedMitigations: () => { },

    // setTotalSeconds: () => { },
    setPixelsPerSecond: () => { },
    setRowWidth: () => { },
};

export const TimelineContext = createContext<TimelineContextState>(initialValues);

export const TimelineProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [localStorageKey, setLocalStorageKey] = useState(`eatm-timeline-storage-${initialValues.selectedBossFile}`);

    const [selectedBossFile, setSelectedBossFile] = useState(initialValues.selectedBossFile);
    const [playerMitigationOptions, setPlayerMitigationOptions] = useState<MitigationOptions>(initialValues.playerMitigationOptions);
    const [savedMitigations, setSavedMitigations] = useState<SingleFightMitigations>(initialValues.savedMitigations);
    const [lastSavedToStorage, setLastSavedToStorage] = useState<string>("");

    const [totalSeconds, setTotalSeconds] = useState(initialValues.totalSeconds);
    const [pixelsPerSecond, setPixelsPerSecond] = useState(initialValues.pixelsPerSecond);
    const [rowHeight, setRowHeight] = useState(initialValues.rowHeight);
    const [rowWidth, setRowWidth] = useState(initialValues.rowWidth);

    const [currentView, setCurrentView] = useState(initialValues.currentView);
    const [selectedMitigation, setSelectedMitigation] = useState(initialValues.selectedMitigation);
    const [selectedJob, setSelectedJob] = useState("");

    // update the storage key when the boss is changed
    useEffect(() => {
        setLocalStorageKey(`eatm-timeline-storage-${selectedBossFile}`);
    }, [selectedBossFile]);

    // read mits from storage when the key is changed/after the boss is changed
    useEffect(() => {
        readFromLocalStorage();
    }, [localStorageKey]);

    // update the timeline size when the fight is changed
    useEffect(() => {
        setTotalSeconds(convertTimeStringToSeconds(bossFiles[selectedBossFile]?.file.time));
        setRowWidth(`${totalSeconds * pixelsPerSecond}px`);
    }, [selectedBossFile]);

    // Update player mitigation options when savedMitigations are changed (i.e. a job is added or removed)
    useEffect(() => {
        const selectedJobs = savedMitigations.mitigations.map((mits) => mits.job);
        let newMitigationOptions: MitigationOptions = Object.entries(playerMitigationData).reduce((result, [job, mits]) => {
            if (selectedJobs.includes(job)) {
                result[job] = mits;
            }
            return result;
        }, {});
        setPlayerMitigationOptions(newMitigationOptions);
    }, [savedMitigations]);

    const saveToLocalStorage = () => {
        // get what's currently in storage and update the current boss file entry with the current object
        // const updatedStorage: SingleFightMitigations = JSON.parse(window.localStorage.getItem(localStorageKey) || `{ "fight": "${selectedBossFile}", "mitigations": [] }`);
        // updatedStorage = savedMitigations;
        const updatedString = JSON.stringify(savedMitigations);
        window.localStorage.setItem(localStorageKey, updatedString);
        setLastSavedToStorage(updatedString);
    }

    const readFromLocalStorage = () => {
        const newString: string = window.localStorage.getItem(localStorageKey) || `{ "fight": "${selectedBossFile}", "mitigations": [] }`;
        const thisFight: SingleFightMitigations = JSON.parse(newString);
        setSavedMitigations(thisFight);
        setLastSavedToStorage(JSON.stringify(thisFight));
    }

    const importToLocalStorage = (input: string) => {
        if (!selectedJob || !input) {
            return;
        }
        const updatedStorage: SingleFightMitigations = JSON.parse(window.localStorage.getItem(localStorageKey) || `{ "fight": "${selectedBossFile}", "mitigations": [] }`);
        const thisJob = updatedStorage.mitigations.find((mits) => mits.job === selectedJob);
        if (thisJob) {
            thisJob.mitigations = JSON.parse(input);
        } else {
            updatedStorage.mitigations.push({
                job: selectedJob,
                mitigations: JSON.parse(input),
            });
        }
        window.localStorage.setItem(localStorageKey, JSON.stringify(updatedStorage));
        readFromLocalStorage();
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
                selectedJob,
                setSelectedMitigation,
                setSelectedJob,

                setSelectedBossFile,
                // setPlayerMitigationOptions,
                importToLocalStorage,
                setSavedMitigations,

                // setTotalSeconds,
                setPixelsPerSecond,
                setRowWidth,
            }}
        >
            {children}
        </TimelineContext.Provider>
    );
};
