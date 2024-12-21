'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageSquare, Plus, Reply, Trash2, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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

// Your existing interfaces and mock data here
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

// Rest of your existing code here, including mockComments, supportTopics, etc.

// Your existing Support component renamed to Page
export default function Page() {
  // All your existing component code here
}
