import React from "react";
import { useContext, useMemo } from "react";
import { bossFiles } from "../../data/bossFiles";
import { TimelineContext } from "../../TimelineContext";

export const BossDropdown = () => {
    const timelineContext = useContext(TimelineContext);

    const options = useMemo(() => {
        return Object.entries(bossFiles).map(([key, value]) => <option key={key} value={key}>{value.displayName}</option>);
    }, []);

    const updateSelectedBoss = (value: string) => {
        timelineContext.setSelectedBossFile(value);
    }

    return (
        <select
            value={timelineContext.selectedBossFile}
            onChange={(e) => updateSelectedBoss(e.target.value)}
            className="boss-dropdown"
        >
            {options}
        </select>
    )
}