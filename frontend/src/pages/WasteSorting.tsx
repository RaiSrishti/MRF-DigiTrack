import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWasteSortings, addWasteSorting } from '../services/wasteService'
import type { AxiosResponse } from 'axios'

interface WasteSortingForm {
  date: string
  wasteType: string
  sortedWasteType: string
  weight: number
  notes: string
}

export default function WasteSorting() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WasteSortingForm>()
  const queryClient = useQueryClient()

  const { data: sortings, isLoading, isError } = useQuery<WasteSortingForm[]>({
    queryKey: ['wasteSortings'],
    queryFn: getWasteSortings
  })

  const mutation = useMutation<AxiosResponse, Error, WasteSortingForm>({
    mutationFn: addWasteSorting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wasteSortings'] })
      reset()
    }
  })

  const onSubmit = (data: WasteSortingForm) => {
    mutation.mutate(data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Waste Sorting</h1>
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">New Sorting Entry</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Date</label>
            <input type="date" className="input" {...register('date', { required: 'Date is required' })} />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>
          <div>
            <label className="form-label">Waste Type (Input)</label>
            <input type="text" className="input" {...register('wasteType', { required: 'Waste type is required' })} />
            {errors.wasteType && <p className="text-red-500 text-sm">{errors.wasteType.message}</p>}
          </div>
          <div>
            <label className="form-label">Sorted Waste Type (Output)</label>
            <input type="text" className="input" {...register('sortedWasteType', { required: 'Sorted waste type is required' })} />
            {errors.sortedWasteType && <p className="text-red-500 text-sm">{errors.sortedWasteType.message}</p>}
          </div>
          <div>
            <label className="form-label">Weight (kg)</label>
            <input type="number" step="0.01" className="input" {...register('weight', { required: 'Weight is required' })} />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
          </div>
          <div>
            <label className="form-label">Notes</label>
            <textarea className="input" {...register('notes')} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>Submit</button>
          {mutation.isError && <p className="text-red-500 text-sm">Error submitting sorting entry.</p>}
        </form>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Sorting Entries</h2>
        {isLoading ? (
          <p>Loading…</p>
        ) : isError ? (
          <p className="text-red-500">Error loading sorting entries.</p>
        ) : !sortings ? (
          <p className="text-gray-500">No sorting entries yet.</p>
        ) : sortings.length === 0 ? (
          <p className="text-gray-500">No sorting entries yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortings.map((sorting: WasteSortingForm, index: number) => (
              <li key={index} className="py-3">
                <div className="flex flex-wrap gap-2">
                  <span className="font-semibold">{sorting.date}</span>
                  <span>–</span>
                  <span>Input: {sorting.wasteType} → Output: {sorting.sortedWasteType} ({sorting.weight} kg)</span>
                  {sorting.notes && <span className="text-gray-500">(“{sorting.notes}”)</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 