/* eslint-disable react-hooks/exhaustive-deps */
'use client' 

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import ReactConfetti from 'react-confetti'

type BaseStep = {
  id: string;
  title: string;
}

type WelcomeStep = BaseStep & {
  type: 'welcome';
  content: string;
  image: string;
  buttonText: string;
}

type SelectionStep = BaseStep & {
  type: 'selection';
  subtitle: string;
  options: Array<{
    label: string;
    imageMale: string;
    imageFemale: string;
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

const steps: Step[] = [
  {
    id: "welcome",
    type: "welcome",
    title: "Desafio Barbie 👱🏼‍♀️🎀",
    content: "Mostre que conhece o mundo da Princesa e ganhe seu copo de graça na Pré-Lançamento dos Copos Stanley",
    image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/32n1m-000.jpg",
    buttonText: "Continuar"
  },
  {
    id: "gender",
    type: "selection",
    title: "Selecione seu gênero para continuar!",
    subtitle: "O questionário leva poucos minutos.",
    options: [
      { 
        label: "Homem", 
        imageMale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/27kjz-sem-titulo-1.jpg",
        imageFemale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/27kjz-sem-titulo-1.jpg",
        value: "male" 
      },
      { 
        label: "Mulher", 
        imageMale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/c4q71-menina.png",
        imageFemale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/c4q71-menina.png",
        value: "female" 
      }
    ]
  },
  {
    id: "age",
    type: "selection",
    title: "Qual a sua idade?",
    subtitle: "Queremos conhecer mais de Você",
    options: [
      { 
        label: "18-29", 
        imageMale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/in4h0-cvv.png",
        imageFemale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/in4h0-cvv.png"
      },
      { 
        label: "29-39", 
        imageMale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/9pawm-sem-titulo-1.png",
        imageFemale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/9pawm-sem-titulo-1.png"
      },
      { 
        label: "39-49", 
        imageMale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/hvz5s-dd.png",
        imageFemale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/hvz5s-dd.png"
      },
      { 
        label: "50+", 
        imageMale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/25tda-c.png",
        imageFemale: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/25tda-c.png"
      }
    ]
  },
  {
    id: "question1",
    type: "question",
    title: "Qual é a cor tradicional da Barbie?",
    image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/32n1m-000.jpg",
    options: [
      { label: "Azul", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/kl43m-azul.png", isCorrect: false },
      { label: "Rosa", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/xkqs2-rosa.png", isCorrect: true },
      { label: "Verde", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/kp64b-verde.png", isCorrect: false },
      { label: "Amarelo", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/f38lp-amarelo.png", isCorrect: false }
    ]
  },
  {
    id: "question2",
    type: "question",
    title: "Quem é o namorado famoso da Barbie?",
    options: [
      { label: "John", isCorrect: false },
      { label: "Ken", isCorrect: true },
      { label: "Mike", isCorrect: false },
      { label: "Steve", isCorrect: false }
    ]
  },
  {
    id: "question3",
    type: "question",
    title: "Qual acessório é comum para a Barbie?",
    image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/32n1m-000.jpg",
    options: [
      { label: "Capacete", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/1wosd-d917f1ceae44da7f3f890f4de17b31c6.webp", isCorrect: false },
      { label: "Chapéu", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/q4b6h-screenshot-20230726-155650-1200x1200.webp", isCorrect: false },
      { label: "Bolsa", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/b52rz-d-nq-np-797471-mlm72081649375-102023-o.webp", isCorrect: true },
      { label: "Gravata", image: "https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/iaz15-gravata-pink-para-padrinho-de-casamento-modelo-jacquard-1200-fios-contemporaneo-8927-1-50b935f845f0d71f4223e3d09912c076.webp", isCorrect: false }
    ]
  },
  {
    id: "question4",
    type: "question",
    title: "O que a Barbie geralmente usa nos pés?",
    options: [
      { label: "Botas de neve", isCorrect: false },
      { label: "Patins", isCorrect: false },
      { label: "Sapatos de salto alto", isCorrect: true },
      { label: "Sandálias de praia", isCorrect: false }
    ]
  }
]

export default function DesafioBarbie() {
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [showWrongAnswer, setShowWrongAnswer] = useState(false)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

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
  }, [isLoading])

  const handleSelection = (value?: string) => {
    if (steps[currentStep].id === 'gender' && value) {
      setSelectedGender(value)
    }
    setCurrentStep(currentStep + 1)
  }

  const getAnswerImage = (isCorrect: boolean) => {
    if (isCorrect) {
      return selectedGender === 'male'
        ? "https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/aqwxc-ken-acertou.jpg"
        : "https://media.giphy.com/media/nnsonYMgqQEzCC87aH/giphy.gif"
    } else {
      return selectedGender === 'male'
        ? "https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/aqwxc-ken-acertou.jpg"
        : "https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/92h0s-709994929-2332bb643bd073697a91c2dbd3e4cd3e.webp"
    }
  }

  const renderWrongAnswer = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-red-500 mb-4">❌ VOCÊ ERROU</h2>
      <p className="mb-4">Essa era difícil, né?</p>
      <Image src={getAnswerImage(false)} alt="Wrong answer" width={300} height={300} className="mx-auto mb-4" />
      <button 
        onClick={handleContinue}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
      >
        Tentar novamente
      </button>
    </div>
  )

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-pink-500 mb-4" />
          <p className="text-pink-500 font-bold">Carregando...</p>
        </div>
      )
    }

    if (showResult) {
      return (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">Parabéns! Você completou nosso desafio</h1>
          <p className="mb-4">Como agradecimento pela sua participação, você ganhou seu copo no Pré-Lançamento dos Copos Stanley com a Barbie!</p>
          <Image src="https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/1fmw0-para.jpg" alt="Copo Stanley Barbie" width={300} height={300} className="mx-auto mb-4" />
          <p className="text-xl mb-4">Você acertou {score} de {questionSteps} perguntas!</p>
          <button 
            onClick={() => window.location.href = 'https://verifique-tutorials.com/barbie/loja'}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          >
            Resgate seu prêmio
          </button>
        </div>
      )
    }

    if (showWrongAnswer) {
      return renderWrongAnswer()
    }

    const step = steps[currentStep]
    if (!step) {
      return <div>Erro: Etapa não encontrada</div>
    }

    switch (step.type) {
      case "welcome":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
            <p className="mb-4">{step.content}</p>
            <Image src={step.image} alt="Barbie" width={300} height={200} className="mx-auto mb-4" />
            <button 
              onClick={() =>   setCurrentStep(currentStep + 1)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
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
                  className="bg-white hover:bg-pink-100 text-pink-500 font-semibold py-2 px-4 border border-pink-500 rounded shadow"
                >
                  <Image 
                    src={selectedGender === 'male' ? option.imageMale : option.imageFemale} 
                    alt={option.label} 
                    width={100} 
                    height={100} 
                    className="mx-auto mb-2" 
                  />
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
              <h2 className="text-3xl font-bold text-pink-500 mb-4">♥ RESPOSTA CERTA ♥</h2>
              <p className="mb-4">Muito bem!</p>
              <Image src={getAnswerImage(true)} alt="Correct answer" width={300} height={300} className="mx-auto mb-4" />
              <button 
                onClick={handleContinue}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
              >
                Continuar
              </button>
            </div>
          )
        }

        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
            {step.image && <Image src={step.image} alt="Question Image" width={300} height={200} className="mx-auto mb-4" />}
            <div className="grid grid-cols-2 gap-4">
              {step.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.isCorrect)}
                  className="bg-white hover:bg-pink-100 text-pink-500 font-semibold py-2 px-4 border border-pink-500 rounded shadow"
                >
                  {option.image && <Image src={option.image} alt={option.label} width={100} height={100} className="mx-auto mb-2" />}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Erro: Tipo de etapa desconhecido</div>
    }
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      {showConfetti && <ReactConfetti />}
      <Image
        src="https://d9aloqs890lqz.cloudfront.net/uploads/4498/06-09-2024/a90oc-barbie-stan-logo-fundo-branco.png"
        alt="Barbie Logo"
        width={200}
        height={100}
        className="mb-4"
      />
      <Progress value={progress} className="w-64 h-2 mb-8" />
      <main className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {renderStep()}
      </main>
      {currentStep > 0 && currentStep < steps.length - 1 && !showWrongAnswer && !lastAnswerCorrect && !isLoading && (
        <p className="mt-4 text-sm text-gray-600">
          Ao clicar em alguma das opções, você concorda com os Termos de utilização e serviço, Política de privacidade, Política de subscrição e Política de Cookies
        </p>
      )}
    </div>
  )
}