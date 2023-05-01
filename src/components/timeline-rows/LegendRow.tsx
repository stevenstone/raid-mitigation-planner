import React, { useContext, useEffect, useRef, useState } from "react";
import { TimelineContext } from "../../TimelineContext";

export const LegendRow = () => {
    const [timeMarkers, setTimeMarkers] = useState(new Array<JSX.Element>());
    const { pixelsPerSecond, rowWidth, totalSeconds } = useContext(TimelineContext);
    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newMarkers: JSX.Element[] = [];
        for (let i = 0; i < totalSeconds; i += 10) {
            const minute = Math.floor(i / 60);
            const seconds = i % 60;
            const marker = (
                <span key={i} className="timeline-marker" style={{ "left": `${i * pixelsPerSecond}px` }}>{`${minute}:${seconds || "00"}`}</span>
            )
            newMarkers.push(marker);
        }
        setTimeMarkers(newMarkers);
    }, [totalSeconds, pixelsPerSecond]);

    return (
        <div className="timeline-row legend" style={{ width: `${parseInt(rowWidth, 10) + (Math.ceil(labelRef?.current?.getBoundingClientRect().width || 0))}px` }}>
            <div className="timeline-row-label" ref={labelRef}>Time</div>
            <div className="timeline-row-line" style={{ width: rowWidth }}>{timeMarkers}</div>
        </div>
    );
}