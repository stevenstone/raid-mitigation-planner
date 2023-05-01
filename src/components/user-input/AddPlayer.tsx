import React, { FC, useMemo, useRef } from "react";
import { useContext } from "react";
import { players } from "../../data/players";
import { TimelineContext } from "../../TimelineContext"
import { Button } from "../Button";

const AddPlayer: FC = () => {
    const context = useContext(TimelineContext);
    const selectRef = useRef<HTMLSelectElement>();

    const jobOptions = useMemo(() => {
        const currentJobs = Array.from(Object.keys(context.savedMitigations));
        return Object.keys(players)
            .filter((player) => !currentJobs.includes(player))
            .map((player) => {
                return <option value={player} key={player}>{player}</option>;
            })
    }, [context.savedMitigations]);

    const savePlayer = () => {
        const value = selectRef.current?.value;
        if (value) {
            const updatedSavedMitigations = structuredClone(context.savedMitigations);
            console.log(updatedSavedMitigations);
            updatedSavedMitigations[value] = [];
            context.setSavedMitigations(updatedSavedMitigations);
        }
    }

    return (
        <>
            <select ref={selectRef as React.MutableRefObject<HTMLSelectElement>}>
                {jobOptions}
            </select>
            <Button text="Save" onClick={savePlayer} />
        </>
    )
}

export default AddPlayer;
