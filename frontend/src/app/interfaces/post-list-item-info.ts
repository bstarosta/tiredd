import {Vote} from "../types/vote";

export interface PostListItemInfo {
  id: string
  title: string;
  subtiredd: string;
  score: number;
  author: string;
  userVote: Vote;
  timestamp: Date;
  image?: string;
  text?: string;
}
