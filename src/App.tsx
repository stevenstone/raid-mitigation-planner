import React from "react";
import { Timeline } from "./components/Timeline";
import { ActionMenu } from "./components/user-input/ActionMenu";
import { TimelineProvider } from "./TimelineContext";

export const App = () => {
    return (
        <TimelineProvider>
            <Timeline />
            <ActionMenu />
        </TimelineProvider>
    );
}