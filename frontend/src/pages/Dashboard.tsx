import { useQuery } from '@tanstack/react-query'

// Dummy query function (replace with real API call later)
const fetchDashboardSummary = () => Promise.resolve({ totalReceived: 100, totalProcessed: 80, totalSold: 60 })

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['dashboardSummary'], queryFn: fetchDashboardSummary })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome to MRF DigiTrack</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="text-gray-500">Total Waste Received</div>
          {isLoading ? ( <p>Loading…</p> ) : isError ? ( <p className="text-red-500">Error</p> ) : ( <div className="text-3xl font-bold">{data?.totalReceived} kg</div> )}
        </div>
        <div className="card">
          <div className="text-gray-500">Total Waste Processed</div>
          {isLoading ? ( <p>Loading…</p> ) : isError ? ( <p className="text-red-500">Error</p> ) : ( <div className="text-3xl font-bold">{data?.totalProcessed} kg</div> )}
        </div>
        <div className="card">
          <div className="text-gray-500">Total Waste Sold</div>
          {isLoading ? ( <p>Loading…</p> ) : isError ? ( <p className="text-red-500">Error</p> ) : ( <div className="text-3xl font-bold">{data?.totalSold} kg</div> )}
        </div>
      </div>
      <div className="card">
        <div className="text-lg font-semibold mb-2">Performance Charts</div>
        <div className="h-64 flex items-center justify-center text-gray-400">[Charts coming soon]</div>
      </div>
    </div>
  )
} 