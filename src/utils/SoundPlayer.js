import Sound from 'react-native-sound';

class SoundPlayer {
  constructor(filename) {
    this.filename = filename;
  }

  playSound = () => {
    Sound.setCategory('Playback');

    let mp3 = new Sound(this.filename, Sound.MAIN_BUNDLE, error => {
      if (error) {
        return;
      }

      mp3.play(success => {
        if (success) {
        } else {
        }
      });
    });
  };
}

export default SoundPlayer;
