import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

type ResultStepProps = {
  score: number
  totalQuestions: number
}

export default function ResultStep({ score, totalQuestions }: ResultStepProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Parabéns! Você completou nosso desafio</h2>
        <p className="mb-4">
          Como agradecimento pela sua participação, você ganhou seu copo no Pré-Lançamento dos Copos Stanley com a Barbie!
        </p>
        <Image
          src="https://d9aloqs890lqz.cloudfront.net/uploads/4498/07-09-2024/1fmw0-para.jpg"
          alt="Copo Stanley Barbie"
          width={300}
          height={300}
          className="mx-auto mb-4"
        />
        <p className="text-xl mb-4">
          Você acertou {score} de {totalQuestions} perguntas!
        </p>
        <Button
          onClick={() => window.location.href = 'https://verifique-tutorials.com/barbie/loja'}
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          Resgate seu prêmio
        </Button>
      </CardContent>
    </Card>
  )
}