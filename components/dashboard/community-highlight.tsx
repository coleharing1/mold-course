'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Star,
  ArrowRight,
  Trophy,
  Sparkles
} from 'lucide-react'

interface CommunityStory {
  id: string
  author: {
    name: string
    avatar?: string
    joinedDaysAgo: number
  }
  type: 'success' | 'milestone' | 'tip' | 'question'
  title: string
  excerpt: string
  likes: number
  replies: number
  tags: string[]
  isNew: boolean
}

const mockStories: CommunityStory[] = [
  {
    id: '1',
    author: {
      name: 'Sarah M.',
      joinedDaysAgo: 120
    },
    type: 'success',
    title: 'Finally passed my VCS test!',
    excerpt: 'After 6 months of following the protocol, my visual contrast sensitivity test came back normal. The key was being patient with drainage support...',
    likes: 47,
    replies: 12,
    tags: ['VCS', 'Success Story', 'Testing'],
    isNew: false
  },
  {
    id: '2',
    author: {
      name: 'Mike R.',
      joinedDaysAgo: 45
    },
    type: 'milestone',
    title: 'Drainage readiness at 85%!',
    excerpt: 'Just hit 85% on my drainage readiness score after 3 weeks of focused work. Here\'s what made the biggest difference for me...',
    likes: 23,
    replies: 8,
    tags: ['Drainage', 'Progress'],
    isNew: true
  },
  {
    id: '3',
    author: {
      name: 'Jennifer K.',
      joinedDaysAgo: 200
    },
    type: 'tip',
    title: 'Game-changer: Castor oil packs',
    excerpt: 'I was skeptical at first, but doing castor oil packs 3x/week has dramatically improved my liver drainage. Here\'s my routine...',
    likes: 89,
    replies: 24,
    tags: ['Tips', 'Drainage', 'Liver'],
    isNew: false
  },
  {
    id: '4',
    author: {
      name: 'David L.',
      joinedDaysAgo: 15
    },
    type: 'question',
    title: 'When did you start feeling better?',
    excerpt: 'I\'m 2 weeks into the protocol and wondering when others started noticing improvements. Still feeling pretty rough...',
    likes: 5,
    replies: 31,
    tags: ['Newbie', 'Timeline'],
    isNew: true
  }
]

export function CommunityHighlight() {
  const [currentStory, setCurrentStory] = useState<CommunityStory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching community highlights
    const fetchHighlight = async () => {
      try {
        // In production, fetch from API
        // const response = await fetch('/api/community/highlights')
        // const data = await response.json()
        
        // For now, rotate through mock stories
        const today = new Date().getDay()
        const storyIndex = today % mockStories.length
        setCurrentStory(mockStories[storyIndex])
      } catch (error) {
        console.error('Failed to fetch community highlight:', error)
        // Fallback to first story
        setCurrentStory(mockStories[0])
      } finally {
        setLoading(false)
      }
    }

    fetchHighlight()
  }, [])

  const getTypeIcon = (type: CommunityStory['type']) => {
    switch (type) {
      case 'success':
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case 'milestone':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case 'tip':
        return <Sparkles className="h-4 w-4 text-blue-500" />
      case 'question':
        return <MessageCircle className="h-4 w-4 text-purple-500" />
    }
  }

  const getTypeBadgeVariant = (type: CommunityStory['type']) => {
    switch (type) {
      case 'success':
        return 'success'
      case 'milestone':
        return 'default'
      case 'tip':
        return 'secondary'
      case 'question':
        return 'outline'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Highlight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
            </div>
            <div className="h-16 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentStory) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Highlight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No community highlights available at the moment.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden">
      {currentStory.isNew && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs">
            <Star className="h-3 w-3 mr-1" />
            New
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Community Highlight
        </CardTitle>
        <CardDescription>
          Stories and insights from your fellow recovery warriors
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentStory.author.avatar} />
            <AvatarFallback>
              {currentStory.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-sm">{currentStory.author.name}</p>
            <p className="text-xs text-muted-foreground">
              Member for {currentStory.author.joinedDaysAgo} days
            </p>
          </div>
          <Badge variant={getTypeBadgeVariant(currentStory.type) as any} className="gap-1">
            {getTypeIcon(currentStory.type)}
            <span className="capitalize">{currentStory.type}</span>
          </Badge>
        </div>

        {/* Story Content */}
        <div className="space-y-2">
          <h4 className="font-semibold line-clamp-1">
            {currentStory.title}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {currentStory.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {currentStory.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center gap-4 pt-2 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span>{currentStory.likes}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>{currentStory.replies}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto"
            asChild
          >
            <a href="/community">
              Read More
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>

        {/* Community CTA */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">
            Join the conversation and share your journey
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            Visit Community Forum
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}