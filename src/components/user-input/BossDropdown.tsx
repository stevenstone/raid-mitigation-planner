import React from "react";
import { useContext, useMemo } from "react";
import { bossFiles } from "../../data/bossFiles";
import { TimelineContext } from "../../TimelineContext";

export const BossDropdown = () => {
    const timelineContext = useContext(TimelineContext);

    const options = useMemo(() => {
        return Object.keys(bossFiles).map((displayName) => <option key={displayName} value={displayName}>{displayName}</option>);
    }, []);

    const updateSelectedBoss = (value: string) => {
        timelineContext.setSelectedBossFile(value);
    }

    return (
        <select
            value={timelineContext.selectedBossFile}
            onChange={(e) => updateSelectedBoss(e.target.value)}
        >
            {options}
        </select>
    )
}