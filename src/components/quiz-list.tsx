'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

interface Quiz {
  id: string
  title: string
  description: string
  slug: string
}

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setQuizzes(data)
    } catch (error) {
      console.error('Error fetching quizzes:', error)
      setError('Failed to load quizzes. Please try again later.')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        const response = await fetch(`/api/quizzes/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error('Failed to delete quiz')
        }
        fetchQuizzes() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting quiz:', error)
        setError('Failed to delete quiz. Please try again.')
      }
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{quiz.description}</p>
          </CardContent>
          <CardFooter className='flex justify-between items-center'>
              <Link href={`/quiz/${quiz.slug}`} passHref>
                <Button>Start Quiz</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(quiz.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}