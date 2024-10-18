import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Question {
  text: string
  options: { text: string; isCorrect: boolean }[]
}

interface QuestionsStepProps {
  questions: Question[]
  onAddQuestion: (question: Question) => void
  onPrev: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function QuestionsStep({ questions, onAddQuestion, onPrev, onSubmit }: QuestionsStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentOptions, setCurrentOptions] = useState(['', '', '', ''])
  const [correctOption, setCorrectOption] = useState(0)

  const addQuestion = () => {
    if (currentQuestion && currentOptions.every(option => option)) {
      onAddQuestion({
        text: currentQuestion,
        options: currentOptions.map((text, index) => ({
          text,
          isCorrect: index === correctOption
        }))
      })
      setCurrentQuestion('')
      setCurrentOptions(['', '', '', ''])
      setCorrectOption(0)
    }
  }

  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <div key={index} className="p-4 border rounded">
          <p><strong>Pergunta {index + 1}:</strong> {q.text}</p>
          <ul className="list-disc pl-5">
            {q.options.map((opt, optIndex) => (
              <li key={optIndex} className={opt.isCorrect ? 'text-green-600' : ''}>
                {opt.text} {opt.isCorrect && '(Correta)'}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="space-y-2">
        <Label htmlFor="currentQuestion">Nova Pergunta</Label>
        <Input
          id="currentQuestion"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Digite a pergunta"
        />
      </div>
      {currentOptions.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={option}
            onChange={(e) => {
              const newOptions = [...currentOptions]
              newOptions[index] = e.target.value
              setCurrentOptions(newOptions)
            }}
            placeholder={`Opção ${index + 1}`}
          />
          <RadioGroup value={correctOption.toString()} onValueChange={(value) => setCorrectOption(parseInt(value))}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>Correta</Label>
            </div>
          </RadioGroup>
        </div>
      ))}
      <Button type="button" onClick={addQuestion} variant="secondary" className="w-full">
        Adicionar Pergunta
      </Button>
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">Anterior</Button>
        <Button onClick={onSubmit}>Criar Quiz</Button>
      </div>
    </div>
  )
}