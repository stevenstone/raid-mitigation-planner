import React, { createContext, useState, FC, useEffect, useRef } from "react";
import { FightData, PlayerMitigation, SavedMitigation } from "./utility/constants";
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
    EditMitigation,
    Timeline,
}

interface TimelineContextState {
    // bossData: BossAttacks[];
    selectedBossFile: string;
    playerMitigationOptions: MitigationOptions;
    savedMitigations: SavedMitigationsByJob;
    saveToLocalStorage: () => void;

    // time: string;
    totalSeconds: number;
    pixelsPerSecond: number;
    rowHeight: string;
    rowWidth: string;

    currentView: CurrentView;
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentView>>;
    selectedMitigation: string;
    setSelectedMitigation: React.Dispatch<React.SetStateAction<string>>;

    // setBossData: React.Dispatch<React.SetStateAction<BossAttacks[]>>;
    setSelectedBossFile: React.Dispatch<React.SetStateAction<string>>;
    setPlayerMitigationOptions: React.Dispatch<React.SetStateAction<MitigationOptions>>;
    setSavedMitigations: React.Dispatch<React.SetStateAction<SavedMitigationsByJob>>;

    // setTime: React.Dispatch<React.SetStateAction<string>>;
    setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
    setPixelsPerSecond: React.Dispatch<React.SetStateAction<number>>;
    setRowWidth: React.Dispatch<React.SetStateAction<string>>;
}

const initialTime = "7:51";
const totalSeconds = convertTimeStringToSeconds(initialTime);
const pixelsPerSecond = 10;

const initialValues = {
    // bossData: p8sData.attacks as BossAttacks[],
    selectedBossFile: "p8sdog",
    playerMitigationOptions: {},
    savedMitigations: {},
    saveToLocalStorage: () => { },

    // time: initialTime,
    totalSeconds,
    pixelsPerSecond: 10,
    rowHeight: "30px",
    rowWidth: `${totalSeconds * pixelsPerSecond}px`,

    currentView: CurrentView.Timeline,
    setCurrentView: () => { },
    selectedMitigation: "",
    setSelectedMitigation: () => { },

    // setBossData: () => { },
    setSelectedBossFile: () => { },
    setPlayerMitigationOptions: () => { },
    setSavedMitigations: () => { },

    // setTime: () => { },
    setTotalSeconds: () => { },
    setPixelsPerSecond: () => { },
    setRowWidth: () => { },
};

export const TimelineContext = createContext<TimelineContextState>(initialValues);

export const TimelineProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const localStorageKey = useRef("raid-timeline-storage").current;
    const [storedMitigationString, setStoredMitigationString] = useState("{}");

    // const [bossData, setBossData] = useState<BossAttacks[]>(initialValues.bossData);
    const [selectedBossFile, setSelectedBossFile] = useState(initialValues.selectedBossFile);
    const [playerMitigationOptions, setPlayerMitigationOptions] = useState<MitigationOptions>(initialValues.playerMitigationOptions);
    const [savedMitigations, setSavedMitigations] = useState<SavedMitigationsByJob>(initialValues.savedMitigations);
    // const [time, setTime] = useState(initialValues.time);
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

    useEffect(() => {
        const parsedMits: string = JSON.parse(storedMitigationString);
        console.log(storedMitigationString);
        // console.log(parsedMits);
        const newMits = {};
        console.log(parsedMits);
        Object.entries(parsedMits).forEach(([job, mits]) => {
            newMits[job] = (mits || []);
            console.log(job);
        });
        console.log(newMits);
        setSavedMitigations(newMits);
    }, [storedMitigationString]);

    const saveToLocalStorage = () => {
        // const newString = JSON.stringify(savedMitigations);
        const updatedStorage = JSON.parse(storedMitigationString || "{}") || {};
        updatedStorage[selectedBossFile] = savedMitigations;
        const updatedString = JSON.stringify(updatedStorage);
        window.localStorage.setItem(localStorageKey, updatedString);
    }

    const readFromLocalStorage = () => {
        const newString = window.localStorage.getItem(localStorageKey) || "{}";
        // parse the string to get the right fight
        const allData = JSON.parse(newString);
        const thisFight: FightData = allData[selectedBossFile] || {};
        // re string it to save in state
        const storedString = JSON.stringify(thisFight);
        setStoredMitigationString(storedString);
        if (thisFight?.time) {
            setTotalSeconds(parseInt(thisFight.time));
            setRowWidth(`${convertTimeStringToSeconds(thisFight.time) * pixelsPerSecond}px`);
        }
    }

    return (
        <TimelineContext.Provider
            value={{
                // bossData,
                selectedBossFile,
                playerMitigationOptions,
                savedMitigations,
                saveToLocalStorage,

                // time,
                totalSeconds,
                pixelsPerSecond,
                rowHeight,
                rowWidth,

                currentView,
                setCurrentView,
                selectedMitigation,
                setSelectedMitigation,

                // setBossData,
                setSelectedBossFile,
                setPlayerMitigationOptions,
                setSavedMitigations,

                // setTime,
                setTotalSeconds,
                setPixelsPerSecond,
                setRowWidth,
            }}
        >
            {children}
        </TimelineContext.Provider>
    );
};
