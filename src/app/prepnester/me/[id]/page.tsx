export default function PersonPage({ params }: { params: { id: string } }) {
  return <div>Person ID: {params.id}</div>;
}