import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useContext } from "react";
import { CurrentView, SavedMitigationsByJob, TimelineContext } from "../../TimelineContext"
import { SavedMitigation } from "../../utility/constants";
import { convertSecondsToTimeString, convertTimeStringToSeconds } from "../../utility/timeCalculations";
import { Button } from "../Button";

const EditMitigation: FC = () => {
    const context = useContext(TimelineContext);
    const selectRef = useRef<HTMLSelectElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);

    const [[selectedJob, selectedMitIndex], setSelectedValues] = useState(context.selectedMitigation.split(":"));
    const selectedMitigationValues = context.savedMitigations[selectedJob][selectedMitIndex] as SavedMitigation;

    useEffect(() => {
        if (selectRef.current && timeRef.current) {
            selectRef.current.value = `${selectedJob}:${selectedMitigationValues.name}`;
            timeRef.current.value = convertSecondsToTimeString(selectedMitigationValues.time);
        }
    }, [selectedMitigationValues]);

    useEffect(() => {
        setSelectedValues(context.selectedMitigation.split(":"));
    }, [context.selectedMitigation]);

    const mitOptions = useMemo(() => {
        return Object.entries(context.playerMitigationOptions).map(([job, mits]) => {
            return (
                <optgroup key={job} label={job}>
                    {mits.map((mit) => {
                        return (
                            <option key={mit.name} value={`${job}:${mit.name}`}>{mit.name}</option>
                        )
                    })}
                </optgroup>
            );
        })
    }, [context.playerMitigationOptions]);

    const updateMit = () => {
        const value = selectRef.current?.value;
        const time = timeRef.current?.value;
        if (value && time) {
            const updatedSavedMitigations = structuredClone(context.savedMitigations);
            const [job, addedMit] = value.split(":");
            const populatedMit = {
                ...context.playerMitigationOptions[job].find((mit) => mit.name === addedMit),
                time: convertTimeStringToSeconds(time),
            };
            updatedSavedMitigations[job][selectedMitIndex] = populatedMit;
            context.setSavedMitigations(updatedSavedMitigations);
            context.setCurrentView(CurrentView.Timeline);
            context.setSelectedMitigation("");
        }
    }

    const deleteMit = () => {
        context.setCurrentView(CurrentView.Timeline);
        context.setSelectedMitigation("");
        const updatedSavedMitigations: SavedMitigationsByJob = structuredClone(context.savedMitigations);
        updatedSavedMitigations[selectedJob].splice(parseInt(selectedMitIndex, 10), 1);
        context.setSavedMitigations(updatedSavedMitigations);
    }

    if (!context.selectedMitigation) {
        return null;
    }

    return (
        <>
            <h3>Edit Mitigation</h3>
            <label htmlFor="mitigation">Mitigation</label>
            <select id="Mitigation" ref={selectRef as React.MutableRefObject<HTMLSelectElement>} defaultValue={`${selectedJob}:${selectedMitigationValues.name}`}>
                {mitOptions}
            </select>
            <label htmlFor="time">Time of Use</label>
            <input type="text" id="time" ref={timeRef} defaultValue={convertSecondsToTimeString(selectedMitigationValues.time)} />
            <Button text="Cancel" onClick={() => { context.setCurrentView(CurrentView.Timeline); context.setSelectedMitigation(""); }} />
            <Button text="Delete" onClick={deleteMit} />
            <Button text="Save" onClick={updateMit} />
        </>
    )
}

export default EditMitigation;
