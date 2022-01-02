import {VoteType} from "../types/voteType";
import {Post} from "./post";

export interface PostListItemInfo extends Post {
  subtireddName: string;
  authorName: string;
  userVote: VoteType;
}
