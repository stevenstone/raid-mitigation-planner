import React, { FC, useMemo, useRef } from "react";
import { useContext } from "react";
import { TimelineContext } from "../../TimelineContext"
import { convertTimeStringToSeconds } from "../../utility/timeCalculations";
import { Button } from "../Button";

const AddMitigation: FC = () => {
    const context = useContext(TimelineContext);
    const selectRef = useRef<HTMLSelectElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);

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

    const saveMit = () => {
        const value = selectRef.current?.value;
        const time = timeRef.current?.value;
        if (value && time) {
            const updatedSavedMitigations = structuredClone(context.savedMitigations);
            const [job, addedMit] = value.split(":");
            const populatedMit = {
                ...context.playerMitigationOptions[job].find((mit) => mit.name === addedMit),
                time: convertTimeStringToSeconds(time),
            };
            updatedSavedMitigations[job].push(populatedMit);
            context.setSavedMitigations(updatedSavedMitigations);
        }
    }

    return (
        <>
            <h3>Add Mitigation</h3>
            <label htmlFor="mitigation">Mitigation</label>
            <select id="Mitigation" ref={selectRef as React.MutableRefObject<HTMLSelectElement>}>
                {mitOptions}
            </select>
            <label htmlFor="time">Time of Use</label>
            <input type="text" id="time" ref={timeRef} />
            <Button text="Save" onClick={saveMit} disabled={timeRef.current?.value === "" || selectRef.current?.value === ""} />
        </>
    )
}

export default AddMitigation;
