import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentView, TimelineContext } from "../../TimelineContext";
import { Button } from "../Button";
import AddMitigation from "./AddMitigation";
import AddPlayer from "./AddPlayer";
import EditMitigation from "./EditMitigation";

export const ActionMenu = () => {
    const context = useContext(TimelineContext);
    const [form, setForm] = useState<JSX.Element>();

    useEffect(() => {
        switch (context.currentView) {
            case CurrentView.AddMitigation:
                setForm(<AddMitigation /> as JSX.Element);
                break;
            case CurrentView.AddPlayer:
                setForm(<AddPlayer /> as JSX.Element);
                break;
            case CurrentView.EditMitigation:
                setForm(<EditMitigation /> as JSX.Element);
                break;
            case CurrentView.Timeline:
            case CurrentView.AddBossAction:
                setForm(<></>);
        }
    }, [context.currentView]);

    return (
        <div>
            <>
                <div>
                    <Button onClick={() => { context.setCurrentView(CurrentView.AddPlayer); context.setSelectedMitigation(""); }} text="Add Player" />
                    <Button onClick={() => { context.setCurrentView(CurrentView.AddMitigation); context.setSelectedMitigation(""); }} text="Add Mitigation" />
                    {/* <Button onClick={() => {context.setCurrentView(CurrentView.AddBossAction); context.setSelectedMitigation("");}} text="Add Boss Action" /> */}
                </div>
                {form}
            </>
        </div>
    )
}