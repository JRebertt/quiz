import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface WelcomePageStepProps {
  welcomeScreen: {
    title: string
    description: string
    imageUrl: string
    buttonText: string
    footerText: string
  }
  onChange: (field: string, value: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function WelcomePageStep({ welcomeScreen, onChange, onNext, onPrev }: WelcomePageStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="welcomeTitle">Título da Página de Boas-vindas</Label>
        <Input
          id="welcomeTitle"
          value={welcomeScreen.title}
          onChange={(e) => onChange('title', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeDescription">Descrição da Página de Boas-vindas</Label>
        <Textarea
          id="welcomeDescription"
          value={welcomeScreen.description}
          onChange={(e) => onChange('description', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeImageUrl">URL da Imagem de Boas-vindas</Label>
        <Input
          id="welcomeImageUrl"
          type="url"
          value={welcomeScreen.imageUrl}
          onChange={(e) => onChange('imageUrl', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeButtonText">Texto do Botão de Continuar</Label>
        <Input
          id="welcomeButtonText"
          value={welcomeScreen.buttonText}
          onChange={(e) => onChange('buttonText', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeFooterText">Texto do Rodapé</Label>
        <Textarea
          id="welcomeFooterText"
          value={welcomeScreen.footerText}
          onChange={(e) => onChange('footerText', e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">Anterior</Button>
        <Button onClick={onNext}>Próximo</Button>
      </div>
    </div>
  )
}