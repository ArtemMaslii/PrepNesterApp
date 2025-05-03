export default function QuestionPage({ params }: { params: { id: string } }) {
  return <div>Question ID: {params.id}</div>;
}