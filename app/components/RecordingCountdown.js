import CountdownComponent from "./CountdownComponent";
export default function RecordingCountdown({ time, onComplete, label = 'Recording Countdown' }) {
    return (
        <CountdownComponent time={time} onComplete={onComplete} label={label} />
    );
}