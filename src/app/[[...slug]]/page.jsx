import '../../index.css'
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [{ slug: [""] }, { slug: ['profile'] }, { slug: ['posts'] }, { slug: ['products'] }, ]
}
 
export default function Page() {
  return <ClientOnly />
}