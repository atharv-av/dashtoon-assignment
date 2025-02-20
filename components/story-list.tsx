"use client"

import type React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import type { Show } from "@/@types/comic"
import StoryCard from "./story-card"

interface StoryListProps {
  stories: Show[]
  currentStoryId?: string
  readingHistory: {
    [key: string]: {
      lastPanelIndex: number
      lastViewedAt: number
    }
  }
  onSelect: (index: number) => void
  onClose: () => void
}

const StoryList: React.FC<StoryListProps> = ({ stories, currentStoryId, readingHistory, onSelect, onClose }) => {
  const continueReading = stories
    .map((story, index) => ({
      story,
      index,
      progress: readingHistory[story.id],
    }))
    .filter((item) => item.progress)
    .sort((a, b) => b.progress.lastViewedAt - a.progress.lastViewedAt)

  return (
    <div className="h-screen bg-gray-900 overflow-hidden flex flex-col">
      <div className="flex items-center p-4 bg-gray-800">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-white ml-2">Library</h1>
      </div>

      <ScrollArea className="flex-1">
        {continueReading.length > 0 && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Continue Reading</h2>
            <div className="grid gap-4">
              {continueReading.map(({ story, index, progress }) => (
                <div key={story.id} className="relative">
                  <StoryCard show={story} onClick={() => onSelect(index)} />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${((progress.lastPanelIndex + 1) / story.episodes[0].panels.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">All Stories</h2>
          <div className="grid gap-4">
            {stories.map((story, index) => (
              <StoryCard
                key={story.id}
                show={story}
                onClick={() => onSelect(index)}
                isActive={story.id === currentStoryId}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default StoryList

