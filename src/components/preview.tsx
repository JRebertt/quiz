import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizData } from '@/@types'

interface PreviewProps {
  step: number;
  quizData: QuizData;
}

export default function Preview({ step, quizData }: PreviewProps) {
  const renderPreview = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-md mx-auto" style={{ backgroundColor: quizData.backgroundColor }}>
            <CardHeader>
              <CardTitle className="text-center">Prévia do Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quizData.logoUrl && (
                <div className="flex justify-center">
                  <Image src={quizData.logoUrl} alt="Logo do Quiz" width={100} height={100} className="rounded-full" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-center">{quizData.title || "Título do Quiz"}</h2>
              <p className="text-center">{quizData.description || "Descrição do Quiz"}</p>
              <Button className="w-full" style={{ backgroundColor: quizData.buttonColor }}>Iniciar Quiz</Button>
            </CardContent>
          </Card>
        )
      case 2:
        return (
          <Card className="w-full max-w-md mx-auto" style={{ backgroundColor: quizData.backgroundColor }}>
            <CardHeader>
              <CardTitle className="text-center">Tela de Boas-vindas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quizData.welcomeImageUrl && (
                <div className="flex justify-center">
                  <Image src={quizData.welcomeImageUrl} alt="Imagem de Boas-vindas" width={200} height={150} className="rounded-lg" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-center">{quizData.welcomeTitle || "Título de Boas-vindas"}</h2>
              <p className="text-center">{quizData.welcomeDescription || "Descrição de Boas-vindas"}</p>
              <Button className="w-full" style={{ backgroundColor: quizData.buttonColor }}>{quizData.welcomeButtonText}</Button>
              <p className="text-sm text-gray-500 text-center">{quizData.welcomeFooterText}</p>
            </CardContent>
          </Card>
        )
      case 3:
        return (
          <Card className="w-full max-w-md mx-auto" style={{ backgroundColor: quizData.backgroundColor }}>
            <CardHeader>
              <CardTitle className="text-center">Prévia das Perguntas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {quizData.questions.length > 0 ? (
                quizData.questions.map((q, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-bold text-lg">Pergunta {index + 1}: {q.text}</h3>
                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => (
                        <div key={optIndex} className={`p-2 rounded-md ${opt.isCorrect ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'} border`}>
                          {opt.text} {opt.isCorrect && <span className="text-green-600 font-semibold">(Correta)</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhuma pergunta adicionada ainda.</p>
              )}
              {quizData.questions.length > 0 && (
                <Button className="w-full" style={{ backgroundColor: quizData.buttonColor }}>Finalizar Quiz</Button>
              )}
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="sticky top-4">
      {renderPreview()}
    </div>
  )
}