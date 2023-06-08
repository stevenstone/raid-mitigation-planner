import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentView, TimelineContext } from "../../TimelineContext";
import { Button } from "../Button";
import AddMitigation from "./AddMitigation";
import AddPlayer from "./AddPlayer";
import DeletePlayer from "./DeletePlayer";
import EditMitigation from "./EditMitigation";
import ImportExport from "./ImportExport";

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
            case CurrentView.DeletePlayer:
                setForm(<DeletePlayer /> as JSX.Element);
                break;
            case CurrentView.Export:
                setForm(<ImportExport readonly={true} />);
                break;
            case CurrentView.Import:
                setForm(<ImportExport readonly={false} />);
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
                    <Button onClick={() => { context.saveToLocalStorage() }} text="Save To Storage" />
                    <Button onClick={() => { context.setCurrentView(CurrentView.Export); }} text="Export Mits" />
                    <Button onClick={() => { context.setCurrentView(CurrentView.Import); }} text="Import Mits" />
                </div>
                {form}
            </>
        </div>
    )
}