export const convertTimeStringToSeconds = (timeString: string) => {
    const timeArray = timeString.split(":");
    return (parseInt(timeArray[0], 10) * 60) + parseInt(timeArray[1], 10);;
}

export const convertSecondsToTimeString = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString();
    let seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}