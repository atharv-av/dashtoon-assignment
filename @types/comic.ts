type Panel = {
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
};

type Episode = {
  id: string;
  name: string;
  showId: string;
  releaseDate: number;
  state: string;
  panels: Panel[];
  thumbNailUrl: string;
  sequence: number;
};

type Show = {
  id: string;
  name: string;
  creator: string;
  description: string;
  genre: string;
  rating: number;
  episodes: Episode[];
  metadata: {
    id: string;
    type: string;
    value: string;
  }[];
};
