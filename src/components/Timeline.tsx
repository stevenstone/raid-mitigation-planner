import React, { useContext, useEffect, useState } from "react";
import { TimelineContext } from "../TimelineContext";
import { BossRow } from "./timeline-rows/BossRow";
import { LegendRow } from "./timeline-rows/LegendRow";
import { PlayerRow } from "./timeline-rows/PlayerRow";

export const Timeline = () => {
    const context = useContext(TimelineContext);
    const [jobs, setJobs] = useState<string[]>([]);

    useEffect(() => {
        setJobs(context.savedMitigations.mitigations.map((mits) => mits.job));
    }, [context.savedMitigations]);

    return (
        <div className="timeline">
            <LegendRow />
            <BossRow />
            {jobs.map((j) => {
                return (
                    <PlayerRow job={j} key={j} />
                );
            })}
        </div>
    );
}