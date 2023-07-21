import React, { FC, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { players } from "../../data/players";
import { TimelineContext } from "../../TimelineContext"
import { Button } from "../Button";

interface ImportExportProps {
    readonly: boolean;
}

const AddMitigation: FC<ImportExportProps> = (props: ImportExportProps) => {
    const context = useContext(TimelineContext);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaValue, setTextareaValue] = useState("");

    useEffect(() => {
        console.log(context.savedMitigations.mitigations.find((mits) => mits.job === context.selectedJob));
        if (props.readonly) {
            setTextareaValue(JSON.stringify(context.savedMitigations.mitigations.find((mits) => mits.job === context.selectedJob)?.mitigations || {}));
        } else {
            setTextareaValue("");
        }
    }, [context.savedMitigations, context.selectedJob, props.readonly]);

    return (
        <>
            <div>{props.readonly ? "Export" : "Import"}</div>
            <div>Fight: {context.selectedBossFile}</div>
            <div>
                <label htmlFor="job-selection">Job:</label>
                <select onChange={(e) => { context.setSelectedJob(e.target.value) }}>
                    <option></option>
                    {Object.keys(players).map((job) => <option value={job} key={job}>{job}</option>)}
                </select>
            </div>
            <textarea readOnly={props.readonly} ref={textareaRef} value={textareaValue} rows={12} onChange={(e) => setTextareaValue(e.target.value)} />
            {!props.readonly && <Button onClick={() => context.importToLocalStorage(textareaRef.current?.value || "")} text="Import" />}
        </>
    )
}

export default AddMitigation;
