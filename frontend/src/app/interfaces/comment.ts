export interface Comment {
  id: number
  authorName: string
  createdAt: Date
  text: string
  replies: Comment[]
}
