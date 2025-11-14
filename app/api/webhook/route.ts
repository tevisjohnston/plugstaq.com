import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface WebhookPayload {
  metrics?: Array<{
    name: string
    value: number
  }>
  leads?: Array<{
    name: string
    email: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    // verify webhook secret if configured
    const webhookSecret = process.env.WEBHOOK_SECRET
    if (webhookSecret) {
      const providedSecret = request.headers.get('x-webhook-secret')
      if (providedSecret !== webhookSecret) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid webhook secret' },
          { status: 401 }
        )
      }
    }

    // parse request body
    const body: WebhookPayload = await request.json()

    const supabase = await createClient()

    // process metrics updates
    if (body.metrics && Array.isArray(body.metrics)) {
      for (const metricUpdate of body.metrics) {
        // find the metric by name
        const { data: existingMetric } = await supabase
          .from('metrics')
          .select('id, current_value')
          .eq('name', metricUpdate.name)
          .single()

        if (existingMetric) {
          // update with previous value stored as current, and new value as current
          const previousValue = existingMetric.current_value ?? 0
          const { error: updateError } = await supabase
            .from('metrics')
            .update({
              previous_value: previousValue,
              current_value: metricUpdate.value,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingMetric.id)

          if (updateError) {
            console.error(`Error updating metric ${metricUpdate.name}:`, updateError)
          }
        }
      }
    }

    // process leads insertion
    if (body.leads && Array.isArray(body.leads)) {
      for (const lead of body.leads) {
        // check if lead already exists (by email)
        const { data: existingLead } = await supabase
          .from('leads')
          .select('id')
          .eq('email', lead.email)
          .single()

        // only insert if lead doesn't exist
        if (!existingLead) {
          const { error: insertError } = await supabase
            .from('leads')
            .insert({
              name: lead.name,
              email: lead.email,
            })

          if (insertError) {
            console.error(`Error inserting lead ${lead.email}:`, insertError)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      processed: {
        metrics: body.metrics?.length || 0,
        leads: body.leads?.length || 0,
      },
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// allow GET for testing/health checks
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook endpoint is active',
  })
}

