import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import type { Show } from "@/@types/comic"
import StoryCard from "@/components/story-card"

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
    <div className="h-screen bg-gray-950 overflow-hidden flex flex-col">
      <div className="flex items-center p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-gray-200 hover:text-white hover:bg-gray-800"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-gray-100 ml-2">Library</h1>
      </div>

      <ScrollArea className="flex-1 px-4">
        {continueReading.length > 0 && (
          <div className="py-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {continueReading.map(({ story, index, progress }) => (
                <div key={story.id} className="relative">
                  <StoryCard show={story} onClick={() => onSelect(index)} />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all duration-300"
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

        <div className="py-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">All Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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