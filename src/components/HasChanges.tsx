import React from "react";
import { useContext } from "react";
import { TimelineContext } from "../TimelineContext";

const HasChanges = () => {
    const timelineContext = useContext(TimelineContext);
    console.log(
        // !!timelineContext.lastSavedToStorage,
        timelineContext.lastSavedToStorage,
        // JSON.parse(timelineContext.lastSavedToStorage).find((x) => x.fight === timelineContext.selectedBossFile),
        // JSON.stringify(timelineContext.savedMitigations)
    );
    if (!!timelineContext.lastSavedToStorage && timelineContext.lastSavedToStorage[timelineContext.selectedBossFile] === JSON.stringify(timelineContext.savedMitigations)) {
        return <span>Saved and/or up to date!</span>;
    }

    return <span>There are unsaved changes.</span>;
}

export default HasChanges;
