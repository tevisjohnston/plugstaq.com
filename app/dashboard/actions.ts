'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function refreshMetrics() {
  const supabase = await createClient()
  
  // fetch latest metrics from database
  const { data: metrics, error } = await supabase
    .from('metrics')
    .select('*')
    .order('id', { ascending: true })
  
  if (error) {
    return { error: error.message, data: null }
  }
  
  // revalidate the dashboard page to ensure fresh data
  revalidatePath('/dashboard')
  
  return { error: null, data: metrics }
}

