// import QuizForm from "@/components/quiz-form";
import QuizForm from "@/components/quiz-forms-v2";



export default function AdminPage() {
  return (
    <div className="p-6">
      <div className="gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Criar Novo Quiz</h2>
          <QuizForm />

        </div>
        <div>
        </div>
      </div>
    </div>
  )
}