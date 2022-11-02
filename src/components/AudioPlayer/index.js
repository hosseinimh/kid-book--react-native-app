import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import {Slider} from '@miblanchard/react-native-slider';

import * as globalStyles from '../../theme/style';
import {useTheme} from '../../hooks';
import images from '../../theme/images';
import {utils} from '../../utils';

const AudioPlayer = ({filename, containerStyle}) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const {colors} = useTheme();
  const {SIZES, FONTS} = globalStyles;

  let playInterval;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: SIZES.padding1,
      bottom: 30,
      width: SIZES.width - 2 * SIZES.padding1,
      height: 100,
      ...containerStyle,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.background,
      flex: 1,
      width: '100%',
      borderRadius: 5,
      paddingHorizontal: SIZES.padding3,
    },
    sliderContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      marginVertical: 10,
    },
    sliderStyle: {flex: 1},
    sliderText: {
      ...FONTS.body4,
      color: colors.text,
      marginLeft: SIZES.padding3,
      alignSelf: 'center',
      textAlign: 'right',
      width: 60,
    },
    sliderThumb: {
      backgroundColor: colors.white,
      borderRadius: 30 / 2,
      height: 30,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 2,
      width: 30,
    },
    sliderTrack: {
      borderRadius: 1,
      height: 2,
    },
    iconsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingBottom: 30,
      flex: 1,
    },
    iconContainer: {
      width: 30,
      height: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 30,
      height: 30,
    },
  });

  useEffect(() => {
    return () => {
      clearInterval(playInterval);
      audio?.stop();
      audio?.release();
    };
  }, [audio]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    if (await utils.fileExists(filename)) {
      Sound.setCategory('Playback');

      const sound = new Sound(filename, Sound.MAIN_BUNDLE, error =>
        callback(error, sound),
      );
    }
  };

  const callback = (error, sound) => {
    if (error) {
      setAudio(null);

      return;
    }

    setAudio(sound);
    setEndTime(sound.getDuration());
  };

  const togglePlay = () => {
    if (!audio) {
      return;
    }

    if (!isPlaying) {
      audio?.play();
      playInterval = setInterval(() => {
        audio?.getCurrentTime(seconds => setTime(Math.floor(seconds)));
      }, 500);
      setIsPlaying(true);
    } else {
      audio?.pause();
      clearInterval(playInterval);
      setIsPlaying(false);
    }
  };

  const changeCurrentTime = seconds => {
    if (seconds < 0) {
      seconds = 0;
    }

    if (seconds > endTime) {
      seconds = endTime;
    }

    audio?.setCurrentTime(seconds);
    setTime(seconds);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.sliderContainer}>
          <Slider
            value={time}
            minimumValue={0}
            maximumValue={endTime}
            containerStyle={styles.sliderStyle}
            onValueChange={value => changeCurrentTime(Math.floor(value))}
            animateTransitions
            maximumTrackTintColor="#b7b7b7"
            minimumTrackTintColor={colors.sidebarBackground}
            thumbStyle={styles.sliderThumb}
            trackStyle={styles.sliderTrack}
          />
          <Text style={styles.sliderText}>
            {time < 3600
              ? utils.secondsToTimespan(time, 19)
              : utils.secondsToTimespan(time)}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={[styles.iconContainer, {flex: 1}]}>
            <TouchableOpacity onPress={togglePlay}>
              <Image
                style={[styles.icon, isPlaying ? {width: 25, height: 25} : {}]}
                source={isPlaying ? images.pause : images.play}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.iconContainer, {position: 'absolute', right: 0}]}>
            <TouchableOpacity>
              <Image
                style={styles.icon}
                source={images.volume}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
