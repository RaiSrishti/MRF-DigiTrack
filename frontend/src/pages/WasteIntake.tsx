import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWasteIntakes, addWasteIntake } from '../services/wasteService'
import type { AxiosResponse } from 'axios'

interface WasteIntakeForm {
  date: string
  wasteType: string
  weight: number
  supplier: string
  notes: string
}

export default function WasteIntake() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WasteIntakeForm>()
  const queryClient = useQueryClient()

  const { data: intakes, isLoading, isError } = useQuery<WasteIntakeForm[]>({
    queryKey: ['wasteIntakes'],
    queryFn: getWasteIntakes
  })

  const mutation = useMutation<AxiosResponse, Error, WasteIntakeForm>({
    mutationFn: addWasteIntake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wasteIntakes'] })
      reset()
    }
  })

  const onSubmit = (data: WasteIntakeForm) => {
    mutation.mutate(data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Waste Intake</h1>
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">New Waste Intake</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Date</label>
            <input type="date" className="input" {...register('date', { required: 'Date is required' })} />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>
          <div>
            <label className="form-label">Waste Type</label>
            <input type="text" className="input" {...register('wasteType', { required: 'Waste type is required' })} />
            {errors.wasteType && <p className="text-red-500 text-sm">{errors.wasteType.message}</p>}
          </div>
          <div>
            <label className="form-label">Weight (kg)</label>
            <input type="number" step="0.01" className="input" {...register('weight', { required: 'Weight is required' })} />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
          </div>
          <div>
            <label className="form-label">Supplier</label>
            <input type="text" className="input" {...register('supplier', { required: 'Supplier is required' })} />
            {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier.message}</p>}
          </div>
          <div>
            <label className="form-label">Notes</label>
            <textarea className="input" {...register('notes')} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>Submit</button>
          {mutation.isError && <p className="text-red-500 text-sm">Error submitting intake.</p>}
        </form>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Waste Intakes</h2>
        {isLoading ? (
          <p>Loading…</p>
        ) : isError ? (
          <p className="text-red-500">Error loading intakes.</p>
        ) : !intakes ? (
          <p className="text-gray-500">No waste intake entries yet.</p>
        ) : intakes.length === 0 ? (
          <p className="text-gray-500">No waste intake entries yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {intakes.map((intake: WasteIntakeForm, index: number) => (
              <li key={index} className="py-3">
                <div className="flex flex-wrap gap-2">
                  <span className="font-semibold">{intake.date}</span>
                  <span>–</span>
                  <span>{intake.wasteType} ({intake.weight} kg)</span>
                  <span>–</span>
                  <span>Supplier: {intake.supplier}</span>
                  {intake.notes && <span className="text-gray-500">(“{intake.notes}”)</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 