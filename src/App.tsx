import React from "react";
import HasChanges from "./components/HasChanges";
import { Timeline } from "./components/Timeline";
import { ActionMenu } from "./components/user-input/ActionMenu";
import { BossDropdown } from "./components/user-input/BossDropdown";
import { TimelineProvider } from "./TimelineContext";

export const App = () => {
    console.log("rendering app");
    return (
        <TimelineProvider>
            <BossDropdown />
            <HasChanges />
            <Timeline />
            <ActionMenu />
        </TimelineProvider>
    );
}