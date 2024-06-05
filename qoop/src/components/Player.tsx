import { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../styles.css/player.css';

const songs = [
  {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artist: "Artist 1",
    title: "Song 1",
  },
  {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artist: "Artist 2",
    title: "Song 2",
  },
  {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artist: "Artist 3",
    title: "Song 3",
  },
];

export const Player = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleClickNext = () => {
    console.log('Next button clicked');
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handleClickPrevious = () => {
    console.log('Previous button clicked');
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  return (
    <div className="audio-player-container">
      <AudioPlayer
        src={songs[currentSongIndex].url}
        onPlay={() => console.log(currentSongIndex)}
        layout="horizontal"
        showJumpControls={false}
        showSkipControls={true}
        showFilledVolume={false}
        customAdditionalControls={[]}
        customProgressBarSection={[]}
        progressJumpStep={10}
        showFilledProgress={false}
        onEnded={handleClickNext}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrevious}
      />
    </div>
  );
};
