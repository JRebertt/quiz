'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSlug } from '@/utils/create-slug'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import StepProgress from './step-progress'
import GeneralInfoStep from './geral-info-step'
import WelcomePageStep from './welcome-page'
import QuestionsStep from './question-step'
import Preview from './preview'
import { QuizData, QuizQuestion } from '@/@types'

export default function QuizForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [quizData, setQuizData] = useState<QuizData>({
    title: '',
    description: '',
    slug: '',
    logoUrl: '',
    imageUrl: '',
    backgroundColor: '#ffffff',
    buttonColor: '#3b82f6',
    welcomeTitle: '',
    welcomeDescription: '',
    welcomeImageUrl: '',
    welcomeButtonText: 'Continuar',
    welcomeFooterText: 'Ao clicar em Continuar, você aceita os termos de uso.',
    questions: []
  })

  useEffect(() => {
    setQuizData(prev => ({ ...prev, slug: createSlug(prev.title) }))
  }, [quizData.title])

  const handleChange = (field: string, value: string) => {
    setQuizData(prev => ({ ...prev, [field]: value }))
  }

  const handleWelcomeChange = (field: string, value: string) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleQuestionAdd = (question: QuizQuestion) => {
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, question]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (quizData.title && quizData.description && quizData.slug && quizData.questions.length > 0) {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
      })
      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        alert('Erro ao criar o quiz')
      }
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GeneralInfoStep quizData={quizData} onChange={handleChange} onNext={nextStep} />
      case 2:
        return <WelcomePageStep 
          welcomeTitle={quizData.welcomeTitle}
          welcomeDescription={quizData.welcomeDescription}
          welcomeImageUrl={quizData.welcomeImageUrl}
          welcomeButtonText={quizData.welcomeButtonText}
          welcomeFooterText={quizData.welcomeFooterText}
          onChange={handleWelcomeChange} 
          onNext={nextStep} 
          onPrev={prevStep} 
        />
      case 3:
        return <QuestionsStep questions={quizData.questions} onAddQuestion={handleQuestionAdd} onPrev={prevStep} onSubmit={handleSubmit} />
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto px-4">
      <StepProgress currentStep={step} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="order-2 lg:order-1">
          <CardContent className="p-6">
            {renderStep()}
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={quizData.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="buttonColor">Button Color</Label>
                <Input
                  id="buttonColor"
                  type="color"
                  value={quizData.buttonColor}
                  onChange={(e) => handleChange('buttonColor', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="order-1 lg:order-2">
          <Preview step={step} quizData={quizData} />
        </div>
      </div>
    </form>
  )
}