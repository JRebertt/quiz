'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Question {
  id: string
  text: string
  options: {
    id: string
    text: string
  }[]
}

interface Quiz {
  id: string
  title: string
  description: string
  slug: string
  imageUrl?: string
  color?: string
  questions: Question[]
  logoUrl?: string
  welcomeTitle: string
  welcomeDescription: string
  welcomeImageUrl: string
  welcomeButtonText: string
  welcomeFooterText: string
}

export default function QuizPage() {
  const params = useParams()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [quizState, setQuizState] = useState<'welcome' | 'questions' | 'completed'>('welcome')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetch(`/api/quizzes/${params.slug}`)
      .then(response => response.json())
      .then(data => setQuiz(data))
  }, [params.slug])

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNextQuestion = async () => {
    if (selectedOption) {
      const response = await fetch(`/api/quizzes/${quiz?.id}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: quiz?.questions[currentQuestionIndex].id,
          optionId: selectedOption
        })
      })
      const { correct } = await response.json()
      if (correct) {
        setScore(score + 1)
      }

      if (currentQuestionIndex < quiz!.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
      } else {
        setQuizState('completed')
      }
    }
  }

  if (!quiz) {
    return <div>Carregando...</div>
  }

  const renderWelcomeScreen = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        {quiz.logoUrl && (
          <div className="flex justify-center mb-4">
            <Image src={quiz.logoUrl} alt="Quiz Logo" width={150} height={150} className="object-contain" />
          </div>
        )}
        <CardTitle className="text-2xl font-bold text-center">{quiz.welcomeTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">{quiz.welcomeDescription}</p>
        {quiz.welcomeImageUrl && (
          <div className="flex justify-center mb-4">
            <Image src={quiz.welcomeImageUrl} alt="Welcome Image" width={300} height={200} className="object-cover rounded-lg" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button onClick={() => setQuizState('questions')} className="w-full mb-4">
          {quiz.welcomeButtonText}
        </Button>
        <p className="text-xs text-center text-gray-500">{quiz.welcomeFooterText}</p>
      </CardFooter>
    </Card>
  )

  const renderQuestions = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex]
    return (
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
        {quiz.imageUrl && (
          <Image src={quiz.imageUrl} alt={quiz.title} width={200} height={200} className="mb-4 rounded" />
        )}
        <p className="mb-4">{quiz.description}</p>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}</h2>
          <p>{currentQuestion.text}</p>
        </div>
        <ul className="space-y-2">
          {currentQuestion.options.map(option => (
            <li key={option.id}>
              <Button
                variant={selectedOption === option.id ? "default" : "outline"}
                onClick={() => handleOptionSelect(option.id)}
                className="w-full justify-start text-left"
              >
                {option.text}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          className="mt-4 w-full"
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Finalizar' : 'Próxima'}
        </Button>
      </div>
    )
  }

  const renderCompletedScreen = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{quiz.title} - Resultado</CardTitle>
      </CardHeader>
      <CardContent>
        {quiz.imageUrl && (
          <div className="flex justify-center mb-4">
            <Image src={quiz.imageUrl} alt={quiz.title} width={200} height={200} className="rounded" />
          </div>
        )}
        <p className="text-center text-lg mb-4">Você acertou {score} de {quiz.questions.length} perguntas.</p>
      </CardContent>
      <CardFooter>
        <Link href="/" passHref>
          <Button className="w-full">Voltar para o início</Button>
        </Link>
      </CardFooter>
    </Card>
  )

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center" style={{ backgroundColor: quiz.color || 'white' }}>
      {quizState === 'welcome' && renderWelcomeScreen()}
      {quizState === 'questions' && renderQuestions()}
      {quizState === 'completed' && renderCompletedScreen()}
    </div>
  )
}