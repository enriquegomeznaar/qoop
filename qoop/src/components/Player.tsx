import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export const Player = () => (
  <AudioPlayer
    autoPlay
    src="http://example.com/audio.mp3"
    onPlay={() => console.log("onPlay")}
  />
);
