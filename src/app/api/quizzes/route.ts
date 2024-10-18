/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'




export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { title, slug, welcome, questions, result, theme, branding } = body

    if (!title || !slug || !welcome || !questions || !result || !theme || !branding) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        slug,
        welcome: {
          create: {
            title: welcome.title,
            content: welcome.content,
            image: welcome.image,
            buttonText: welcome.buttonText,
          },
        },
        questions: {
          create: questions.map((question: any) => ({
            title: question.title,
            image: question.image,
            options: {
              create: question.options.map((option: any) => ({
                label: option.label,
                image: option.image,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
        result: {
          create: {
            title: result.title,
            message: result.message,
            buttonText: result.buttonText,
            buttonLink: result.buttonLink,
          },
        },
        theme: {
          create: {
            primaryColor: theme.primaryColor,
            secondaryColor: theme.secondaryColor,
            backgroundColor: theme.backgroundColor,
            textColor: theme.textColor,
            buttonColor: theme.buttonColor,
            buttonTextColor: theme.buttonTextColor,
            progressBarColor: theme.progressBarColor,
          },
        },
        branding: {
          create: {
            logo: branding.logo,
            name: branding.name,
          },
        },
      },
      include: {
        welcome: true,
        questions: {
          include: {
            options: true,
          },
        },
        result: true,
        theme: true,
        branding: true,
      },
    })

    return NextResponse.json(quiz, { status: 201 })
  } catch (error) {
    console.error('Error creating quiz:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        welcome: true,
        questions: {
          include: {
            options: true,
          },
        },
        result: true,
        theme: true,
        branding: true,
      },
    })

    return NextResponse.json(quizzes)
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}