import { Progress } from "@/components/ui/progress"

interface StepProgressProps {
  currentStep: number
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="mb-8">
      <Progress value={(currentStep / 3) * 100} className="w-full" />
      <div className="flex justify-between mt-2 text-sm md:text-base">
        <span className={currentStep >= 1 ? "font-bold" : ""}>Informações Gerais</span>
        <span className={currentStep >= 2 ? "font-bold" : ""}>Página de Boas-vindas</span>
        <span className={currentStep >= 3 ? "font-bold" : ""}>Perguntas</span>
      </div>
    </div>
  )
}