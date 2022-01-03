import {VoteType} from "../types/voteType";

export interface Vote {
  id: number
  type: VoteType
  userId: string
  postId: number
}
