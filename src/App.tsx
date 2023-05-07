import React from "react";
import { Timeline } from "./components/Timeline";
import { ActionMenu } from "./components/user-input/ActionMenu";
import { BossDropdown } from "./components/user-input/BossDropdown";
import { TimelineProvider } from "./TimelineContext";

export const App = () => {
    return (
        <TimelineProvider>
            <BossDropdown />
            <Timeline />
            <ActionMenu />
        </TimelineProvider>
    );
}