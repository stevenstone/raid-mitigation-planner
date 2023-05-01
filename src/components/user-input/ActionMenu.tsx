import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentView, TimelineContext } from "../../TimelineContext";
import { Button } from "../Button";
import AddMitigation from "./AddMitigation";
import AddPlayer from "./AddPlayer";

export const ActionMenu = () => {
    const context = useContext(TimelineContext);
    const [form, setForm] = useState<JSX.Element>();

    useEffect(() => {
        switch (context.currentView) {
            case CurrentView.AddBossAction:
                break;
            case CurrentView.AddMitigation:
                setForm(<AddMitigation /> as JSX.Element);
                break;
            case CurrentView.AddPlayer:
                setForm(<AddPlayer /> as JSX.Element);
            case CurrentView.Timeline:
                return;
        }
    }, [context.currentView])

    return (
        <div>
            <>
                <div>
                    <Button onClick={() => context.setCurrentView(CurrentView.AddPlayer)} text="Add Player" />
                    <Button onClick={() => context.setCurrentView(CurrentView.AddMitigation)} text="Add Mitigation" />
                    <Button onClick={() => context.setCurrentView(CurrentView.AddBossAction)} text="Add Boss Action" />
                </div>
                {form}
            </>
        </div>
    )
}