export type drawingRequest = {
  daily: string;
  description: string;
  image: string;
  user: string;
};

export type drawingResponse = {
  daily: {
    date: string;
    id: string;
    seed: number;
    word: string;
  };
  description: string;
  disliked_by: {
    background: string;
    id: string;
    profile_picture: string;
    username: string;
  }[];
  dislikes: number;
  id: string;
  image: string;
  liked_by: {
    background: string;
    id: string;
    profile_picture: string;
    username: string;
  }[];
  likes: number;
  user: {
    background: string;
    id: string;
    profile_picture: string;
    username: string;
  };
};
