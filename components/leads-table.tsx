'use client'

interface Lead {
  id: number
  name: string
  email: string
  created_at: string
}

interface LeadsTableProps {
  leads: Lead[]
}

export function LeadsTable({ leads }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No leads to display
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-4 font-semibold text-sm">Name</th>
            <th className="text-left p-4 font-semibold text-sm">Email</th>
            <th className="text-left p-4 font-semibold text-sm">Date Added</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-border hover:bg-accent/50 transition-colors"
            >
              <td className="p-4 text-sm">{lead.name}</td>
              <td className="p-4 text-sm">
                <a
                  href={`mailto:${lead.email}`}
                  className="text-primary hover:underline"
                >
                  {lead.email}
                </a>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {new Date(lead.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

