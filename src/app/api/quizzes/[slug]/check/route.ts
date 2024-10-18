import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { questionId, optionId } = await request.json()

  // First, verify that the question belongs to the correct quiz
  const question = await prisma.question.findFirst({
    where: {
      id: questionId,
      quizId: params.id
    },
    include: {
      options: {
        where: {
          id: optionId
        },
        select: {
          isCorrect: true
        }
      }
    }
  })

  if (!question) {
    return NextResponse.json({ error: 'Question not found in this quiz' }, { status: 404 })
  }

  if (question.options.length === 0) {
    return NextResponse.json({ error: 'Option not found for this question' }, { status: 404 })
  }

  const isCorrect = question.options[0].isCorrect

  return NextResponse.json({ correct: isCorrect })
}