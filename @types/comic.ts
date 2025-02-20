export interface Panel {
    id: string;
    imageUrl: string;
    episodeId: string;
    sequence: number;
    metadata: {
      height: number;
      width: number;
    };
    createdAt: number;
    updatedAt: number;
  }
  
  export interface Episode {
    id: string;
    name: string;
    showId: string;
    releaseDate: number;
    state: string;
    panels: Panel[];
    thumbNailUrl: string;
    sequence: number;
    createdAt: number;
    updatedAt: number;
  }
  
  export interface Show {
    id: string;
    name: string;
    creator: string;
    createdAt: number;
    description: string;
    genre: string;
    trope: string;
    rating: number;
    state: string;
    updatedAt: number;
    thumbNailUrl: string | null;
    category: string;
    editorScore: number;
    createdBy: string;
    userId: string;
    episodes: Episode[];
  }
  
  export interface StoryData {
    show: Show;
    userData: {
      userId: string;
      userName: string;
      photoURL: string;
    };
    userRating: null;
    userReaction: null;
  }
  
  export interface AppState {
    currentStoryIndex: number;
    stories: {
      [key: string]: {
        lastPanelIndex: number;
        lastViewedAt: number;
      };
    };
  }