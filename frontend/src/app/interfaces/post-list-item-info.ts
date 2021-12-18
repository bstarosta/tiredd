import {Vote} from "../types/vote";

export interface PostListItemInfo {
  title: string;
  subtireddName: string;
  score: number;
  userVote: Vote;
  timestamp: Date;
  image?: string;
  text?: string;
}
