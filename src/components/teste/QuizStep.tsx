import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

type Option = {
  label: string
  image?: string
  isCorrect: boolean
}

type QuizStepProps = {
  step: {
    question: string
    options: Option[]
  }
  onAnswer: (isCorrect: boolean) => void
  currentStep: number
  totalSteps: number
}

export default function QuizStep({ step, onAnswer, currentStep, totalSteps }: QuizStepProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">{step.question}</h2>
        <div className="grid grid-cols-2 gap-4">
          {step.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option.isCorrect)}
              className="h-auto py-4 px-2 flex flex-col items-center justify-center text-center"
              variant="outline"
            >
              {option.image && (
                <Image
                  src={option.image}
                  alt={option.label}
                  width={100}
                  height={100}
                  className="mb-2"
                />
              )}
              {option.label}
            </Button>
          ))}
        </div>
        <p className="mt-4 text-center">
          Pergunta {currentStep + 1} de {totalSteps}
        </p>
      </CardContent>
    </Card>
  )
}