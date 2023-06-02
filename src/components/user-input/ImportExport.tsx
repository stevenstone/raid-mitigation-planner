import React, { FC, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { TimelineContext } from "../../TimelineContext"
import { Button } from "../Button";

interface ImportExportProps {
    readonly: boolean;
}

const AddMitigation: FC<ImportExportProps> = (props: ImportExportProps) => {
    const context = useContext(TimelineContext);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaValue, setTextareaValue] = useState(context.lastSavedToStorage);

    useEffect(() => {
        setTextareaValue(context.lastSavedToStorage);
    }, [context.lastSavedToStorage])

    return (
        <>
            <div>{props.readonly ? "Export" : "Import"}</div>
            <textarea readOnly={props.readonly} ref={textareaRef} value={textareaValue} rows={12} onChange={(e) => setTextareaValue(e.target.value)} />
            {!props.readonly && <Button onClick={() => context.importToLocalStorage(textareaRef.current?.value || "")} text="Import" />}
        </>
    )
}

export default AddMitigation;
