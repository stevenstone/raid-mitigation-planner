import React from "react";
import { useContext } from "react";
import { TimelineContext } from "../TimelineContext";

const HasChanges = () => {
    const timelineContext = useContext(TimelineContext);

    if (timelineContext.lastSavedToStorage === JSON.stringify(timelineContext.savedMitigations)) {
        return <span>Saved and/or up to date!</span>;
    }

    return <span>There are unsaved changes.</span>;
}

export default HasChanges;
