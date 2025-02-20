"use client"

import { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import comicsData from "@/data/comics.json"

type Panel = {
  id: string
  imageUrl: string
  sequence: number
}

type Episode = {
  id: string
  name: string
  panels: Panel[]
}

type Show = {
  id: string
  name: string
  description: string
  thumbNailUrl: string | null
  episodes: Episode[]
}

type ComicData = {
  show: Show
}

export function ComicReader() {
  const [currentShowIndex, setCurrentShowIndex] = useState(0)
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  useEffect(() => {
    // Load last read position from localStorage
    const lastPosition = localStorage.getItem("comic-reader-position")
    if (lastPosition) {
      const { showIndex, episodeIndex } = JSON.parse(lastPosition)
      setCurrentShowIndex(showIndex)
      setCurrentEpisodeIndex(episodeIndex)
    }
  }, [])

  useEffect(() => {
    // Save current position to localStorage
    localStorage.setItem(
      "comic-reader-position",
      JSON.stringify({
        showIndex: currentShowIndex,
        episodeIndex: currentEpisodeIndex,
      }),
    )
  }, [currentShowIndex, currentEpisodeIndex])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentShowIndex < comicsData.length - 1) {
        setCurrentShowIndex(currentShowIndex + 1)
        setCurrentEpisodeIndex(0)
      }
    },
    onSwipedRight: () => {
      if (currentShowIndex > 0) {
        setCurrentShowIndex(currentShowIndex - 1)
        setCurrentEpisodeIndex(0)
      }
    },
    onSwipedUp: () => {
      const currentShow = comicsData[currentShowIndex].show
      if (currentEpisodeIndex < currentShow.episodes.length - 1) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      }
    },
    onSwipedDown: () => {
      if (currentEpisodeIndex > 0) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
    },
  })

  const currentShow = comicsData[currentShowIndex].show
  const currentEpisode = currentShow.episodes[currentEpisodeIndex]

  return (
    <div {...handlers} className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm">
        <h1 className="text-xl font-bold">{currentShow.name}</h1>
        <h2 className="text-lg">{currentEpisode.name}</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          {currentEpisode.panels.map((panel) => (
            <img
              key={panel.id}
              src={panel.imageUrl || "/placeholder.svg"}
              alt={`Panel ${panel.sequence}`}
              className="w-full"
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-between p-4 bg-background/80 backdrop-blur-sm">
        <Button
          variant="ghost"
          onClick={() => {
            if (currentShowIndex > 0) {
              setCurrentShowIndex(currentShowIndex - 1)
              setCurrentEpisodeIndex(0)
            }
          }}
          disabled={currentShowIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Show
        </Button>
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            onClick={() => {
              if (currentEpisodeIndex > 0) {
                setCurrentEpisodeIndex(currentEpisodeIndex - 1)
              }
            }}
            disabled={currentEpisodeIndex === 0}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (currentEpisodeIndex < currentShow.episodes.length - 1) {
                setCurrentEpisodeIndex(currentEpisodeIndex + 1)
              }
            }}
            disabled={currentEpisodeIndex === currentShow.episodes.length - 1}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            if (currentShowIndex < comicsData.length - 1) {
              setCurrentShowIndex(currentShowIndex + 1)
              setCurrentEpisodeIndex(0)
            }
          }}
          disabled={currentShowIndex === comicsData.length - 1}
        >
          Next Show
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

