import { redirect } from 'next/navigation'

export default async function Page() {
  // redirect to dashboard page
  redirect('/dashboard')
}