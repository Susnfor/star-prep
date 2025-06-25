import CountdownComponent from "./CountdownComponent";
export default function PrepCountdown({ time, onComplete, label = 'Prep Countdown' }) {
    return (
        <CountdownComponent time={time} onComplete={onComplete} label={label} />
    );
}