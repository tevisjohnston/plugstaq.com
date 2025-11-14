import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: metrics } = await supabase.from('metrics').select()

  return <pre>{JSON.stringify(metrics, null, 2)}</pre>
}