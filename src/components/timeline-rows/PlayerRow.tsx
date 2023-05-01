import React, { useContext, useEffect, useRef, useState } from "react";
import { TimelineContext } from "../../TimelineContext";

interface PlayerRowProps {
    job: string;
}

export const PlayerRow = (props: PlayerRowProps) => {
    const [mitigations, setMitigations] = useState<JSX.Element[]>([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const { pixelsPerSecond, rowHeight, rowWidth, savedMitigations } = useContext(TimelineContext);
    const labelRef = useRef<HTMLDivElement>(null);

    const numberOfMitTypes = (savedMitigations[props.job].reduce((result, current) => {
        result.add(current.name);
        return result;
    }, new Set<string>())).size;

    useEffect(() => {
        const jobMits = savedMitigations[props.job] || [];
        const renderedMits: JSX.Element[] = [];
        console.log(jobMits);
        const mitTops: { [key: string]: string } = {};
        jobMits.forEach((mit) => {
            if (!mitTops[mit.name]) {
                const length = Object.keys(mitTops).length;
                mitTops[mit.name] = `${length * 30}px`;
            }
        })
        console.log(mitTops);

        jobMits.forEach((mit, index) => {
            const mitLeft = mit.time * pixelsPerSecond;
            const mitMarker = (
                <div
                    key={`${index}-mit`}
                    className="mitigation"
                    style={{
                        left: `${mitLeft}px`,
                        top: mitTops[mit.name],
                        width: `${mit.duration * pixelsPerSecond}px`,
                    }}
                    data-name={mit.name}
                />
            );
            const cooldownMarker = (
                <div
                    key={`${index}-cooldown`}
                    className="cooldown"
                    style={{
                        left: `${mitLeft}px`,
                        top: mitTops[mit.name],
                        width: `${mit.cooldown * pixelsPerSecond}px`,
                    }}
                />
            );

            renderedMits.push(cooldownMarker, mitMarker);
        });
        setMitigations(renderedMits);

    }, [savedMitigations[props.job]]);

    return (
        <div
            className="timeline-row"
            style={{
                height: `${isExpanded ? `${numberOfMitTypes * parseInt(rowHeight, 10)}px` : rowHeight}`,
                width: `${parseInt(rowWidth, 10) + (Math.ceil(labelRef?.current?.getBoundingClientRect().width || 0))}px`
            }}
        >
            <div className="timeline-row-label" ref={labelRef}>{props.job}</div>
            <div className="timeline-row-line" data-id={props.job} style={{ width: rowWidth }}>{mitigations}</div>
        </div>
    );
}