/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Trash2, Plus, Save } from 'lucide-react'
import { toast } from "sonner"
import QuizPreview from './preview-v2'

type Question = {
  id: string;
  title: string;
  image?: string;
  options: Array<{
    label: string;
    image?: string;
    isCorrect: boolean;
  }>;
}

type QuizConfig = {
  title: string;
  slug: string;
  welcome: {
    title: string;
    content: string;
    image?: string;
    buttonText: string;
  };
  questions: Question[];
  result: {
    title: string;
    message: string;
    buttonText: string;
    buttonLink: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
    progressBarColor: string;
  };
  branding: {
    logo: string;
    name: string;
  };
}

export default function QuizForm() {
  const router = useRouter()
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    title: 'Meu Quiz Incrível',
    slug: 'meu-quiz-incrivel',
    welcome: {
      title: 'Bem-vindo ao Quiz',
      content: 'Teste seus conhecimentos e ganhe prêmios!',
      image: 'https://example.com/welcome-image.jpg',
      buttonText: 'Começar Quiz'
    },
    questions: [
      {
        id: '1',
        title: 'Qual é a capital do Brasil?',
        image: 'https://example.com/brazil-map.jpg',
        options: [
          { label: 'São Paulo', image: 'https://example.com/sao-paulo.jpg', isCorrect: false },
          { label: 'Rio de Janeiro', image: 'https://example.com/rio-de-janeiro.jpg', isCorrect: false },
          { label: 'Brasília', image: 'https://example.com/brasilia.jpg', isCorrect: true },
          { label: 'Salvador', image: 'https://example.com/salvador.jpg', isCorrect: false }
        ]
      }
    ],
    result: {
      title: 'Parabéns!',
      message: 'Você completou o quiz!',
      buttonText: 'Reivindicar Prêmio',
      buttonLink: 'https://example.com/claim-prize'
    },
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#ffffff',
      backgroundColor: '#f3f4f6',
      textColor: '#1f2937',
      buttonColor: '#3b82f6',
      buttonTextColor: '#ffffff',
      progressBarColor: '#4ade80',
    },
    branding: {
      logo: 'https://example.com/logo.png',
      name: 'Minha Empresa'
    }
  })

  useEffect(() => {
    const newSlug = quizConfig.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    setQuizConfig(prev => ({ ...prev, slug: newSlug }))
  }, [quizConfig.title])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      title: '',
      image: '',
      options: [
        { label: '', image: '', isCorrect: false },
        { label: '', image: '', isCorrect: false }
      ],
    }
    setQuizConfig(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const removeQuestion = (id: string) => {
    setQuizConfig(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
    }))
  }

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuizConfig(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === id ? { ...q, [field]: value } : q),
    }))
  }

  const addOption = (questionId: string) => {
    setQuizConfig(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...q.options, { label: '', image: '', isCorrect: false }],
          }
        }
        return q
      }),
    }))
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuizConfig(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.filter((_, index) => index !== optionIndex),
          }
        }
        return q
      }),
    }))
  }

  const updateOption = (questionId: string, optionIndex: number, field: string, value: any) => {
    setQuizConfig(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((opt, index) => 
              index === optionIndex ? { ...opt, [field]: value } : opt
            ),
          }
        }
        return q
      }),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizConfig)
      })
      
      if (response.ok) {
        toast.success("Quiz criado com sucesso!", {
          description: "Seu quiz foi salvo e está pronto para ser usado.",
        })
        router.push('/admin')
      } else {
        throw new Error('Falha ao criar o quiz')
      }
    } catch (error) {
      console.error('Erro ao criar o quiz:', error)
      toast.error("Erro ao criar o quiz", {
        description: "Ocorreu um erro ao salvar o quiz. Por favor, tente novamente.",
      })
    }
  }

  return (
    <div className="flex gap-8">
      <form onSubmit={handleSubmit} className="space-y-8 flex-1">
        <Tabs defaultValue="geral" className="w-full">
          <TabsList>
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="bemvindo">Boas-vindas</TabsTrigger>
            <TabsTrigger value="perguntas">Perguntas</TabsTrigger>
            <TabsTrigger value="resultado">Resultado</TabsTrigger>
            <TabsTrigger value="tema">Tema</TabsTrigger>
            <TabsTrigger value="marca">Marca</TabsTrigger>
          </TabsList>

          <TabsContent value="geral">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do Quiz</Label>
                  <Input 
                    id="title" 
                    value={quizConfig.title} 
                    onChange={(e) => setQuizConfig({...quizConfig, title: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    value={quizConfig.slug} 
                    onChange={(e) => setQuizConfig({...quizConfig, slug: e.target.value})}
                    required 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bemvindo">
            <Card>
              <CardHeader>
                <CardTitle>Página de Boas-vindas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="welcomeTitle">Título</Label>
                  <Input 
                    id="welcomeTitle" 
                    value={quizConfig.welcome.title} 
                    onChange={(e) => setQuizConfig({...quizConfig, welcome: {...quizConfig.welcome, title: e.target.value}})} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="welcomeContent">Conteúdo</Label>
                  <Textarea 
                    id="welcomeContent" 
                    value={quizConfig.welcome.content} 
                    onChange={(e) => setQuizConfig({...quizConfig, welcome: {...quizConfig.welcome, content: e.target.value}})} 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="welcomeImage">URL da Imagem</Label>
                  <Input 
                    id="welcomeImage" 
                    value={quizConfig.welcome.image} 
                    onChange={(e) => setQuizConfig({...quizConfig, welcome: {...quizConfig.welcome, image: e.target.value}})} 
                  />
                </div>
                <div>
                  <Label htmlFor="welcomeButtonText">Texto do Botão</Label>
                  <Input 
                    id="welcomeButtonText" 
                    value={quizConfig.welcome.buttonText} 
                    onChange={(e) => setQuizConfig({...quizConfig, welcome: {...quizConfig.welcome, buttonText: e.target.value}})} 
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="perguntas">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas do Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {quizConfig.questions.map((question, index) => (
                    <AccordionItem key={question.id} value={question.id}>
                      <AccordionTrigger className="flex justify-between">
                        <span>{question.title || `Pergunta ${index + 1}`}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeQuestion(question.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`question-${question.id}-title`}>Título da Pergunta</Label>
                            <Input 
                              id={`question-${question.id}-title`}
                              value={question.title} 
                              onChange={(e) => updateQuestion(question.id, 'title', e.target.value)} 
                              required 
                            />
                          </div>
                          <div>
                            <Label htmlFor={`question-${question.id}-image`}>URL da Imagem</Label>
                            <Input 
                              id={`question-${question.id}-image`}
                              value={question.image} 
                              onChange={(e) => updateQuestion(question.id, 'image', e.target.value)} 
                            />
                          </div>
                          <div>
                            <Label>Opções</Label>
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2 mt-2">
                                <Input 
                                  placeholder="Rótulo da opção" 
                                  value={option.label} 
                                  onChange={(e) => updateOption(question.id, optionIndex, 'label', e.target.value)}
                                  required
                                />
                                <Input 
                                  placeholder="URL da imagem" 
                                  value={option.image} 
                                  onChange={(e) => updateOption(question.id, optionIndex, 'image', e.target.value)}
                                />
                                <Switch 
                                  checked={option.isCorrect}
                                  onCheckedChange={(checked) => updateOption(question.id, optionIndex, 'isCorrect', checked)}
                                />
                                <Label>Correta</Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(question.id, optionIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button type="button" onClick={() => addOption(question.id)} className="mt-2">
                              <Plus className="h-4 w-4 mr-2" />
                              Adicionar Opção
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button type="button" onClick={addQuestion} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Pergunta
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resultado">
            
            <Card>
              <CardHeader>
                <CardTitle>Página de Resultado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="resultTitle">Título</Label>
                  <Input 
                    id="resultTitle" 
                    value={quizConfig.result.title} 
                    onChange={(e) => setQuizConfig({...quizConfig, result: {...quizConfig.result, title: e.target.value}})} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="resultMessage">Mensagem</Label>
                  <Textarea 
                    id="resultMessage" 
                    value={quizConfig.result.message} 
                    onChange={(e) => setQuizConfig({...quizConfig, result: {...quizConfig.result, message: e.target.value}})} 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="resultButtonText">Texto do Botão</Label>
                  <Input 
                    id="resultButtonText" 
                    value={quizConfig.result.buttonText} 
                    onChange={(e) => setQuizConfig({...quizConfig, result: {...quizConfig.result, buttonText: e.target.value}})} 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="resultButtonLink">Link do Botão</Label>
                  <Input 
                    id="resultButtonLink" 
                    value={quizConfig.result.buttonLink} 
                    onChange={(e) => setQuizConfig({...quizConfig, result: {...quizConfig.result, buttonLink: e.target.value}})} 
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tema">
            <Card>
              <CardHeader>
                <CardTitle>Tema do Quiz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(quizConfig.theme).map(([key, value]) => (
                  <div key={key}>
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id={key} 
                        type="color"
                        value={value} 
                        onChange={(e) => 
                          setQuizConfig({
                            ...quizConfig,
                            theme: { ...quizConfig.theme, [key]: e.target.value },
                          })
                        } 
                      />
                      <Input 
                        value={value} 
                        onChange={(e) =>
                          setQuizConfig({
                            ...quizConfig,
                            theme: { ...quizConfig.theme, [key]: e.target.value },
                          })
                        } 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marca">
            <Card>
              <CardHeader>
                <CardTitle>Marca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="brandName">Nome da Marca</Label>
                  <Input 
                    id="brandName" 
                    value={quizConfig.branding.name} 
                    onChange={(e) => setQuizConfig({...quizConfig, branding: {...quizConfig.branding, name: e.target.value}})} 
                  />
                </div>
                <div>
                  <Label htmlFor="logoUrl">URL do Logo</Label>
                  <Input 
                    id="logoUrl" 
                    value={quizConfig.branding.logo} 
                    onChange={(e) => setQuizConfig({...quizConfig, branding: {...quizConfig.branding, logo: e.target.value}})} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Salvar Quiz
        </Button>
      </form>

      <div className="flex-1">
        <div className="sticky top-4 w-[375px] h-[667px] mx-auto border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-xl">
          <QuizPreview quizConfig={quizConfig} />
        </div>
      </div>
    </div>
  )
}