export interface Comment {
  id: number
  text: string
  authorName: string
  createdAt: Date
  parentCommentId: number
  replies: Comment[]
}
