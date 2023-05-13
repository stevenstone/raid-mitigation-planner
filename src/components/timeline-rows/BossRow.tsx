import React, { useContext, useMemo, useRef, useState } from "react"
import { useEffect } from "react"
import { convertTimeStringToSeconds } from "../../utility/timeCalculations";
import { TimelineContext } from "../../TimelineContext";
import { bossFiles } from "../../data/bossFiles";

export const BossRow = () => {
    const [bossAttacks, setBossAttacks] = useState<JSX.Element[]>([]);
    const { selectedBossFile, pixelsPerSecond, rowWidth } = useContext(TimelineContext);
    const labelRef = useRef<HTMLDivElement>(null);

    const bossData = useMemo(() => {
        return bossFiles[selectedBossFile];
    }, [selectedBossFile]);

    useEffect(() => {
        const newBossAttacks: JSX.Element[] = [];
        bossData?.file.attacks.forEach((attack, index) => {
            const leftPosition = convertTimeStringToSeconds(attack.time) * pixelsPerSecond;
            newBossAttacks.push(
                <React.Fragment key={index}>
                    <div
                        key={`${index}-cast-time`}
                        className="cast-time"
                        style={{
                            left: `${(leftPosition - (attack.castTime * pixelsPerSecond))}px`,
                            width: `${attack.castTime * pixelsPerSecond}px`,
                        }}
                    />
                    <div
                        key={`${index}-attack`}
                        className="attack"
                        style={{
                            left: `${leftPosition}px`,
                            width: `${pixelsPerSecond}px`,
                        }}
                        data-name={`${attack.name}`}
                    />
                </React.Fragment>
            );
        });
        setBossAttacks(newBossAttacks);
    }, [pixelsPerSecond, bossData]);

    return (
        <div className="timeline-row boss" style={{ width: `${parseInt(rowWidth, 10) + (Math.ceil(labelRef?.current?.getBoundingClientRect().width || 0))}px` }}>
            <div className="timeline-row-label" ref={labelRef}>P8S</div>
            <div className="timeline-row-line" style={{ width: rowWidth }}>{bossAttacks}</div>
        </div>
    );
}