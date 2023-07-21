import React, { useContext, useEffect, useRef, useState } from "react";
import { CurrentView, TimelineContext } from "../../TimelineContext";

interface PlayerRowProps {
    job: string;
}

export const PlayerRow = (props: PlayerRowProps) => {
    const [mitigations, setMitigations] = useState<JSX.Element[]>([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const { pixelsPerSecond, rowHeight, rowWidth, savedMitigations, selectedMitigation, setCurrentView, setSelectedMitigation } = useContext(TimelineContext);
    const labelRef = useRef<HTMLDivElement>(null);

    const numberOfMitTypes = (savedMitigations.mitigations.find((mits) => mits.job === props.job)!.mitigations.reduce((result, current) => {
        result.add(current.name);
        return result;
    }, new Set<string>())).size;

    useEffect(() => {
        const jobMits = savedMitigations.mitigations.find((job) => job.job === props.job)?.mitigations || [];
        const renderedMits: JSX.Element[] = [];
        const mitTops: { [key: string]: string } = {};
        jobMits.forEach((mit) => {
            if (!mitTops[mit.name]) {
                const length = Object.keys(mitTops).length;
                mitTops[mit.name] = `${length * 30}px`;
            }
        })

        jobMits.forEach((mit, index) => {
            const mitLeft = mit.time * pixelsPerSecond;
            const key = `${props.job}:${index}`
            const mitMarker = (
                <div
                    key={key}
                    className={`mitigation ${selectedMitigation === key ? "selected" : ""}`}
                    style={{
                        left: `${mitLeft}px`,
                        top: mitTops[mit.name],
                        width: `${mit.duration * pixelsPerSecond}px`,
                    }}
                    data-name={mit.name}
                    onClick={() => { setSelectedMitigation(key); setCurrentView(CurrentView.EditMitigation); }}
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

    }, [savedMitigations, selectedMitigation]);

    return (
        <div
            className="timeline-row player"
            style={{
                height: `${isExpanded ? `${numberOfMitTypes * parseInt(rowHeight, 10)}px` : rowHeight}`,
                width: `${parseInt(rowWidth, 10) + (Math.ceil(labelRef?.current?.getBoundingClientRect().width || 0))}px`
            }}
        >
            <div
                className="timeline-row-label"
                ref={labelRef}
                onClick={() => { setSelectedMitigation(props.job); setCurrentView(CurrentView.DeletePlayer); }}
            >
                {props.job}
            </div>
            <div className="timeline-row-line" data-id={props.job} style={{ width: rowWidth }}>{mitigations}</div>
        </div>
    );
}