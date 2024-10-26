import '../../index.css'
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [{ slug: [""] }, { slug: ['profile'] }, { slug: ['posts'] }, { slug: ['products'] }, { slug: ['login'] },]
}
 
export default function Page() {
  return <ClientOnly />
}