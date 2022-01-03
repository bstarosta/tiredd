import {VoteType} from "../types/voteType";

export interface SubmitVoteOutput {
  type: VoteType
  userId: string
  postId: number
}
