import { useEffect } from "react";
import { Audio } from "expo-av";
import { useAuth } from "./authContext";

const AudioPlayer = () => {
    const { isAuthenticated, setAudioControl } = useAuth();
    useEffect(() => {
      if (isAuthenticated) {
        const soundObject = new Audio.Sound();
        // eslint-disable-next-line
        async function configureAudioSession() {
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            staysActiveInBackground: false,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
          });
        }
        // eslint-disable-next-line
        async function loadAndPlay() {
          try {
            await soundObject.loadAsync(require("../assets/music/handsome_habit_theme_song.mp3"));
            await soundObject.setIsLoopingAsync(true);
            await soundObject.playAsync();
            setAudioControl(soundObject); // Save sound object in context
          } catch (error) {
            console.error("Failed to load and play sound:", error);
          }
        }
        loadAndPlay();
        return () => {
          soundObject.unloadAsync(); // Stop the sound when the app is not active
        };
      }
    }, [isAuthenticated]);

    return null;
  };

  export default AudioPlayer;
