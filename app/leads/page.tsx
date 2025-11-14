'use client'

import { useEffect, useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { LeadsTable } from '@/components/leads-table'

interface Lead {
  id: number
  name: string
  email: string
  created_at: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeads = async () => {
      const supabase = createClient()
      
      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
        return
      }

      setLeads(data || [])
      setFilteredLeads(data || [])
    }

    fetchLeads()
  }, [])

  // filter leads based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLeads(leads)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query)
    )
    setFilteredLeads(filtered)
  }, [searchQuery, leads])

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">
          Manage and view all leads from your affiliate marketing campaigns
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Leads</CardTitle>
          <CardDescription>
            Search by name or email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 px-5 rounded-md">
          Error loading leads: {error}
        </div>
      )}

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Leads ({filteredLeads.length})
          </CardTitle>
          <CardDescription>
            {searchQuery
              ? `Showing ${filteredLeads.length} of ${leads.length} leads`
              : `Total leads collected from your campaigns`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeadsTable leads={filteredLeads} />
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredLeads.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground text-lg">
            {searchQuery ? 'No leads found matching your search.' : 'No leads available yet.'}
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            {searchQuery
              ? 'Try adjusting your search query.'
              : 'Leads will appear here once they are collected from your campaigns.'}
          </p>
        </div>
      )}
    </div>
  )
}

