import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { QuizData } from '@/@types'

interface GeneralInfoStepProps {
  quizData: Pick<QuizData, 'title' | 'description' | 'slug' | 'logoUrl'>
  onChange: (field: string, value: string) => void
  onNext: () => void
}

export default function GeneralInfoStep({ quizData, onChange, onNext }: GeneralInfoStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título do Quiz</Label>
        <Input
          id="title"
          value={quizData.title}
          onChange={(e) => onChange('title', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Descrição do Quiz</Label>
        <Input
          id="description"
          value={quizData.description}
          onChange={(e) => onChange('description', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="slug">Slug do Quiz</Label>
        <Input
          id="slug"
          value={quizData.slug}
          onChange={(e) => onChange('slug', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="logoUrl">URL do Logo</Label>
        <Input
          id="logoUrl"
          type="url"
          value={quizData.logoUrl}
          onChange={(e) => onChange('logoUrl', e.target.value)}
          required
        />
      </div>
      <Button onClick={onNext}>Próximo</Button>
    </div>
  )
}