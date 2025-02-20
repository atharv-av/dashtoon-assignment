"use client"

import { useState, useEffect } from "react"
import type { StoryData, AppState } from "@/@types/comic"
import StoryView from "@/components/story-view"
import StoryList from "@/components/story-list"

const INITIAL_STATE: AppState = {
  currentStoryIndex: 0,
  stories: {},
}

export default function Home() {
  const [data, setData] = useState<StoryData[]>([])
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE)
  const [showList, setShowList] = useState(false)

  // Load initial data
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setData)
  }, [])

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("appState")
    if (saved) {
      setAppState(JSON.parse(saved))
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState))
  }, [appState])

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
    }))
  }

  const handleStorySelect = (index: number) => {
    setAppState((prev) => ({
      ...prev,
      currentStoryIndex: index,
    }))
    setShowList(false)
  }

  const handleNextStory = () => {
    setAppState((prev) => ({
      ...prev,
      currentStoryIndex: Math.min(prev.currentStoryIndex + 1, data.length - 1),
    }))
  }

  const handlePrevStory = () => {
    setAppState((prev) => ({
      ...prev,
      currentStoryIndex: Math.max(prev.currentStoryIndex - 1, 0),
    }))
  }

  if (!data.length) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  const currentStory = data[appState.currentStoryIndex]?.show
  const currentStoryState = appState.stories[currentStory?.id || ""]

  return (
    <div className="h-screen w-screen overflow-hidden">
      {showList ? (
        <StoryList
          stories={data.map((d) => d.show)}
          currentStoryId={currentStory?.id}
          readingHistory={appState.stories}
          onSelect={handleStorySelect}
          onClose={() => setShowList(false)}
        />
      ) : (
        <>
          {currentStory && (
            <StoryView
              story={currentStory}
              initialPanelIndex={currentStoryState?.lastPanelIndex || 0}
              onPanelChange={(index) => handlePanelChange(currentStory.id, index)}
              onShowList={() => setShowList(true)}
              onNextStory={handleNextStory}
              onPrevStory={handlePrevStory}
            />
          )}
        </>
      )}
    </div>
  )
}

