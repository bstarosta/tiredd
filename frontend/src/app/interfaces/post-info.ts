import {Vote} from "../types/vote";

export interface PostInfo {
  title: string;
  subtireddName: string;
  score: number;
  userVote: Vote;
}
