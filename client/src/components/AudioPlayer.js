import { useEffect } from "react";
import { Audio, InterruptionModeIOS } from "expo-av";
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
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            staysActiveInBackground: false,
          });
        }
        // eslint-disable-next-line
        async function loadAndPlay() {
          try {
            await configureAudioSession();
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
