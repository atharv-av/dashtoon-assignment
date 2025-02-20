"use client";

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { StoryData, AppState } from '@/@types/comic';
import StoryView from '@/components/story-view';

export default function Home() {
  const [data, setData] = useState<StoryData[]>([]);
  const [appState, setAppState] = useState<AppState>({
    currentStoryIndex: 0,
    stories: {},
  });

  // Load initial data
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('appState');
    if (saved) {
      setAppState(JSON.parse(saved));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(appState));
  }, [appState]);

  const handleSwipeLeft = () => {
    setAppState((prev) => ({
      ...prev,
      currentStoryIndex: Math.min(prev.currentStoryIndex + 1, data.length - 1),
    }));
  };

  const handleSwipeRight = () => {
    setAppState((prev) => ({
      ...prev,
      currentStoryIndex: Math.max(prev.currentStoryIndex - 1, 0),
    }));
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackTouch: true,
    delta: 50,
  });

  const handlePanelChange = (storyId: string, panelIndex: number) => {
    setAppState((prev) => ({
      ...prev,
      stories: {
        ...prev.stories,
        [storyId]: {
          lastPanelIndex: panelIndex,
          lastViewedAt: Date.now(),
        },
      },
    }));
  };

  if (!data.length) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentStory = data[appState.currentStoryIndex]?.show;
  const currentStoryState = appState.stories[currentStory?.id || ''];

  return (
    <div {...handlers} className="h-screen w-screen overflow-hidden">
      {currentStory && (
        <StoryView
          story={currentStory}
          initialPanelIndex={currentStoryState?.lastPanelIndex || 0}
          onPanelChange={(index) => handlePanelChange(currentStory.id, index)}
        />
      )}
    </div>
  );
}