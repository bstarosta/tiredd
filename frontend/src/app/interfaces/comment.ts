export interface Comment {
  id: number
  author: string
  timestamp: Date
  text: string
  replies: Comment[]
}
