import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface WelcomePageProps {
  welcomeTitle: string
  welcomeDescription: string
  welcomeImageUrl: string
  welcomeButtonText: string
  welcomeFooterText: string
  onChange: (field: string, value: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function WelcomePageStep({
  welcomeTitle,
  welcomeDescription,
  welcomeImageUrl,
  welcomeButtonText,
  welcomeFooterText,
  onChange,
  onNext,
  onPrev
}: WelcomePageProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="welcomeTitle">Título da Página de Boas-vindas</Label>
        <Input
          id="welcomeTitle"
          value={welcomeTitle}
          onChange={(e) => onChange('welcomeTitle', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeDescription">Descrição da Página de Boas-vindas</Label>
        <Textarea
          id="welcomeDescription"
          value={welcomeDescription}
          onChange={(e) => onChange('welcomeDescription', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeImageUrl">URL da Imagem de Boas-vindas</Label>
        <Input
          id="welcomeImageUrl"
          type="url"
          value={welcomeImageUrl}
          onChange={(e) => onChange('welcomeImageUrl', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeButtonText">Texto do Botão de Continuar</Label>
        <Input
          id="welcomeButtonText"
          value={welcomeButtonText}
          onChange={(e) => onChange('welcomeButtonText', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="welcomeFooterText">Texto do Rodapé</Label>
        <Textarea
          id="welcomeFooterText"
          value={welcomeFooterText}
          onChange={(e) => onChange('welcomeFooterText', e.target.value)}
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