import React, { useState } from 'react'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"

type Question = {
  id: string;
  title: string;
  image?: string;
  options: Array<{
    label: string;
    image?: string;
    isCorrect: boolean;
  }>;
}

type QuizConfig = {
  title: string;
  slug: string;
  welcome: {
    title: string;
    content: string;
    image?: string;
    buttonText: string;
  };
  questions: Question[];
  result: {
    title: string;
    message: string;
    buttonText: string;
    buttonLink: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
    progressBarColor: string;
  };
  branding: {
    logo: string;
    name: string;
  };
}

type QuizPreviewProps = {
  quizConfig: QuizConfig;
}

export default function QuizPreview({ quizConfig }: QuizPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const { welcome, questions, result, theme, branding } = quizConfig
  const totalSteps = questions.length + 2 // welcome + questions + result

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const renderContent = () => {
    if (currentStep === 0) {
      return (
        <div className="text-center">
          <h2 style={{color: theme.primaryColor}} className="text-2xl font-bold mb-4">{welcome.title}</h2>
          <p className="mb-4">{welcome.content}</p>
          {welcome.image && (
            <Image 
              src={welcome.image} 
              alt="Welcome" 
              width={200} 
              height={150} 
              className="mx-auto mb-4 rounded-lg" 
            />
          )}
          <button 
            onClick={() => setCurrentStep(1)}
            style={{backgroundColor: theme.buttonColor, color: theme.buttonTextColor}}
            className="font-bold py-2 px-4 rounded"
          >
            {welcome.buttonText}
          </button>
        </div>
      )
    } else if (showResult) {
      return (
        <div className="text-center">
          <h2 style={{color: theme.primaryColor}} className="text-2xl font-bold mb-4">{result.title}</h2>
          <p className="mb-4">{result.message}</p>
          <p className="text-xl mb-4">Você acertou {score} de {questions.length} perguntas!</p>
          <button 
            onClick={() => window.open(result.buttonLink, '_blank')}
            style={{backgroundColor: theme.buttonColor, color: theme.buttonTextColor}}
            className="font-bold py-2 px-4 rounded"
          >
            {result.buttonText}
          </button>
        </div>
      )
    } else {
      const question = questions[currentStep - 1];
      return (
        <div className="text-center">
          <h2 style={{color: theme.primaryColor}} className="text-xl font-bold mb-4">{question.title}</h2>
          {question.image && (
            <Image 
              src={question.image} 
              alt="Question" 
              width={200} 
              height={150} 
              className="mx-auto mb-4 rounded-lg" 
            />
          )}
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.isCorrect)}
                style={{backgroundColor: theme.secondaryColor, color: theme.primaryColor, borderColor: theme.primaryColor}}
                className="font-semibold py-2 px-4 border rounded shadow hover:bg-opacity-75 flex items-center"
              >
                {option.image && (
                  <Image 
                    src={option.image} 
                    alt={option.label} 
                    width={40} 
                    height={40} 
                    className="mr-2 rounded" 
                  />
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div style={{backgroundColor: theme.backgroundColor, color: theme.textColor}} className="h-full flex flex-col">
      <header className="p-4 flex justify-between items-center">
        {branding.logo && (
          <Image
            src={branding.logo}
            alt={branding.name}
            width={40}
            height={40}
            className="rounded"
          />
        )}
        <span className="text-sm font-semibold">{branding.name}</span>
      </header>
      <Progress 
        value={(currentStep / (totalSteps - 1)) * 100} 
        className="w-full h-2" 
        style={{backgroundColor: theme.secondaryColor}}
      >
        <div className="h-full" style={{width: `${(currentStep / (totalSteps - 1)) * 100}%`, backgroundColor: theme.progressBarColor}}></div>
      </Progress>
      <main className="flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  )
}