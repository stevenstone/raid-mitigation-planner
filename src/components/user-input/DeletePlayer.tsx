import React, { FC, useState } from "react";
import { useContext } from "react";
import { CurrentView, TimelineContext } from "../../TimelineContext"
import { Button } from "../Button";

const DeletePlayer: FC = () => {
    const context = useContext(TimelineContext);

    const [[selectedJob]] = useState(context.selectedMitigation.split(":"));

    const deletePlayer = () => {
        const updatedSavedMitigations = { ...context.savedMitigations };
        delete updatedSavedMitigations[selectedJob];
        context.setSavedMitigations(updatedSavedMitigations);
        context.setCurrentView(CurrentView.Timeline);
    }

    if (!context.selectedMitigation) {
        return null;
    }

    return (
        <>
            <h3>Delete Player</h3>
            <p>Are you sure you want to delete {selectedJob}?</p>
            <Button text="Cancel" onClick={() => { context.setCurrentView(CurrentView.Timeline); context.setSelectedMitigation(""); }} />
            <Button text="Delete" onClick={deletePlayer} />
        </>
    )
}

export default DeletePlayer;
