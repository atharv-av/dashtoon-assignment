export interface Show {
  id: string
  name: string
  thumbNailUrl: string
  genre: string
  rating: number
  description: string
  creator: string
  episodes: Episode[]
}

export interface Episode {
  id: string
  name: string
  panels: Panel[]
}

export interface Panel {
  id: string
  imageUrl: string
}

export interface StoryData {
  show: Show
}

export interface AppState {
  currentStoryIndex: number
  stories: {
    [key: string]: {
      lastPanelIndex: number
      lastViewedAt: number
    }
  }
}

