import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { getReport } from '../services/reportService'
import { useState } from 'react'

interface ReportFilterForm {
  startDate: string
  endDate: string
  wasteType: string
}

export default function Reports() {
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFilterForm>()
  const [queryParams, setQueryParams] = useState<ReportFilterForm>({ startDate: '', endDate: '', wasteType: '' })

  const { data: reportData, isLoading, isError, refetch } = useQuery({
    queryKey: ['report', queryParams],
    queryFn: () => getReport(queryParams),
    enabled: false,
  })

  const onSubmit = (data: ReportFilterForm) => {
    setQueryParams(data)
    refetch()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter Report</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Start Date</label>
            <input type="date" className="input" {...register('startDate', { required: 'Start date is required' })} />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>
          <div>
            <label className="form-label">End Date</label>
            <input type="date" className="input" {...register('endDate', { required: 'End date is required' })} />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
          </div>
          <div>
            <label className="form-label">Waste Type (Optional)</label>
            <input type="text" className="input" {...register('wasteType')} />
          </div>
          <button type="submit" className="btn btn-primary">Generate Report</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Report Output</h2>
        {isLoading ? (
          <p>Loading…</p>
        ) : isError ? (
          <p className="text-red-500">Error generating report.</p>
        ) : (
          reportData ? (
            <p>{reportData}</p>
          ) : (
            <p className="text-gray-500">No report generated yet. Use the filter above to generate a report.</p>
          )
        )}
      </div>
    </div>
  )
} 