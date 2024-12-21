'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageSquare, MoreHorizontal, CheckCircle2, Search, Plus, X, Reply, Trash2, ArrowUpDown } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'

type Status = 'Shipped' | 'In Progress' | 'Pending'

interface Comment {
  id: number
  author: string
  content: string
  timeAgo: string
  likes: number
  replies?: Comment[]
}

type CommentsType = {
  [key: number]: Comment[]
}

// Mock comments data with replies support
const mockComments: CommentsType = {
  1: [
    { id: 1, author: 'Sarah', content: 'Have you tried using media queries?', timeAgo: '5 hours ago', likes: 0, replies: [] },
    { id: 2, author: 'Mike', content: 'I had the same issue, check the documentation about responsive design.', timeAgo: '10 hours ago', likes: 0, replies: [] },
    { id: 3, author: 'Alex', content: 'Try using the breakpoints feature.', timeAgo: '12 hours ago', likes: 0, replies: [] },
    { id: 4, author: 'Emma', content: 'Here\'s a helpful resource on responsive design.', timeAgo: '15 hours ago', likes: 0, replies: [] },
    { id: 5, author: 'John', content: 'Make sure to test on different devices.', timeAgo: '20 hours ago', likes: 0, replies: [] }
  ],
  2: [
    { id: 6, author: 'Lisa', content: 'Check your server logs for more details.', timeAgo: '25 hours ago', likes: 0, replies: [] },
    { id: 7, author: 'Mark', content: 'Are you using the correct deployment settings?', timeAgo: '30 hours ago', likes: 0, replies: [] },
    { id: 8, author: 'Paul', content: 'This might be a permissions issue.', timeAgo: '35 hours ago', likes: 0, replies: [] },
    { id: 9, author: 'Sarah', content: 'Try clearing your cache.', timeAgo: '40 hours ago', likes: 0, replies: [] },
    { id: 10, author: 'David', content: 'Make sure your SSL is configured correctly.', timeAgo: '45 hours ago', likes: 0, replies: [] },
    { id: 11, author: 'Anna', content: 'Have you checked the firewall settings?', timeAgo: '50 hours ago', likes: 0, replies: [] },
    { id: 12, author: 'Tom', content: 'This happened to me too, check your DNS settings.', timeAgo: '55 hours ago', likes: 0, replies: [] }
  ],
  3: [
    { id: 13, author: 'Chris', content: 'Have you looked at the scroll behavior property?', timeAgo: '1 hour ago', likes: 0, replies: [] },
    { id: 14, author: 'Maya', content: 'You might want to try using CSS animations.', timeAgo: '1.5 hours ago', likes: 0, replies: [] }
  ],
  4: [
    { id: 15, author: 'James', content: 'Did you validate the form submission endpoint?', timeAgo: '2 hours ago', likes: 0, replies: [] }
  ],
  6: [
    { id: 16, author: 'Sophie', content: 'What specific text issues are you experiencing?', timeAgo: '2.5 hours ago', likes: 0, replies: [] }
  ]
}

const supportTopics = [
  {
    id: 1,
    title: 'Confused About Breakpoints in Framer: Need Help with Responsive Logic!',
    author: 'Abon',
    avatar: 'https://ms-application-assets.s3.amazonaws.com/member-profile-images/173431740241467290856b4c9a60f34a4b78a_image%20%288%29-p-500.png',
    initials: 'AX',
    avatarColor: 'bg-indigo-500',
    timeAgo: '17 minutes ago',
    likes: 0,
    comments: 5,
    solved: true,
    status: 'Shipped',
  },
  {
    id: 2,
    title: 'Published project. Web working fine but iOS says 404 forbidden',
    author: 'Richard',
    avatar: 'https://ms-application-assets.s3.amazonaws.com/member-profile-images/173431740241467290856b4c9a60f34a4b78a_image%20%288%29-p-500.png',
    initials: 'RW',
    avatarColor: 'bg-emerald-500',
    timeAgo: '33 minutes ago',
    likes: 0,
    comments: 7,
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Circle Scroll Effect?',
    author: 'Lautaro',
    avatar: 'https://ms-application-assets.s3.amazonaws.com/member-profile-images/173431740241467290856b4c9a60f34a4b78a_image%20%288%29-p-500.png',
    initials: 'LL',
    avatarColor: 'bg-pink-500',
    timeAgo: '44 minutes ago',
    likes: 0,
    comments: 2,
    solved: true,
    status: 'Shipped',
  },
  {
    id: 4,
    title: 'Forms Submissions Issue with Audienceful.com',
    author: 'Abdulmajeed',
    avatar: 'https://ms-application-assets.s3.amazonaws.com/member-profile-images/173431740241467290856b4c9a60f34a4b78a_image%20%288%29-p-500.png',
    initials: 'A',
    avatarColor: 'bg-orange-500',
    timeAgo: '58 minutes ago',
    likes: 0,
    comments: 1,
    solved: true,
    status: 'Shipped',
  },
  {
    id: 5,
    title: 'Framer Partner badge not showing',
    author: 'Conner',
    avatar: 'https://ms-application-assets.s3.amazonaws.com/member-profile-images/173431740241467290856b4c9a60f34a4b78a_image%20%288%29-p-500.png',
    initials: 'C',
    avatarColor: 'bg-cyan-500',
    timeAgo: '1 hour ago',
    likes: 0,
    comments: 0,
    status: 'Pending',
  },
  {
    id: 6,
    title: 'Problem with text, please help',
    author: 'Conner',
    avatar: 'https://ms-application-assets.s3.amazonaws.com/member-profile-images/173431740241467290856b4c9a60f34a4b78a_image%20%288%29-p-500.png',
    initials: 'V',
    avatarColor: 'bg-violet-500',
    timeAgo: '1 hour ago',
    likes: 1,
    comments: 1,
    status: 'Pending',
  },
]

export default function Page() {
  const [topics, setTopics] = useState(supportTopics)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeComments, setActiveComments] = useState<{ id: number; isOpen: boolean }>({ id: 0, isOpen: false })
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<{ commentId: number | null, author: string | null }>({ commentId: null, author: null })
  const [comments, setComments] = useState<CommentsType>(mockComments)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; commentId: number | null }>({
    isOpen: false,
    commentId: null
  })
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [sortBy, setSortBy] = useState<'newest' | 'latest' | 'most-liked' | 'most-commented'>('most-liked') 
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false)
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    content: ''
  })
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())

const handleCommentLike = (commentId: number) => {
    setLikedComments(prev => {
      const newLikedComments = new Set(prev)
      if (newLikedComments.has(commentId)) {
        newLikedComments.delete(commentId)
      } else {
        newLikedComments.add(commentId)
      }
      return newLikedComments
    })

    setComments(prev => {
      const updatedComments = { ...prev }
      Object.keys(updatedComments).forEach(topicId => {
        const numericTopicId = parseInt(topicId)
        if (updatedComments[numericTopicId]) {
          updatedComments[numericTopicId] = updatedComments[numericTopicId].map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.likes + (likedComments.has(commentId) ? -1 : 1)
              }
            }
            return comment
          })
        }
      })
      return updatedComments
    })
  }

  const filteredAndSortedTopics = topics
    .filter(topic =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return getTimeInMilliseconds(b.timeAgo) - getTimeInMilliseconds(a.timeAgo);
        case 'latest':
          return getTimeInMilliseconds(a.timeAgo) - getTimeInMilliseconds(b.timeAgo);
        case 'most-liked':
          return b.likes - a.likes;
        case 'most-commented':
          return b.comments - a.comments;
        default:
          return b.likes - a.likes;
      }
    });

  const handleCommentsClick = (topicId: number) => {
    setActiveComments({ id: topicId, isOpen: true })
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      author: 'You',
      content: newComment,
      timeAgo: 'just now',
      likes: 0,
      replies: []
    }

    setTopics(prev => prev.map(topic =>
      topic.id === activeComments.id
        ? { ...topic, comments: (topic.comments || 0) + 1 }
        : topic
    ))

    if (replyTo.commentId) {
      setComments(prev => {
        const topicComments = [...(prev[activeComments.id] || [])]
        const parentComment = topicComments.find(c => c.id === replyTo.commentId)
        if (parentComment) {
          parentComment.replies = [...(parentComment.replies || []), comment]
        }
        return { ...prev, [activeComments.id]: topicComments }
      })
      setReplyTo({ commentId: null, author: null })
    } else {
      setComments(prev => ({
        ...prev,
        [activeComments.id]: [comment, ...(prev[activeComments.id] || [])]
      }))
    }
    setNewComment('')
  }

  const handleDeleteClick = (commentId: number) => {
    setDeleteConfirm({ isOpen: true, commentId })
  }

  const handleConfirmDelete = () => {
    if (deleteConfirm.commentId) {
      setComments(prev => {
        const topicComments = prev[activeComments.id] || []
        const updatedComments = topicComments.filter(comment => {
          if (comment.id === deleteConfirm.commentId) return false
          if (comment.replies) {
            comment.replies = comment.replies.filter(reply => reply.id !== deleteConfirm.commentId)
          }
          return true
        })

        const oldTotal = topicComments.reduce((acc, comment) =>
          acc + 1 + (comment.replies?.length || 0), 0
        )
        const newTotal = updatedComments.reduce((acc, comment) =>
          acc + 1 + (comment.replies?.length || 0), 0
        )

        setTopics(prev => prev.map(topic =>
          topic.id === activeComments.id
            ? { ...topic, comments: topic.comments - (oldTotal - newTotal) }
            : topic
        ))

        return {
          ...prev,
          [activeComments.id]: updatedComments
        }
      })
    }
    setDeleteConfirm({ isOpen: false, commentId: null })
    setActiveComments(prev => ({ ...prev, isOpen: true }))
  }

  const handleReply = (commentId: number, author: string) => {
    setReplyTo({ commentId, author })
    setNewComment(`@${author} `)
  }

  const handleLike = (topicId: number) => {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev)
      if (newLikedPosts.has(topicId)) {
        newLikedPosts.delete(topicId)
      } else {
        newLikedPosts.add(topicId)
      }
      return newLikedPosts
    })

    setTopics(prev => prev.map(topic =>
      topic.id === topicId
        ? { ...topic, likes: topic.likes + (likedPosts.has(topicId) ? -1 : 1) }
        : topic
    ))
  }

  const handleNewPost = () => {
    if (!newPostForm.title.trim() || !newPostForm.content.trim() || newPostForm.title.length > 50) return

    const newPost = {
      id: Date.now(),
      title: newPostForm.title.substring(0, 50),
      content: newPostForm.content,
      author: 'You',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'YO',
      avatarColor: 'bg-[#5b06be]',
      timeAgo: 'just now',
      likes: 0,
      comments: 0,
      solved: false,
      status: 'Pending'
    }

    setTopics(prev => [newPost, ...prev])
    setNewPostForm({ title: '', content: '' })
    setNewPostDialogOpen(false)
  }

// In support.tsx, update the first section:

return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          {/* This is the guidelines card */}
          <Card className="mb-6 bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Guidelines for a Successful Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Use this space if you require support related to Framer. For all code-related enquiries, use our{' '}
                <span className="text-[#5b06be] font-semibold">code</span> space instead & for anything Plugin related, use our{' '}
                <span className="text-[#5b06be] font-semibold">plugin</span> space.
              </p>
              <p className="text-gray-700">
                Always search the help center and the community beforehand to ensure that the same issue hasn't already been solved.
              </p>
              <p className="text-gray-700">
                Please provide as many details as possible on your problem, expectations, what you tried, and other info that might help us narrow down the problem - include screenshots or screen recording if needed.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-gray-200 focus:border-[#5b06be] focus:ring-2 focus:ring-[#5b06be] focus:ring-opacity-50"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <Select
                  value={sortBy}
                  onValueChange={(value: 'newest' | 'latest' | 'most-liked' | 'most-commented') => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px] rounded-full">
                    <Image
                      src="/api/placeholder/16/16"
                      alt="Sort"
                      width={16}
                      height={16}
                    />
                    <SelectValue placeholder="Most liked" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="most-liked">Most liked</SelectItem>
                    <SelectItem value="most-commented">Most commented</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setNewPostDialogOpen(true)}
                  variant="purple"
                  size="rounded"
                  className="flex items-center gap-2"
                >
                  <Plus size={20} />
                  <span>Create New Post</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {filteredAndSortedTopics.map((topic, index) => (
            <div key={topic.id} className="group">
              <div className="p-6 transition duration-150 ease-in-out hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-grow">
                    <Avatar className="h-12 w-12 rounded-full">
                      <AvatarImage src={topic.avatar} alt={topic.author} />
                      <AvatarFallback className={`${topic.avatarColor} text-white`}>{topic.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#5b06be] transition duration-150 ease-in-out flex items-center gap-2">
                        <span className="flex-grow truncate max-w-[calc(100%-120px)]" title={topic.title}>
                          {topic.title.length > 50 ? `${topic.title.substring(0, 50)}...` : topic.title}
                        </span>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <button
                            onClick={() => handleLike(topic.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-[#5b06be] transition duration-150 ease-in-out"
                          >
                            <Heart className={`w-5 h-5 ${likedPosts.has(topic.id) ? 'fill-[#5b06be] text-[#5b06be]' : ''}`} />
                            <span className="text-sm">{topic.likes}</span>
                          </button>
                          <button
                            onClick={() => handleCommentsClick(topic.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-[#5b06be] transition duration-150 ease-in-out"
                          >
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-sm">{topic.comments}</span>
                          </button>
                        </div>
                      </h3>
                      <p className="text-sm text-gray-500">
                        Posted {topic.timeAgo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {index < filteredAndSortedTopics.length - 1 && <hr className="border-gray-100" />}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={activeComments.isOpen} onOpenChange={(isOpen) => {
        setActiveComments(prev => ({ ...prev, isOpen }))
        if (!isOpen) {
          setReplyTo({ commentId: null, author: null })
          setNewComment('')
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Comments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-[#5b06be] scrollbar-track-gray-100 hover:scrollbar-thumb-[#4a05a0]">
              {comments[activeComments.id]?.length > 0 ? (
                comments[activeComments.id].map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#5b06be]">{comment.author}</span>
                          <span className="text-sm text-gray-500">{comment.timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className="text-gray-500 hover:text-[#5b06be] transition-colors"
                          >
                            <Heart className={`w-4 h-4 ${likedComments.has(comment.id) ? 'fill-[#5b06be] text-[#5b06be]' : ''}`} />
                          </button>
                          <span className="text-sm text-gray-500">{comment.likes || 0}</span>
                          <button
                            onClick={() => handleReply(comment.id, comment.author)}
                            className="text-gray-500 hover:text-[#5b06be] transition-colors"
                          >
                            <Reply className="w-4 h-4" />
                          </button>
                          {comment.author === 'You' && (
                            <button
                              onClick={() => handleDeleteClick(comment.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    {comment.replies?.map((reply) => (
                      <div key={reply.id} className="ml-8 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#5b06be]">{reply.author}</span>
                            <span className="text-sm text-gray-500">{reply.timeAgo}</span>
                          </div>
                          {reply.author === 'You' && (
                            <button
                              onClick={() => handleDeleteClick(reply.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>
            <div className="pt-4 border-t">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={replyTo.author ? `Replying to @${replyTo.author}...` : "Write a comment..."}
                    className="w-full"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
                  />
                  {replyTo.author && (
                    <button
                      onClick={() => {
                        setReplyTo({ commentId: null, author: null })
                        setNewComment('')
                      }}
                      className="text-xs text-[#5b06be] mt-1 hover:underline"
                    >
                      Cancel reply
                    </button>
                  )}
                </div>
                <Button
                  onClick={handleSubmitComment}
                  className="bg-[#5b06be] hover:bg-[#4a05a0]"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={newPostDialogOpen} onOpenChange={setNewPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                placeholder="What's your question about?"
                value={newPostForm.title}
                onChange={(e) => setNewPostForm(prev => ({ ...prev, title: e.target.value }))}
                maxLength={50}
              />
              <p className="text-sm text-gray-500">
                {newPostForm.title.length}/50 characters
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Description</label>
              <textarea
                id="content"
                rows={5}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5b06be] focus:ring-offset-2"
                placeholder="Provide as many details as possible..."
                value={newPostForm.content}
                onChange={(e) => setNewPostForm(prev => ({ ...prev, content: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setNewPostForm({ title: '', content: '' })
                  setNewPostDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#5b06be] hover:bg-[#4a05a0]"
                onClick={handleNewPost}
                disabled={!newPostForm.title.trim() || !newPostForm.content.trim()}
              >
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirm.isOpen} onOpenChange={(isOpen) => setDeleteConfirm({ isOpen, commentId: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-[#5b06be] hover:bg-[#4a05a0]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function getTimeInMilliseconds(timeAgo: string): number {
  const now = Date.now();
  const match = timeAgo.match(/(\d+(?:\.\d+)?)\s*(minute|hour|day|week|month|year)s?(?:\s+ago)?/);
  if (!match) return now;

  const [, num, unit] = match;
  const value = parseFloat(num);

  switch (unit) {
    case 'minute': return now - value * 60 * 1000;
    case 'hour': return now - value * 60 * 60 * 1000;
    case 'day': return now - value * 24 * 60 * 60 * 1000;
    case 'week': return now - value * 7 * 24 * 60 * 60 * 1000;
    case 'month': return now - value * 30 * 24 * 60 * 60 * 1000;
    case 'year': return now - value * 365 * 24 * 60 * 60 * 1000;
    default: return now;
  }
}
