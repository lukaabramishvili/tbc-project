import '../../index.css'
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [{ slug: [""] }, { slug: ['profile'] }]
}
 
export default function Page() {
  return <ClientOnly />
}