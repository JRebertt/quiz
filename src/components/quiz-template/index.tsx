'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import ReactConfetti from 'react-confetti'

// Define types for our quiz configuration
type BaseStep = {
  id: string;
  title: string;
}

type WelcomeStep = BaseStep & {
  type: 'welcome';
  content: string;
  image?: string;
  buttonText: string;
}

type SelectionStep = BaseStep & {
  type: 'selection';
  subtitle: string;
  options: Array<{
    label: string;
    image?: string;
    value?: string;
  }>;
}

type QuestionStep = BaseStep & {
  type: 'question';
  image?: string;
  options: Array<{
    label: string;
    image?: string;
    isCorrect: boolean;
  }>;
}

type Step = WelcomeStep | SelectionStep | QuestionStep;

type QuizConfig = {
  steps: Step[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  branding: {
    logo: string;
    name: string;
  };
}

// This would be fetched from your backend in a real application
const defaultQuizConfig: QuizConfig = {
  steps: [
    {
      id: "welcome",
      type: "welcome",
      title: "Welcome to the Quiz",
      content: "Test your knowledge and win prizes!",
      image: "https://example.com/welcome-image.jpg",
      buttonText: "Start Quiz"
    },
    // Add more steps here...
  ],
  theme: {
    primaryColor: "pink",
    secondaryColor: "white",
    backgroundColor: "pink-100",
    textColor: "gray-800"
  },
  branding: {
    logo: "https://example.com/logo.png",
    name: "Quiz Company"
  }
}

export default function CustomizableQuiz({ config = defaultQuizConfig }: { config?: QuizConfig }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [showWrongAnswer, setShowWrongAnswer] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const { steps, theme, branding } = config
  const totalSteps = steps.length
  const questionSteps = steps.filter(step => step.type === 'question').length

  useEffect(() => {
    const currentProgress = (currentStep / (totalSteps - 1)) * 100
    setProgress(currentProgress)
  }, [currentStep, totalSteps])

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
      setLastAnswerCorrect(true)
      setIsLoading(true)
    } else {
      setLastAnswerCorrect(false)
      setShowWrongAnswer(true)
    }
  }

  const handleContinue = () => {
    if (lastAnswerCorrect) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setLastAnswerCorrect(false)
      } else {
        setShowResult(true)
        setShowConfetti(true)
      }
    } else {
      setShowWrongAnswer(false)
    }
  }

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        handleContinue()
      }, 2000)
      return () => clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const handleSelection = (value?: string) => {
    setSelectedOption(value || null)
    setCurrentStep(currentStep + 1)
  }

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-64">
          <Loader2 className={`h-16 w-16 animate-spin text-${theme.primaryColor}-500 mb-4`} />
          <p className={`text-${theme.primaryColor}-500 font-bold`}>Loading...</p>
        </div>
      )
    }

    if (showResult) {
      return (
        <div className="text-center">
          <h1 className={`text-3xl font-bold text-${theme.primaryColor}-500 mb-4`}>Congratulations! You ve completed the quiz</h1>
          <p className="mb-4">Thank you for participating!</p>
          <p className="text-xl mb-4">You got {score} out of {questionSteps} questions correct!</p>
          <button 
            onClick={() => window.location.href = 'https://example.com/claim-prize'}
            className={`bg-${theme.primaryColor}-500 hover:bg-${theme.primaryColor}-600 text-${theme.secondaryColor} font-bold py-2 px-4 rounded`}
          >
            Claim Your Prize
          </button>
        </div>
      )
    }

    if (showWrongAnswer) {
      return (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">❌ Incorrect</h2>
          <p className="mb-4">That was a tough one!</p>
          <button 
            onClick={handleContinue}
            className={`bg-${theme.primaryColor}-500 hover:bg-${theme.primaryColor}-600 text-${theme.secondaryColor} font-bold py-2 px-4 rounded`}
          >
            Try Again
          </button>
        </div>
      )
    }

    const step = steps[currentStep]
    if (!step) {
      return <div>Error: Step not found</div>
    }

    switch (step.type) {
      case "welcome":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
            <p className="mb-4">{step.content}</p>
            {step.image && <Image src={step.image} alt="Welcome" width={300} height={200} className="mx-auto mb-4" />}
            <button 
              onClick={() => setCurrentStep(currentStep + 1)}
              className={`bg-${theme.primaryColor}-500 hover:bg-${theme.primaryColor}-600 text-${theme.secondaryColor} font-bold py-2 px-4 rounded`}
            >
              {step.buttonText}
            </button>
          </div>
        )

      case "selection":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
            <p className="mb-4">{step.subtitle}</p>
            <div className="grid grid-cols-2 gap-4">
              {step.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelection(option.value)}
                  className={`bg-${theme.secondaryColor} hover:bg-${theme.primaryColor}-100 text-${theme.primaryColor}-500 font-semibold py-2 px-4 border border-${theme.primaryColor}-500 rounded shadow`}
                >
                  {option.image && <Image src={option.image} alt={option.label} width={100} height={100} className="mx-auto mb-2" />}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )

      case "question":
        if (lastAnswerCorrect) {
          return (
            <div className="text-center">
              <h2 className={`text-3xl font-bold text-${theme.primaryColor}-500 mb-4`}>✓ Correct Answer</h2>
              <p className="mb-4">Well done!</p>
              <button 
                onClick={handleContinue}
                className={`bg-${theme.primaryColor}-500 hover:bg-${theme.primaryColor}-600 text-${theme.secondaryColor} font-bold py-2 px-4 rounded`}
              >
                Continue
              </button>
            </div>
          )
        }

        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
            {step.image && <Image src={step.image} alt="Question" width={300} height={200} className="mx-auto mb-4" />}
            <div className="grid grid-cols-2 gap-4">
              {step.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.isCorrect)}
                  className={`bg-${theme.secondaryColor} hover:bg-${theme.primaryColor}-100 text-${theme.primaryColor}-500 font-semibold py-2 px-4 border border-${theme.primaryColor}-500 rounded shadow`}
                >
                  {option.image && <Image src={option.image} alt={option.label} width={100} height={100} className="mx-auto mb-2" />}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Error: Unknown step type</div>
    }
  }

  return (
    <div className={`min-h-screen bg-${theme.backgroundColor} flex flex-col items-center justify-center p-4`}>
      {showConfetti && <ReactConfetti />}
      <Image
        src={branding.logo}
        alt={branding.name}
        width={200}
        height={100}
        className="mb-4"
      />
      <Progress value={progress} className={`w-64 h-2 mb-8 bg-${theme.primaryColor}-200`} />
      <main className={`w-full max-w-md bg-${theme.secondaryColor} p-8 rounded-2xl shadow-lg`}>
        {renderStep()}
      </main>
      {currentStep > 0 && currentStep < steps.length - 1 && !showWrongAnswer && !lastAnswerCorrect && !isLoading && (
        <p className={`mt-4 text-sm text-${theme.textColor}`}>
          By selecting an option, you agree to our Terms of Service, Privacy Policy, and Cookie Policy
        </p>
      )}
    </div>
  )
}