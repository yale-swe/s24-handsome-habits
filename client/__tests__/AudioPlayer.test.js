import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import { Audio } from "expo-av";
import { useAuth } from "../src/components/authContext";
import AudioPlayer from "../src/components/AudioPlayer";

jest.mock("expo-av", () => ({
    Audio: {
        Sound: jest.fn().mockReturnValue({
        loadAsync: jest.fn().mockResolvedValue(),
        setIsLoopingAsync: jest.fn().mockResolvedValue(),
        playAsync: jest.fn().mockResolvedValue(),
        unloadAsync: jest.fn().mockResolvedValue(),
        }),
        setAudioModeAsync: jest.fn().mockResolvedValue(),
    },
    InterruptionModeIOS: {
        DoNotMix: "mock-do-not-mix",
    },
}));

jest.mock("../src/components/authContext", () => ({
    useAuth: jest.fn(),
}));

jest.mock("../src/assets/music/handsome_habit_theme_song.mp3", () => ({
    themeSongPath: "mocked-theme-song-path"
 }));

// Test wrapper component
const TestComponent = () => {
  return <AudioPlayer />;
};

describe("AudioPlayer", () => {
    beforeEach(() => {
        useAuth.mockImplementation(() => ({
        isAuthenticated: false,
        setAudioControl: jest.fn()
        }));
    });
    afterEach(() => {
        cleanup();
    });

    it("does nothing when not authenticated", () => {
        useAuth.mockReturnValue({
        isAuthenticated: false,
        setAudioControl: jest.fn(),
        });

        render(<TestComponent />);
        const soundObject = Audio.Sound();

        expect(soundObject.loadAsync).not.toHaveBeenCalled();
        expect(soundObject.playAsync).not.toHaveBeenCalled();
    });

    it("unloads the audio on unmount when authenticated", () => {
        const setAudioControl = jest.fn();
        useAuth.mockReturnValue({
        isAuthenticated: true,
        setAudioControl,
        });

        const { unmount } = render(<TestComponent />);
        const soundObject = Audio.Sound();

        unmount();
        expect(soundObject.unloadAsync).toHaveBeenCalled();
    });
});
