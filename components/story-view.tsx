"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import type { Show } from "@/@types/comic"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface StoryViewProps {
  story: Show
  initialPanelIndex: number
  onPanelChange: (index: number) => void
  onShowList: () => void
  onNextStory: () => void
  onPrevStory: () => void
}

const StoryView: React.FC<StoryViewProps> = ({
  story,
  initialPanelIndex,
  onPanelChange,
  onShowList,
  onNextStory,
  onPrevStory,
}) => {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [currentPanelIndex, setCurrentPanelIndex] = useState(initialPanelIndex)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const currentEpisode = story.episodes[currentEpisodeIndex]
  const totalPanels = currentEpisode.panels.length
  const currentPanel = currentEpisode.panels[currentPanelIndex]

  // Memoize the panel change handler
  const handlePanelIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentPanelIndex(newIndex)
      onPanelChange(newIndex)
    },
    [onPanelChange],
  )

  // Initialize panel index when story changes
  useEffect(() => {
    handlePanelIndexChange(initialPanelIndex)
  }, [initialPanelIndex, handlePanelIndexChange])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd
    const isSwipeDown = distance < -50
    const isSwipeUp = distance > 50

    if (isSwipeUp && currentPanelIndex < totalPanels - 1) {
      handlePanelIndexChange(currentPanelIndex + 1)
    } else if (isSwipeDown && currentPanelIndex > 0) {
      handlePanelIndexChange(currentPanelIndex - 1)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentPanelIndex > 0) {
        handlePanelIndexChange(currentPanelIndex - 1)
      } else if (e.key === "ArrowDown" && currentPanelIndex < totalPanels - 1) {
        handlePanelIndexChange(currentPanelIndex + 1)
      } else if (e.key === "ArrowLeft") {
        onPrevStory()
      } else if (e.key === "ArrowRight") {
        onNextStory()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentPanelIndex, totalPanels, onNextStory, onPrevStory, handlePanelIndexChange])

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="flex justify-between items-center p-4 bg-gray-800/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onShowList}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-white">{story.name}</h1>
        </div>
        <div className="text-sm text-gray-400">
          Panel {currentPanelIndex + 1} of {totalPanels}
        </div>
      </div>

      <div
        className="flex-1 flex items-center justify-center mt-16 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-1/2 -translate-y-1/2 bg-gray-800/50 backdrop-blur-sm z-10"
          onClick={(e) => {
            e.stopPropagation()
            onPrevStory()
          }}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
          <img
            key={currentPanel.id}
            src={currentPanel.imageUrl || "/placeholder.svg"}
            alt={`Panel ${currentPanelIndex + 1}`}
            className={cn(
              "max-w-full max-h-[calc(100vh-8rem)] object-contain transition-opacity duration-300",
              "animate-in fade-in zoom-in-95",
              "md:max-w-[800px]", // Limit width on desktop
            )}
            style={{
              height: "auto", // Let height adjust automatically
              width: "100%", // Take full width up to max-width
            }}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="fixed right-4 top-1/2 -translate-y-1/2 bg-gray-800/50 backdrop-blur-sm z-10"
          onClick={(e) => {
            e.stopPropagation()
            onNextStory()
          }}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentPanelIndex + 1) / totalPanels) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

export default StoryView

