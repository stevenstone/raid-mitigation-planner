import React, { FC, useMemo, useRef } from "react";
import { useContext } from "react";
import { players } from "../../data/players";
import { TimelineContext } from "../../TimelineContext"
import { Button } from "../Button";

const AddPlayer: FC = () => {
    const context = useContext(TimelineContext);
    const selectRef = useRef<HTMLSelectElement>();

    const jobOptions = useMemo(() => {
        // const currentJobs = Array.from(Object.keys(context.savedMitigations));
        const currentJobs = context.savedMitigations.mitigations.map((mits) => mits.job);
        console.log(currentJobs);
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
            if (updatedSavedMitigations.mitigations.find((mit) => mit.job === value)) {
                return;
            }
            updatedSavedMitigations.mitigations.push({
                job: value,
                mitigations: [],
            });
            context.setSavedMitigations(updatedSavedMitigations);
        }
    }

    return (
        <>
            <h3>Add Player</h3>
            <select ref={selectRef as React.MutableRefObject<HTMLSelectElement>}>
                {jobOptions}
            </select>
            <Button text="Save" onClick={savePlayer} />
        </>
    )
}

export default AddPlayer;
