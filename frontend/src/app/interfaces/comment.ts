export interface Comment {
  id: string
  author: string
  timestamp: Date
  text: string
  replies: Comment[]
}
