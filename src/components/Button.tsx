import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    onClick: () => void;
    text: string;
}

export const Button = (props: ButtonProps) => {
    return (
        <button type="button" onClick={props.onClick} className="timeline-button">{props.text}</button>
    )
}